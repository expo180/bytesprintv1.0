from flask import Blueprint, render_template, request, redirect, url_for, session, abort, jsonify, flash
from flask_login import login_required, current_user
from . import api
from ..decorators import admin_required, permission_required
from ..models import db, Course, CodeSnippets,Paragraph, \
CourseSkillsList, Step, Heading, Contributions, VideoLinks
import random
from .forms import CheckoutForm, BasicCourseInfoForm, CourseDetailsForm
from .. import rapi
from werkzeug.utils import secure_filename
import os
from firebase_admin import credentials, storage, initialize_app
from sqlalchemy.exc import IntegrityError


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
        try:

            author_name = request.form.get('author_name')
            email = request.form.get('email')
            company_name = request.form.get('company_name')
            university_name = request.form.get('university_name')
            core_specialization = request.form.get('core_specialization')
            course_title = request.form.get('course_title')
            short_description = request.form.get('short_description')
            papers_data = request.form.get('papersData')
            video_links_data = request.form.get('videoLinksData')
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

            existing_course = Course.query.filter_by(course_title=form.course_title.data).first()

            if existing_course:
                flash('Course exists, please change the title!', 'error')
                return jsonify({'error': 'Course with the same title already exists.'}), 400

            # Add the new data to the session
            session['basic_info'] = {
                'author_name': author_name,
                'email': email,
                'company_name': company_name,
                'university_name': university_name,
                'core_specialization': core_specialization,
                'course_title': course_title,
                'short_description': short_description,
                'video_url': video_url,
                'thumbnail_url': thumbnail_url,
                'papers' : papers_data,
                'video_links' : video_links_data
            }

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return render_template('apis/forms/create/courses/course_create_form_step1.html', form=form)









def upload_files(files, folder):
    uploaded_urls = []
    for file in files:
        try:
            # Get file data from the request
            file_data = request.files.get(file)
            if file_data:
                # Upload file to storage
                filename = secure_filename(file_data.filename)
                blob = storage.bucket().blob(f"{folder}/{filename}")
                blob.upload_from_file(file_data)
                url = blob.public_url
                uploaded_urls.append(url)
        except Exception as e:
            # Handle file upload error
            print(f"File upload error: {str(e)}")

    return uploaded_urls


@api.route('/save_to_database/', methods=['POST'])
@login_required
def save_to_database():
    try:
        # Retrieve course basic_info from the session
        basic_info = session.get('basic_info', {})

        # Get the course title from the session
        course_title = basic_info.get('course_title', '')

        # Get additional course details from the request
        additional_info = request.get_json().get('courseData', {})

        print(additional_info)

        # Query the database to find the existing course by title
        existing_course = Course.query.filter_by(course_title=course_title).first()

        if existing_course:
            # Update existing course with new information
            existing_course.author_name = basic_info.get('author_name', '')
            existing_course.email = basic_info.get('email', '')
            existing_course.company_name = basic_info.get('company_name', '')
            existing_course.university_name = basic_info.get('university_name', '')
            existing_course.core_specialization = basic_info.get('core_specialization', '')
            existing_course.short_description = basic_info.get('short_description', '')
            existing_course.video_url = basic_info.get('video_url', '')
            existing_course.thumbnail_url = basic_info.get('thumbnail_url', '')
            existing_course.video_links_data = basic_info.get('videoLinksData', [])
            existing_course.contributions_data = basic_info.get('contributionsData', [])

            # Update with additional_info
            existing_course.problem = additional_info.get('mainProblem', '')
            existing_course.strategy = additional_info.get('strategy', '')
            existing_course.category = additional_info.get('techField', '')
            existing_course.code_snippets = [CodeSnippets(code_snippet=snippet) for snippet in additional_info.get('codeMirrorEditorData', [])]
            existing_course.paragraphs = [Paragraph(paragraph=content) for content in additional_info.get('quillEditorData', [])]
            existing_course.headings = [Heading(heading=heading) for heading in additional_info.get('headingsData', [])]

            # Add steps
            existing_course.steps_data = [Step(step=step['step']) for step in additional_info.get('stepsData', [])]

            # Add key aspects with consequences
            db.session.commit()

        else:
            # Create a new course
            new_course = Course(
                author_name=basic_info.get('author_name', ''),
                email=basic_info.get('email', ''),
                company_name=basic_info.get('company_name', ''),
                university_name=basic_info.get('university_name', ''),
                core_specialization=basic_info.get('core_specialization', ''),
                course_title=basic_info.get('course_title', ''),
                short_description=basic_info.get('short_description', ''),
                video_url=basic_info.get('video_url', ''),
                thumbnail_url=basic_info.get('thumbnail_url', ''),
                problem=additional_info.get('mainProblem', ''),
                strategy=additional_info.get('strategy', ''),
                category=additional_info.get('techField', ''),
                code_snippets=[CodeSnippets(code_snippet=snippet) for snippet in additional_info.get('codeMirrorEditorData', [])],
                skills_list=[CourseSkillsList(name=skill) for skill in additional_info.get('selectedSkills', [])],
                paragraphs=[Paragraph(paragraph=content) for content in additional_info.get('quillEditorData', [])],
                headings=[Heading(heading=heading) for heading in additional_info.get('headingsData', [])]
            )

            # Add video links
            video_links_data = request.get('videoLinksData', [])
            new_course.video_links = [VideoLinks(link=video_link['link'], mask_text=video_link['mask_text']) for video_link in video_links_data]
                
            # Add contributions
            contributions_data = request.get('contributionsData', [])
            new_course.instructor_contributions = [Contributions(title=contribution['title'], reference=contribution['reference']) for contribution in contributions_data]
                

            # Add steps
            new_course.steps_data = [Step(step=step['step']) for step in additional_info.get('stepsData', [])]

            db.session.add(new_course)
            db.session.commit()
            return jsonify({'message': 'Course saved to the database successfully'}), 200
    
        return jsonify({'message': 'Course updated successfully'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api.route('/create_course/step2/', methods=['GET', 'POST'])
@login_required
def create_course_step2():
    form = CourseDetailsForm()
    if request.method == 'POST':
        # Retrieve course basic_info from the session
        basic_info = session.get('basic_info', {})

        # Get additional course details from the request
        additional_info = request.get_json().get('courseData', {})

        # Get the course title from the session
        course_title = basic_info.get('course_title', '')

        existing_course = Course.query.filter_by(course_title=course_title).first()

        if existing_course:
            # Update existing course with new information
            existing_course.author_name = basic_info.get('author_name', '')
            existing_course.email = basic_info.get('email', '')
            existing_course.company_name = basic_info.get('company_name', '')
            existing_course.university_name = basic_info.get('university_name', '')
            existing_course.core_specialization = basic_info.get('core_specialization', '')
            existing_course.short_description = basic_info.get('short_description', '')
            existing_course.video_url = basic_info.get('video_url', '')
            existing_course.thumbnail_url = basic_info.get('thumbnail_url', '')
            existing_course.video_links_data = basic_info.get('videoLinksData', [])
            existing_course.contributions_data = basic_info.get('contributionsData', [])
            course_id = existing_course.id
            
            # Update with additional_info
            existing_course.problem = additional_info.get('mainProblem', '')
            existing_course.strategy = additional_info.get('strategy', '')
            existing_course.category = additional_info.get('techField', '')
            existing_course.code_snippets = [CodeSnippets(code_snippet=snippet) for snippet in additional_info.get('codeMirrorEditorData', [])]
            existing_course.skills_list = [CourseSkillsList(name=skill) for skill in additional_info.get('selectedSkills', [])]
            existing_course.paragraphs = [Paragraph(paragraph=content) for content in additional_info.get('quillEditorData', [])]
            existing_course.headings = [Heading(heading=heading) for heading in additional_info.get('headingsData', [])]

            # Add steps
            existing_course.steps_data = [Step(step=step['step']) for step in additional_info.get('stepsData', [])]

            db.session.commit()

            return jsonify({'message': 'Course updated successfully'}), 200
        else:
            # Create a new course
            new_course = Course(
                author_name=basic_info.get('author_name', ''),
                email=basic_info.get('email', ''),
                company_name=basic_info.get('company_name', ''),
                university_name=basic_info.get('university_name', ''),
                core_specialization=basic_info.get('core_specialization', ''),
                course_title=basic_info.get('course_title', ''),
                short_description=basic_info.get('short_description', ''),
                video_url=basic_info.get('video_url', ''),
                thumbnail_url=basic_info.get('thumbnail_url', ''),
                problem=additional_info.get('mainProblem', ''),
                strategy=additional_info.get('strategy', ''),
                category=additional_info.get('techField', ''),
                code_snippets=[CodeSnippets(code_snippet=snippet) for snippet in additional_info.get('codeMirrorEditorData', [])],
                skills_list=[CourseSkillsList(name=skill) for skill in additional_info.get('selectedSkills', [])],
                paragraphs=[Paragraph(paragraph=content) for content in additional_info.get('quillEditorData', [])],
                headings=[Heading(heading=heading) for heading in additional_info.get('headingsData', [])]
            )

            # Add video links
            video_links_data = request.get('videoLinksData', [])
            new_course.video_links = [VideoLinks(link=video_link['link'], mask_text=video_link['mask_text']) for video_link in video_links_data]
                
            # Add contributions
            contributions_data = request.get('contributionsData', [])
            new_course.instructor_contributions = [Contributions(title=contribution['title'], reference=contribution['reference']) for contribution in contributions_data]

            # Add steps
            new_course.steps_data = [Step(step=step['step']) for step in additional_info.get('stepsData', [])]

            # Get the course ID
            course_id = new_course.id

            try:
                db.session.add(new_course)
                db.session.commit()
                return jsonify({'message': 'Course saved to the database successfully'}), 200
                # Store the course ID in the session
                session['course_id'] = course_id
            except IntegrityError:
                db.session.rollback()
                return jsonify({'error': 'Course with the same title already exists'}), 409

    return render_template('apis/forms/create/courses/course_create_form_step2.html', form=form)




@api.route('/create_course/final/', methods=['GET', 'POST'])
@login_required
def create_course_final():
    # Retrieve the course ID from the session
    course_id = session.get('course_id')

    if not course_id:
        # Handle the case where the course ID is not found in the session
        return jsonify({'error': 'Course ID not found in session'}), 400

    # Use the course ID to fetch the course details from the database
    course = Course.query.get(course_id)

    if not course:
        # Handle the case where the course with the given ID is not found
        return jsonify({'error': 'Course not found'}), 404

    # Perform additional actions with the course details

    return render_template('apis/forms/create/courses/create_course_final.html', course=course)



@api.route("/intructors/courses/templates/how_design/?")
@login_required
def course_templates():
    return render_template('apis/forms/create/courses/FAQs/course_templates.html')

