from flask import Blueprint, render_template, request, redirect, url_for, session
from flask_login import login_required, current_user
from . import main
from ..decorators import admin_required, permission_required
from ..models import Permission, Course
from .. import db
import random

quotes_with_authors = [
    {"quote": "The important thing is not to stop questioning. Curiosity has its own reason for existing.", "author": "Albert Einstein"},
    {"quote": "Science knows no country, because knowledge belongs to humanity, and is the torch which illuminates the world.", "author": "Louis Pasteur"},
    {"quote": "The scientist is not a person who gives the right answers, he's one who asks the right questions.", "author": "Claude Lévi-Strauss"},
    {"quote": "To invent, you need a good imagination and a pile of junk.", "author": "Thomas A. Edison"},
    {"quote": "The good thing about science is that it's true whether or not you believe in it.", "author": "Neil deGrasse Tyson"},
    {"quote": "Engineering is the art of directing the great sources of power in nature for the use and convenience of people.", "author": "Thomas Tredgold"},
    {"quote": "The scientist discovers a new type of material or energy and the engineer discovers a new use for it.", "author": "Gordon Lindsay Glegg"},
    {"quote": "The art and science of asking questions is the source of all knowledge.", "author": "Thomas Berger"},
    {"quote": "All of science is nothing more than the refinement of everyday thinking.", "author": "Albert Einstein"},
    {"quote": "The engineer has been, and is, a maker of history.", "author": "James Kip Finch"},
    {"quote": "Technology is a word that describes something that doesn’t work yet.", "author": "Douglas Adams"},
    {"quote": "The scientist only imposes two things, namely truth and sincerity, imposes them upon himself and upon other scientists.", "author": "Erwin Schrödinger"},
    {"quote": "The engineer's first problem in any design situation is to discover what the problem really is.", "author": "Unknown"},
]

@main.route("/courses&trainings/pricing")
def pricing():
    return render_template('courses/pricing.html')

@main.route("/")
def home():
    random_quote = random.choice(quotes_with_authors)
    return render_template('main/index.html', random_quote=random_quote)

@main.route("/blog/certification/importance/")
def certifications():
    return render_template('blog/certification.html')

@main.route("/financial_aid/")
def financial_aid():
    return render_template("finances/financial_aid.html")

@main.route("/blog/bioinformatics/")
def bioinformatics():
    return render_template('blog/bioinformatics.html')

@main.route("/shop/more/")
def shop_more():
    return render_template('shop/shop_more.html')

@main.route("/shop/FAQs/ultra-secure-shop")
def ultra_secure_shop():
    return render_template('ultra-secure-shop.html')

@main.route("/blog/OOP/")
def OOP():
    return render_template('blog/OOP.html')

@main.route("/courses/")
def courses():
    return render_template('/courses/cours.html')

@main.route("/courses/web_development/")
def web_dev():
    return render_template('/courses/Web/web.html')

@main.route("/courses/data_science/")
def data():
    return render_template('/courses/data_science/data_science.html')

@main.route("/courses/AI/")
def IA():
    return render_template('/courses/AI/intelligence_artificielle.html')

@main.route("/courses/robotics_&_embedded_systems/")
def robotics():
    return render_template('/courses/robotics/robotics.html')


@main.route("/courses/cybersecurity/")
def hacking():
    return render_template('courses/cybersecurity/hacking.html')

@main.route("/courses/flutter/")
def flutter():
    return render_template('flutter.html')

@main.route("/3D/more_complex_tools/")
def deep_imagination():
    return render_template('deep_imagination.html')

@main.route("/3D/3D_tools/")
def tools3D():
    return render_template("3D_tools")

@login_required
@main.route("/projects/my_projects/")
def project_start():
    return render_template('project.html')

@main.route("/game_design/")
def game():
    return render_template('courses/Game/unity.html')

@main.route("/DevOps/")
def devOps():
    return render_template('courses/devOps/devOps.html')

@main.route("/cryptocurrency_development/")
def bitcoin():
    return render_template('courses/crypto/crypto.html')

@main.route("/documentation/")
def documentation():
    return render_template('documentation.html')

@main.route("/shop/")
def boutique():
    return render_template("shop/boutique.html")

@main.route("/3Dmap/")
def map3D():
    return render_template('3D/map.html')

@main.route("/user/settings/")
def preferences():
    return render_template('user/settings.html')

@main.route("/registration/success")
@login_required
def register_success():
    return render_template('user/register_success.html')

@main.route("/user/home/")
@login_required
def user_home():
    courses = Course.query.filter_by(email=current_user.email).all()
    return render_template('user/home.html', courses=courses)

@main.route("/courses/<int:course_id>/details")
def course_details(course_id):
    course = Course.query.get(course_id)

    if course:
        return render_template('/courses/course_details.html', course=course)
    else:
        return render_template('/courses/course_not_found.html'), 404


@main.route("/user/profile/")
def profile():
    return render_template('user/profile.html')

@login_required
@main.route("/courses/list/")
def courselist():
    return render_template('courses/courseslist.html')

@main.route("/docs/")
def doc():
    return render_template('docs/documentation.html')

@main.route('/admin/')
@login_required
@admin_required
def for_admins_only():
    return "Accès réservé aux administrateurs!"

@main.route('/moderate/')
@login_required
@permission_required(Permission.MODERATE)
def for_moderators_only():
    return "Accès réservé aux moderateurs!"


