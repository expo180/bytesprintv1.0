from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, SelectField, SelectMultipleField
from wtforms.validators import DataRequired, Length, Email, Regexp, EqualTo
from wtforms import ValidationError
from ..models import User
from markupsafe import Markup
import pycountry


class CountrySelectField(SelectField):
    def __init__(self, *args, **kwargs):
        super(CountrySelectField, self).__init__(*args, **kwargs)
        self.choices = [(country.alpha_2, country.name) for country in pycountry.countries]

class RegistrationForm(FlaskForm):
    email = StringField(
        ('Email'), 
        validators = [
            DataRequired(), 
            Length(1, 64),
            Email()
        ]
    )
    last_name = StringField(
         ("First name"),
        validators = [
            DataRequired(),
            Length(1, 128)
        ]
    )
    first_name = StringField(
         ("Last name"),
        validators = [
            DataRequired(),
            Length(1, 64) 
        ]
    )
    password = PasswordField(
         ('Password'),
        validators = [
            DataRequired(),
            EqualTo(
                'password2', 
                message='Les mots de passe doivent correspondre!'
            )
        ]
    )
    password2 = PasswordField(
         ('Confirm Password'),
        validators = [
            DataRequired()
        ]
    )
    age = SelectField(
        ('Select your age'),
        choices=[
            ('None', '-Select your age-'),
            ("y", "8-12"), 
            ("a", "12-18"), 
            ("o", "18+")
        ],
    )

    country = CountrySelectField(
        "Enter your current Location",
        validators=[DataRequired()]
    )

    areas_of_interest = SelectMultipleField(
    "Select area(s) that interest(s) you",
    choices=[
        ("None", "-Select area(s)-"),
        ("Healthcare", "Health informatics"),
        ("Finance", "Algorithmic trading"),
        ("Education", "EdTech"),
        ("E-commerce", "Recommender systems"),
        ("Manufacturing", "Robotics in automation"),
        ("Entertainment", "Game development"),
        ("Transportation", "Autonomous vehicles"),
        ("Agriculture", "Precision farming"),
        ("Energy", "Smart grids"),
        ("Telecommunications", "Network optimization"),
        ("Government", "Data-driven policy-making"),
        ("Environmental Science", "Data analysis for climate studies"),
        ("Retail", "Inventory management"),
        ("Space Exploration", "Data analysis in space missions"),
        ("Social Services", "Data-driven decision-making for social programs"),
        ("Legal Services", "Legal analytics"),
        ("Real Estate", "Property valuation"),
        ("Human Resources", "HR analytics"),
        ("Travel and Hospitality", "Personalized recommendations"),
        ("Non-Profit Organizations", "Data-driven impact assessment"),
    ],
    )
    programming_langages = SelectField(
         ("Enter your current Location"), 
        choices=[
            ('None', '-Select your location-'),
            ('AF', 'Africa'),
            ('AN', 'Antarctica'),
            ('AS', 'Asia'),
            ('EU', 'Europe'),
            ('NA', 'North America'),
            ('OC', 'Oceania'),
            ('SA', 'South America'),
        ], 
        validators=[DataRequired()]
    )
    gender = SelectField(
        ('None', '-Select your gender-'), 
        choices=[
            ("M", "Male"), 
            ("F", "Female"),
            ("NB", "Non-Binary"),
            ("PN", "Prefer Not to Say"),
            ("OTH", "Other")
        ], 
        validators=[DataRequired()]
    )
    privacy_policy_agreement = BooleanField(
         ("You have read and accepted our <a href=''>Terms and Conditions</a>."),
        validators=[DataRequired()]
    )
    submit = SubmitField( ('Next'))


class LoginForm(FlaskForm):
    email = StringField(
        'Email',
        validators = [
            DataRequired(),
            Length(1, 64),
            Email()
        ]
    )
    password = PasswordField(
        'Mot de passe',
        validators = [
            DataRequired()
        ]
    )
    remember_me = BooleanField( ('Remember me'))
    submit = SubmitField( ('Sign in'))

class PasswordResetRequestForm(FlaskForm):
    email = StringField(
         ('Email'), 
        validators = [
            DataRequired(), 
            Length(1, 64),
            Email()
        ])
    submit = SubmitField( ('Next'))

class ChangePasswordForm(FlaskForm):
    ancien_mot_de_passe = PasswordField(
         ('Old Password'), 
        validators = [
            DataRequired()
        ])
    password = PasswordField(
         ('New Password'), 
        validators = [
            DataRequired(), 
            EqualTo(
                'password2', 
                message = 'Passwords must match'
            )
        ]
    )
    password2 = PasswordField(
         ('Confirm New Password'),
        validators = [
            DataRequired()
        ]
    )
    submit = SubmitField( ('Continuer'))

class PasswordResetForm(FlaskForm):
    password = PasswordField(
         ('New Password'), 
        validators = [
            DataRequired(), 
            EqualTo(
                'password2', 
                message='Passwords must match')
        ]
    )
    password2 = PasswordField(
         ('Confirm Password'), 
        validators = [
            DataRequired()
        ]
    )
    submit = SubmitField( ('Next'))


class ChangeEmailForm(FlaskForm):
    email = StringField(
         ('New Email Adress'), 
        validators = [
            DataRequired(), 
            Length(1, 64),
            Email()
        ]
    )
    password = PasswordField(
        'Mot de Passe', 
        validators = [
            DataRequired()
        ]
    )
    submit = SubmitField( ('Next'))
