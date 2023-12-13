# auth/views.py
from flask import render_template, redirect, request, url_for, flash, session, jsonify, current_app
from flask_login import login_user, logout_user, login_required, current_user
from . import auth
from .. import db
from ..models import User
from werkzeug.security import generate_password_hash
from ..email import send_email
from .forms import LoginForm, RegistrationForm, ChangePasswordForm, PasswordResetRequestForm, PasswordResetForm, ChangeEmailForm
from flask_oauthlib.client import OAuth
from .. import rapi 
from datetime import datetime

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

facebook = oauth.remote_app('facebook',
    base_url='https://graph.facebook.com/',
    request_token_url=None,
    access_token_url='/oauth/access_token',
    authorize_url='https://www.facebook.com/dialog/oauth',
    consumer_key='350477707655423',
    consumer_secret='952f700df029093910a999d747c938a2',
    request_token_params={'scope': 'email'}
)

@google.tokengetter
def get_google_oauth_token():
    return session.get('google_token')

def email_slicer(email):
    first_name = email.split('@')[0]
    return first_name


@auth.route('/register/', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()

    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data.lower()).first()

        if user:
            # Display a flash message for existing email
            flash('Account already exists. Please log in.', 'error')
            return redirect(url_for('auth.register'))

        current_datetime = datetime.utcnow()

        user = User(
            first_name=form.first_name.data,
            last_name=form.last_name.data,
            email=form.email.data.lower(),
            country=form.country.data,
            age=form.age.data,
            areas_of_interest=form.areas_of_interest.data,
            gender=form.gender.data,
            password_hash=generate_password_hash(form.password2.data),
            member_since=current_datetime
        )

        db.session.add(user)
        db.session.commit()

        # Save user data in the session for template usage
        session['user_data'] = {
            'first_name': form.first_name.data,
            'last_name': form.last_name.data,
            'email': form.email.data.lower(),
            'country': form.country.data,
            'age': form.age.data,
            'areas_of_interest': form.areas_of_interest.data,
            'gender': form.gender.data,
            'member_since': current_datetime
        }

        # Display a flash message for successful registration
        return redirect(url_for('main.register_success', first_name=session['user_data']['first_name']))

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
                print(current_user.is_instructor())
                next = url_for('main.user_home')
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
        return redirect(url_for('main.user_home'))
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
            return redirect(url_for('main.user_home'))
        else:
            flash('Invalid password.', 'error')
    return render_template('auth/change_password.html', form=form)

@auth.route('/google/sign_up/')
def google_signup():
    return google.authorize(callback=url_for('auth.google_signup_authorized', _external=True))

@auth.route('/google/login/')
def google_login():
    return google.authorize(callback=url_for('auth.google_login_authorized', _external=True))

@auth.route('/google/login/authorized/')
def google_login_authorized():
    form = LoginForm()
    response = google.authorized_response()
    if response is None or response.get('access_token') is None:
        return 'Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )
    session['google_token'] = (response['access_token'], '')
    user_info = google.get('userinfo')
    email = user_info.data.get('email')
    user = User.query.filter_by(email=email.lower()).first()
    if user is not None:
        login_user(user)
        next = request.args.get('next')
        if not next or not next.startswith('/'):
            next = url_for('main.user_home')
        return redirect(next)
    flash('Incorrect password or email address!', 'error')
    return render_template('auth/login.html', form=form)



@auth.route('/google/sign_up/authorized/')
def google_signup_authorized():
    response = google.authorized_response()
    if response is None or response.get('access_token') is None:
        return 'Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )
    
    session['google_token'] = (response['access_token'], '')
    user_info = google.get('userinfo')
    email = user_info.data.get('email')
    first_name = email_slicer(email)
    user = User.query.filter_by(email=email.lower()).first()

    if user:
        flash('Account already exists, please log in!', 'error')
        return redirect(url_for('auth.register'))

    current_datetime = datetime.utcnow()
    
    default_password = 'ghp_gcxdTBEc3e3M9'
    user = User(
        email=email,
        first_name=first_name,
        last_name=first_name,
        password_hash=generate_password_hash(default_password),
        member_since=current_datetime
    )

    db.session.add(user)
    db.session.commit()

    session['user_data'] = {
        'first_name': first_name,
        'email': email.lower(),
        'member_since': current_datetime
    }

    login_user(user)
    return redirect(url_for('main.register_success'))

@auth.route('/facebook/sign_up/')
def facebook_sign_up():
    return facebook.authorize(callback=url_for('auth.facebook_sign_up_authorized', _external=True))

@auth.route('/facebook/login/')
def facebook_login():
    return facebook.authorize(callback=url_for('auth.facebook_login_authorized', _external=True))

@auth.route('/facebook/login/authorized/')
def facebook_login_authorized():
    response = facebook.authorized_response()
    if response is None or response.get('access_token') is None:
        flash('Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        ), 'error')
        return redirect(url_for('auth.login'))

    session['facebook_token'] = (response['access_token'], '')
    user_info = facebook.get('/me?fields=id,email')
    email = user_info.data.get('email')

    user = User.query.filter_by(email=email.lower()).first()
    if user is not None:
        login_user(user)
        next = request.args.get('next')
        if not next or not next.startswith('/'):
            next = url_for('main.user_home')
        return redirect(next)

    flash('Incorrect password or email address!', 'error')
    return redirect(url_for('auth.login'))

@auth.route('/facebook/sign_up/authorized/')
def facebook_sign_up_authorized():
    response = facebook.authorized_response()
    if response is None or response.get('access_token') is None:
        flash('Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        ), 'error')
        return redirect(url_for('auth.register'))

    session['facebook_token'] = (response['access_token'], '')
    user_info = facebook.get('/me?fields=id,email')
    email = user_info.data.get('email')
    first_name = email_slicer(email)

    user = User.query.filter_by(email=email.lower()).first()
    if user:
        flash('Account already exists, please login!', 'error')
        return redirect(url_for('auth.login'))

    default_password = 'ghp_gcxdTBEc3e3M9'
    current_datetime = datetime.utcnow()
    user = User(
        email=email,
        first_name=first_name,
        last_name=first_name,
        password_hash=generate_password_hash(default_password),
        member_since=current_datetime
    )
    db.session.add(user)
    db.session.commit()
    session['user_data'] = {
        'first_name': first_name,
        'email': email.lower(),
        'member_since': current_datetime
    }
    flash('You have successfully logged into your account', 'success')
    return redirect(url_for('main.register_success'))