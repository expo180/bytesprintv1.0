from flask import Blueprint, render_template, request, redirect, url_for, session, abort, jsonify
from flask_login import login_required, current_user
from . import api
from ..decorators import admin_required, permission_required
from ..models import Permission, Course
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




@api.route('/save_to_database/', methods=['GET', 'POST'])
@login_required
def save_to_database():
    basic_info = session.get('basic_info', {})
    
    try:
        # Get additional course details from the request
        additional_info = request.get_json().get('courseData', {})

        # Merge basic_info and additional_info
        course_details = {**basic_info, **additional_info}

        new_course = Course(
            problem=course_details.get('mainProblem', ''),
            strategy=course_details.get('strategy', ''),
            category=course_details.get('techField', ''),
        )

        db.session.add(new_course)
        db.session.commit()
        session.pop('basic_info', None)

        return jsonify({'message': 'Data saved to the database successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/create_course/step2/', methods=['GET', 'POST'])
@login_required
def create_course_step2():
    form = CourseDetailsForm()    
    if 	form.validate_on_submit():
        basic_info = session.get('basic_info', {})
        session['basic_info'] = basic_info
        return redirect(url_for('create_course_final'))
    return render_template('apis/forms/create/courses/course_create_form_step2.html', form=form)


@api.route('/create_course/step3', methods=['GET', 'POST'])
@login_required
def create_course_step3():
    return render_template('apis/forms/create/courses/course_create_form_step3.html')


@api.route('/create_course/final', methods=['GET', 'POST'])
@login_required
def create_course_final():
    return render_template('create_course_final.html', basic_info=basic_info)


@api.route("/intructors/courses/templates/how_design/?")
@login_required
def course_templates():
    return render_template('apis/forms/create/courses/FAQs/course_templates.html')

