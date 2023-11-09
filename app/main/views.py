from flask import Blueprint, render_template, request, redirect, url_for, session
from flask_login import login_required, current_user
from . import main
from ..decorators import admin_required, permission_required
from ..models import Permission
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
]

@main.route("/")
def home():
    random_quote = random.choice(quotes_with_authors)
    return render_template('main/index.html', random_quote=random_quote)

@main.route("/courses/")
def courses():
    return render_template('courses/cours.html')

@main.route("/documentation/")
def documentation():
    return render_template('documentation.html')

@main.route("/shop/")
def boutique():
    return render_template("shop/boutique.html")

@main.route('/user/<first_name>')
def user(first_name):
    user = User.query.filter_by(first_name=first_name).first_or_404()
    return render_template('user.html', user=user)

@main.route('/admin')
@login_required
@admin_required
def for_admins_only():
    return "Accès réservé aux administrateurs!"

@main.route('/moderate')
@login_required
@permission_required(Permission.MODERATE)
def for_moderators_only():
    return "Accès réservé aux moderateurs!"

@main.route('/robotic_basics/')
def robotic_basics():
    return render_template('robotic_basics.html')

@main.route('/industrial_robotics/')
def industrial_robots():
    return render_template('industrial_robotics.html')

@main.route('/mobile_robotics/')
def mobile_robotics():
    return render_template('mobile_robotics.html')

@main.route('/humanoid/')
def humanoid():
    return render_template('humanoid.html')

@main.route('/robot_vision/')
def robot_vision():
    return render_template('robot_vision.html')

@main.route('/robot_manipulation/')
def robot_manipulation():
    return render_template('robot_manipulation.html')

@main.route('/aerial_robotics/')
def aerial_robotics():
    return render_template('aerial_robotics.html')

@main.route('/underwater_robots/')
def underwater_robots():
    return render_template('underwater_robots.html')

@main.route('/Iot&embedded_systems/')
def Iot():
    return render_template('Iot.html')

