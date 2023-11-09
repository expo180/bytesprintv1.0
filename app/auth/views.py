# auth/views.py
from flask import render_template, redirect, request, url_for, flash, session
from flask_login import login_user, logout_user, login_required, current_user
from . import auth
from .. import db
from ..models import User
from werkzeug.security import generate_password_hash
from ..email import send_email
from .forms import LoginForm, RegistrationForm, ChangePasswordForm, PasswordResetRequestForm, PasswordResetForm, ChangeEmailForm
from flask_oauthlib.client import OAuth

oauth = OAuth()

google = oauth.remote_app(
    'google',
    consumer_key='176959984300-4t6mne05ddmd866l7eije2eq2t2gia5m.apps.googleusercontent.com',
    consumer_secret='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',
    request_token_params={
        'scope': 'email',
    },
    base_url='https://www.googleapis.com/oauth2/v1/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
)

@google.tokengetter
def get_google_oauth_token():
    return session.get('google_token')


@auth.route('/sign_up/', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data.lower()).first()
        if user:
            flash('Account already exists please login!', 'error')
            return redirect(url_for('auth.register'))
        user = User(
            first_name=form.first_name.data,
            last_name=form.last_name.data,
            email=form.email.data.lower(),
            country=form.country.data,
            age=form.age.data,
            sexe=form.sexe.data,
            password_hash=generate_password_hash(form.password2.data)
        )
        db.session.add(user)
        db.session.commit()
        token = user.generate_confirmation_token()
        send_email(
            user.email, 
            'Confirm your account',
            'auth/email/confirm', 
            user=user, 
            token=token
        )
        flash("A confirmation email has been sent to your email address.", 'success')
        return redirect(url_for('auth.login'))
    return render_template('auth/register.html', form=form)

@auth.route('/sign_in/', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data.lower()).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user, form.remember_me.data)
            next = request.args.get('next')
            if not next or not next.startswith('/'):
                next = url_for('main.home')
            return redirect(next)
        flash('Incorrect password or email address!', 'error')
    return render_template('auth/login.html', form=form)

@auth.route('/logout/')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.home'))

@auth.route('/reset_password/', methods=['GET', 'POST'])
def password_reset_request():
    if not current_user.is_anonymous:
        return redirect(url_for('main.home'))
    form = PasswordResetRequestForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data.lower()).first()
        if user:
            token = user.generate_reset_token()
            send_email(user.email, 'Reset Your Password', 'auth/email/reset_password', user=user, token=token)
        flash('An email with instructions to reset your password has been sent to your email address.')
        return redirect(url_for('auth.login'))
    return render_template('auth/reset_password.html', form=form)

@auth.route('/change_password/', methods=['GET', 'POST'])
@login_required
def change_password():
    form = ChangePasswordForm()
    if form.validate_on_submit():
        if current_user.verify_password(form.old_password.data):
            current_user.password = form.password.data
            db.session.add(current_user)
            db.session.commit()
            flash('Your password has been successfully updated!')
            return redirect(url_for('main.home'))
        else:
            flash('Invalid password.', 'error')
    return render_template('auth/change_password.html', form=form)

@auth.route('/login')
def google_signup():
    return google.authorize(callback=url_for('auth.authorized', _external=True))

@auth.route('/login/authorized')
def authorized():
    response = google.authorized_response()
    if response is None or response.get('access_token') is None:
        return 'Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )
    session['google_token'] = (response['access_token'], '')
    user_info = google.get('userinfo')
    email = user_info.data.get('email')
    first_name = user_info.data.get('given_name')
    last_name = user_info.data.get('family_name')
    age = request.args.get('age')
    country = request.args.get('country')
    gender = request.args.get('gender')
    user = User.query.filter_by(email=email).first()
    if user:
        flash('Account already exists please login!', 'error')
    user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        country=country,
        age=age,
        sexe=gender
    )
    db.session.add(user)
    db.session.commit()
    session['user_email'] = email
    session['user_first_name'] = first_name
    session['user_last_name'] = last_name
    session['user_age'] = age
    session['user_country'] = country
    session['user_gender'] = gender
    return f'Logged in as: {email}, Name: {first_name} {last_name}, Age: {age}, Country: {country}, Gender: {gender}'
