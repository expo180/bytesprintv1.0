from flask import Blueprint, render_template, request, redirect, url_for, session, abort
from flask_login import login_required, current_user
from . import api
from ..decorators import admin_required, permission_required
from ..models import Permission
from .. import db
import random
from .forms import CheckoutForm, BasicCourseInfoForm, CourseDetailsForm
from .. import rapi
from werkzeug.utils import secure_filename
import os
import firebase_admin
from firebase_admin import credentials, storage

cred = credentials.Certificate("../firebase/bytesprintv0-firebase-adminsdk-uvr39-00da07a953.json")
firebase_admin.initialize_app(cred, {'storageBucket':'gs://bytesprintv0.appspot.com'})

@api.route("/courses/enrollment/checkout/",  methods=['GET', 'POST'])
@login_required
def enroll():
    form = CheckoutForm()
    all_countries = rapi.get_all()
    form.country.choices = [
        (f"{country.name}")
        for country in all_countries
    ]
    return render_template('checkout/course_online.html', form=form)

@api.route("/courses/enrollment/finances/financial_aid_form/",  methods=['GET', 'POST'])
@login_required
def financial_aid():
    return render_template('finances/financial_aid_form.html', form=form)

@api.route('/courses/add/?', methods=['GET', 'POST'])
@login_required
def instructor():
    return render_template('apis/instructor.html')

@api.route('/course/add/create_new', methods=['GET', 'POST'])
@login_required
def create_course_step1():
	form = BasicCourseInfoForm()
	if request.method == 'POST' and form.validate_on_submit():

		# Handle video upload to Firebase Storage
		video = form.video.data
		video_filename = secure_filename(video.filename)
		video_blob = storage.bucket().blob(f"videos/{video_filename}")
		video_blob.upload_from_file(video)


		# Get the download URL for the uploaded video
		video_url = video_blob.public_url

		session['basic_info']={
			'author_name': form.author_name.data,
            'email': form.email.data,
            'working_for_company': form.working_for_company.data,
            'company_name': form.company_name.data,
            'job_title': form.job_title.data,
            'course_title': form.course_title.data,
            'short_description': form.short_description.data,
            'video_url': video_url,
            'video_links': form.video_links.data
		}

		return redirect(url_for('api.create_course_step2'))
	return render_template('apis/forms/create/courses/course_create_form_step1.html', form=form)

@api.route('/create_course/step2', methods=['GET', 'POST'])
@login_required
def create_course_step2():
    form = CourseDetailsForm()
    
    
    if request.method == 'POST' and form.validate_on_submit():
        basic_info = session.get('basic_info', {})
        
        session['basic_info'] = basic_info
        return redirect(url_for('create_course_final'))
    return render_template('apis/forms/create/courses/course_create_form_step2.html', form=form)

@api.route('/create_course/final', methods=['GET', 'POST'])
@login_required
def create_course_final():
    basic_info = session.get('basic_info', {})
    # Clear the session after form submission
    if form.image.data:
    	image_filename = secure_filename(form.image.data.filename)
    	form.image.data.save(os.path.join(app.config['UPLOAD_FOLDER'], image_filename))
    	print(f'Image saved: {image_filename}')

    if form.video.data:
    	video_filename = secure_filename(form.video.data.filename)
    	form.video.data.save(os.path.join(app.config['UPLOAD_FOLDER'], video_filename))
    	print(f'Video saved: {video_filename}')
    	form.category.data = ''
    	form.heading.data = ''
    	form.paragraph.data = ''
    session.pop('basic_info', None)
    return render_template('create_course_final.html', basic_info=basic_info)


@api.route('/curriculum/add/create_new', methods=['GET', 'POST'])
@login_required
def curriculum_create_form():
    return render_template('apis/forms/create/curriculum/curriculum_create_form.html')

