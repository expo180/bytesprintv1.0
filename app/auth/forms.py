from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, SelectField
from wtforms.validators import InputRequired, Length, Email, Regexp, EqualTo
from wtforms import ValidationError
from ..models import User
from markupsafe import Markup
import pycountry


class CountrySelectField(SelectField):
    def __init__(self, *args, default=None, **kwargs):
        super(CountrySelectField, self).__init__(*args, **kwargs)
        self.choices = [("None", "-Select your current location-")] + [(country.alpha_2, f"{country.name}") for country in pycountry.countries]
        self.default = default


class RegistrationForm(FlaskForm):
    email = StringField(
        ('Email'), 
        validators = [
            InputRequired(), 
            Length(1, 64),
            Email()
        ]
    )
    first_name = StringField(
         ("First name"),
        validators = [
            InputRequired(),
            Length(1, 64)
        ]
    )
    last_name = StringField(
         ("Last name"),
        validators = [
            InputRequired(),
            Length(1, 128) 
        ]
    )
    password = PasswordField(
         ('Password'),
        validators = [
            InputRequired(),
            EqualTo(
                'password2', 
                message='Les mots de passe doivent correspondre!'
            )
        ]
    )
    password2 = PasswordField(
         ('Confirm Password'),
        validators = [
            InputRequired()
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
        "Enter your current location",
        validators=[InputRequired()]
    )
    areas = [
        ("None", "-Select an area-"),
        ("Health informatics", "Healthcare"),
        ("Algorithmic trading", "Finance"),
        ("EdTech", "Education"),
        ("Recommender systems", "E-commerce"),
        ("Robotics in automation", "Manufacturing"),
        ("Game development", "Entertainment"),
        ("Autonomous vehicles", "Transportation"),
        ("Precision farming", "Agriculture"),
        ("Smart grids", "Energy"),
        ("Network optimization", "Telecommunications"),
        ("Data-driven policy-making", "Government"),
        ("Data analysis for climate studies", "Environmental Science"),
        ("Inventory management", "Retail"),
        ("Data analysis in space missions", "Space Exploration"),
        ("Data-driven decision-making for social programs", "Social Services"),
        ("Legal analytics", "Legal Services"),
        ("Property valuation", "Real Estate"),
        ("HR analytics", "Human Resources"),
        ("Travel and Hospitality", "Personalized recommendations"),
        ("Non-Profit Organizations", "Data-driven impact assessment"),
    ]
    default_choice = areas[0][0]

    areas_of_interest = SelectField(
        "Select an area that interests you",
        choices=areas,
        default=default_choice
    )

    gender = SelectField(
        'Select your gender',
        choices=[
            ('None', '-Select your gender-'), 
            ("M", "Male"), 
            ("F", "Female"),
            ("NB", "Non-Binary"),
            ("PN", "Prefer Not to Say"),
            ("OTH", "Other"),
        ], 
        validators=[InputRequired()]
    )

    privacy_policy_agreement = BooleanField(
         ("You have read and accepted our <a href=''>Terms and Conditions</a>."),
        validators=[InputRequired()]
    )
    submit = SubmitField( ('Next'))


class LoginForm(FlaskForm):
    email = StringField(
        'Email',
        validators = [
            InputRequired(),
            Length(1, 64),
            Email()
        ]
    )
    password = PasswordField(
        'Mot de passe',
        validators = [
            InputRequired()
        ]
    )
    remember_me = BooleanField( ('Remember me'))
    submit = SubmitField( ('Sign in'))

class PasswordResetRequestForm(FlaskForm):
    email = StringField(
         ('Email'), 
        validators = [
            InputRequired(), 
            Length(1, 64),
            Email()
        ])
    submit = SubmitField( ('Next'))

class ChangePasswordForm(FlaskForm):
    ancien_mot_de_passe = PasswordField(
         ('Old Password'), 
        validators = [
            InputRequired()
        ])
    password = PasswordField(
         ('New Password'), 
        validators = [
            InputRequired(), 
            EqualTo(
                'password2', 
                message = 'Passwords must match'
            )
        ]
    )
    password2 = PasswordField(
         ('Confirm New Password'),
        validators = [
            InputRequired()
        ]
    )
    submit = SubmitField( ('Continuer'))

class PasswordResetForm(FlaskForm):
    password = PasswordField(
         ('New Password'), 
        validators = [
            InputRequired(), 
            EqualTo(
                'password2', 
                message='Passwords must match')
        ]
    )
    password2 = PasswordField(
         ('Confirm Password'), 
        validators = [
            InputRequired()
        ]
    )
    submit = SubmitField( ('Next'))


class ChangeEmailForm(FlaskForm):
    email = StringField(
         ('New Email Adress'), 
        validators = [
            InputRequired(), 
            Length(1, 64),
            Email()
        ]
    )
    password = PasswordField(
        'Mot de Passe', 
        validators = [
            InputRequired()
        ]
    )
    submit = SubmitField( ('Next'))
