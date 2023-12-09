# auth/views.py
from flask import render_template, redirect, request, url_for, flash, session, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from . import auth
from .. import db
from ..models import User
from werkzeug.security import generate_password_hash
from ..email import send_email
from .forms import LoginForm, RegistrationForm, ChangePasswordForm, PasswordResetRequestForm, PasswordResetForm, ChangeEmailForm
from authlib.integrations.flask_client import OAuth 
from .. import rapi 

oauth = OAuth()

google = oauth.register(
    name='google',
    client_id='176959984300-4t6mne05ddmd866l7eije2eq2t2gia5m.apps.googleusercontent.com',
    client_secret='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',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    authorize_callback=None,
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    refresh_token_url=None,
    refresh_token_params=None,
    redirect_uri=None,
    client_kwargs={'scope': 'openid profile email'},
)

facebook = oauth.register(
    name='facebook',
    client_id='350477707655423',
    client_secret='952f700df029093910a999d747c938a2',
    authorize_url='https://www.facebook.com/dialog/oauth',
    authorize_params=None,
    authorize_callback=None,
    access_token_url='https://graph.facebook.com/oauth/access_token',
    access_token_params=None,
    refresh_token_url=None,
    refresh_token_params=None,
    redirect_uri=None,
    client_kwargs={'scope': 'email'},
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

        user = User(
            first_name=form.first_name.data,
            last_name=form.last_name.data,
            email=form.email.data.lower(),
            country=form.country.data,
            age=form.age.data,
            areas_of_interest=form.areas_of_interest.data,
            gender=form.gender.data,
            password_hash=generate_password_hash(form.password2.data)
        )

        db.session.add(user)
        db.session.commit()

        # Display a flash message for successful registration
        flash("Your account has been created successfully!", 'success')
        return redirect(url_for('api.enroll'))

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

@auth.route('/google/login/')
def google_login():
    return oauth.google.authorize_redirect(url_for('auth.google_login_authorized', _external=True))

@auth.route('/google/login/authorized/')
def google_login_authorized():
    token = oauth.google.authorize_access_token()
    user_info = oauth.google.parse_id_token(token)
    email = user_info['email']
    user = User.query.filter_by(email=email.lower()).first()

    if user is not None:
        login_user(user)
        next = request.args.get('next') or url_for('main.user_home')
        return redirect(next)

    flash('Incorrect password or email address!', 'error')
    return render_template('auth/login.html', form=LoginForm())

@auth.route('/google/sign_up/')
def google_signup():
    return oauth.google.authorize_redirect(url_for('auth.google_signup_authorized', _external=True))

@auth.route('/google/sign_up/authorized/')
def google_signup_authorized():
    token = oauth.google.authorize_access_token()
    user_info = oauth.google.parse_id_token(token)
    email = user_info['email']
    first_name = email_slicer(email)

    user = User.query.filter_by(email=email.lower()).first()
    if user:
        flash('Account already exists. Please log in!', 'error')
        return redirect(url_for('auth.login'))

    create_user(email, first_name)
    return redirect(url_for('api.enroll'))

@auth.route('/facebook/login/')
def facebook_login():
    return oauth.facebook.authorize_redirect(url_for('auth.facebook_login_authorized', _external=True))

@auth.route('/facebook/login/authorized/')
def facebook_login_authorized():
    token = oauth.facebook.authorize_access_token()
    user_info = oauth.facebook.get('me?fields=id,email').json()
    email = user_info['email']
    user = User.query.filter_by(email=email.lower()).first()

    if user is not None:
        login_user(user)
        next = request.args.get('next') or url_for('main.user_home')
        return redirect(next)

    flash('Incorrect password or email address!', 'error')
    return render_template('auth/login.html', form=LoginForm())

@auth.route('/facebook/sign_up/')
def facebook_sign_up():
    return oauth.facebook.authorize_redirect(url_for('auth.facebook_sign_up_authorized', _external=True))

@auth.route('/facebook/sign_up/authorized/')
def facebook_sign_up_authorized():
    token = oauth.facebook.authorize_access_token()
    user_info = oauth.facebook.get('me?fields=id,email').json()
    email = user_info['email']
    first_name = email_slicer(email)

    user = User.query.filter_by(email=email.lower()).first()
    if user:
        flash('Account already exists. Please log in!', 'error')
        return redirect(url_for('auth.login'))

    create_user(email, first_name)
    flash('You have successfully logged into your account', 'success')
    return redirect(url_for('main.user_home'))