from flask import Blueprint, render_template, request, redirect, url_for, session, abort
from flask_login import login_required, current_user
from . import api
from ..decorators import admin_required, permission_required
from ..models import Permission
from .. import db
import random
from .forms import CheckoutForm
from .. import rapi

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

@api.route('/courses/add/', methods=['GET', 'POST'])
def add_new_course():
    return render_template('apis/create_course.html')

@api.route('/products/add/', methods=['GET', 'POST'])
def add_new_topic():
	return render_template('apis/create_topic.html')
