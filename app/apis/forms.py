# apis forms.py

from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, SelectField, SubmitField, RadioField, BooleanField, TextAreaField, IntegerField 
from wtforms.validators import InputRequired, Email, Length, Optional, NumberRange

class CheckoutForm(FlaskForm):
    first_name = StringField(
        'First Name', 
        validators=[
            InputRequired(), 
            Length(max=50)
        ]
    )
    last_name = StringField(
        'Last Name', 
        validators=[
            InputRequired(), 
            Length(max=50)
        ]
    )
    email = EmailField(
        'Email', 
        validators=[
            InputRequired(), 
            Email()
        ]
    )
    address = StringField(
        'Address', 
        validators=[
            InputRequired(), 
            Length(max=100)
        ]
    )
    address2 = StringField(
            'Address line 2', 
            validators=[
                InputRequired(), 
                Length(max=100)
            ]
    )
    state = StringField(
        'State', 
        validators=[
            InputRequired(), 
            Length(max=50)
        ]
    )
    zip_code = StringField(
        'ZIP Code', 
        validators=[
            InputRequired(), 
            Length(max=20)
        ]
    )
    country = SelectField(
        'Country', 
        validators=[InputRequired()]
    )
    payment_options = RadioField(choices=[
        ('CD', 'Credit card'), 
        ('DB', 'Debit card'), 
        ( 'PP', 'PayPal')], 
        default='CD'
    )
    shipping = BooleanField(
        'Shipping address is the same as my billing address', 
        validators=[InputRequired()]
    )
    save = BooleanField(
        'Save this information for next time', 
        validators=[InputRequired()]
    )
    card_name = StringField(
        'Name on card', 
        validators=[InputRequired()])
    card_number = StringField(
        'Credit card number', 
        validators=[
            InputRequired(), 
            Length(max=20)
        ])
    expiry_date = StringField(
        'Expiry Date (MM/YY)', 
        validators=[
            InputRequired(), 
            Length(max=5)
        ])
    cvv = StringField(
        'CVV', 
        validators=[
            InputRequired(), 
            Length(max=4)
        ])

class CreateCourseForm(FlaskForm):
    author_name = StringField(
        'Author Name', 
        validators=[
            InputRequired()
        ]
    )
    email = StringField(
        'Email', 
        validators=[
            InputRequired(), 
            Email()
        ]
    )
    company_name = StringField('Company Name', validators=[Optional()])
    course_title = StringField('Course Title', validators=[InputRequired()])
    short_description = TextAreaField('Short Description', validators=[InputRequired()])
    number_of_headings = IntegerField('Number of Headings', validators=[InputRequired(), NumberRange(min=1)])
    have_videos = BooleanField('Do you have videos for the course?')
    video_links = TextAreaField('Video Links (separated by commas)', validators=[Optional()])
    videos_free_to_use = BooleanField('Are the videos free to use?')