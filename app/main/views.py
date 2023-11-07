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

@main.route("/Développement_web/")
def web_dev():
    return render_template('web.html')

@main.route("/Sciences_des_données/")
def data():
    return render_template('data_science.html')

@main.route("/Intelligence_artificielle/")
def IA():
    return render_template('intelligence_artificielle.html')

@main.route("/Robotique_et_systèmes_embarqués/")
def robotics():
    return render_template('robot.html')


@main.route("/cybersecurité/")
def hacking():
    return render_template('hacking.html')

@main.route("/Flutter/")
def flutter():
    return render_template('flutter.html')

@main.route("/Unity/")
def unity():
    return render_template('unity.html')

@main.route("/Ingénierie_DevOps/")
def devOps():
    return render_template('devOps.html')

@main.route("/Développement_de_jeux_vidéos/")
def game():
    return render_template('jeux.html')

@main.route("/Développement_de_cryptomonnaies/")
def bitcoin():
    return render_template('crypto.html')

@main.route("/documentation/")
def documentation():
    return render_template('documentation.html')


@main.route("/jeux/")
def jeux():
    return render_template("jeux.html")


@main.route("/livres/")
def livres():
    return render_template("livres.html")


@main.route("/musique/")
def musique():
    return render_template('musiques.html')


@main.route("/tools/")
def outils():
    return render_template('musiques.html')


@main.route("/shop/")
def boutique():
    return render_template("shop/boutique.html")


@main.route("/cartographie3D/")
def cartographie():
    return render_template("cartographie.html")

@main.route("/HTML5&CSS3_documentation/")
def hypertext():
    return render_template('HTML5&CSS3_doc.html')

@main.route("/Javascript_documentation/")
def Javascript():
    return render_template('javascript_doc.html')

@main.route("/MATLAB_documentation/")
def MATLAB():
    return render_template('matlab_doc.html')

@main.route("/Bootstrap_documentation/")
def Bootstrap():
    return render_template('bootstrap_doc.html')

@main.route("/Physique_quantique_documentation/")
def quantum():
    return render_template('physique-quantique.html')

@main.route("/Théorie_de_la_relativité_documentation/")
def relativity():
    return render_template('relativity_doc.html')

@main.route("/Equations_différentielles_documentation/")
def differential_equations():
    return render_template('equations_différentielles_doc.html')

@main.route("/Fonctions_logarithmes_documentation/")
def logarithmic_functions():
    return render_template('logarithmic_functions_doc.html')

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
