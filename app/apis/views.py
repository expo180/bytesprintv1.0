from flask import Blueprint, render_template, request, redirect, url_for, session, abort, jsonify
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
from firebase_admin import credentials, storage, initialize_app

# Get the absolute path to the JSON file using os.path.join
json_file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'firebase', 'bytesprintv0-firebase-adminsdk-uvr39-00da07a953.json')

cred = credentials.Certificate(json_file_path)
initialize_app(cred, {'storageBucket': 'bytesprintv0.appspot.com'})

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


@api.route('/course/add/create_new/step1/', methods=['GET', 'POST'])
@login_required
def create_course_step1():
    form = BasicCourseInfoForm()

    if request.method == 'POST':
        # Get file data from the request
        thumbnail = request.files['thumbnail']
        video = request.files.get('video')

        video_url = None

        if video:
            # Upload video to storage
            video_filename = secure_filename(video.filename)
            video_blob = storage.bucket().blob(f"videos/{video_filename}")
            video_blob.upload_from_file(video)
            video_url = video_blob.public_url


        # Upload thumbnail to storage
        thumbnail_filename = secure_filename(thumbnail.filename)
        thumbnail_blob = storage.bucket().blob(f"thumbnails/{thumbnail_filename}")
        thumbnail_blob.upload_from_file(thumbnail)
        thumbnail_url = thumbnail_blob.public_url

        # Save other form data to session
        session['basic_info'] = {
            'author_name': request.form['author_name'],
            'email': request.form['email'],
            'company_name': request.form['company_name'],
            'university_name': request.form['university_name'],
            'core_specialization': request.form['core_specialization'],
            'course_title': request.form['course_title'],
            'short_description': request.form['short_description'],
            'video_url': video_url,
            'thumbnail_url': thumbnail_url
        }


        return redirect(url_for('api.create_course_step2'))

    return render_template('apis/forms/create/courses/course_create_form_step1.html', form=form)



@api.route('/create_course/step2/', methods=['GET', 'POST'])
@login_required
def create_course_step2():
    form = CourseDetailsForm()    
    if 	form.validate_on_submit():
        basic_info = session.get('basic_info', {})
        
        session['basic_info'] = basic_info
        return redirect(url_for('create_course_final'))
    return render_template('apis/forms/create/courses/course_create_form_step2.html', form=form)


# Route to save the skills asynchronously  
@api.route('/save_skills', methods=['GET', 'POST'])
@login_required
def save_skills():
    try:
        selected_skills = request.json.get('skills', [])
        session['selected_skills'] = selected_skills
        return jsonify({'success': True, 'message': 'Skills saved successfully'})
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error saving skills: {str(e)}'})

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


@api.route("/intructors/courses/templates/how_design/?")
@login_required
def course_templates():
    return render_template('apis/forms/create/courses/FAQs/course_templates.html')

