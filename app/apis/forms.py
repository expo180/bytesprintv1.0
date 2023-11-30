# apis forms.py

from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, SelectField, SubmitField, RadioField, BooleanField, TextAreaField, IntegerField, FileField 
from wtforms.validators import InputRequired, Email, Length, Optional, NumberRange
from flask_wtf.file import FileAllowed, FileRequired

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

class BasicCourseInfoForm(FlaskForm):
    author_name = StringField(
        'Author Name', 
        validators=[
            InputRequired()
        ]
    )
    email = StringField(
        'Email', 
        validators=[
            Email()
        ]
    )
    company_name = StringField(
        'Company Name', 
        validators=[
            Optional()
        ]
    )
    university_name = StringField(
        'Institution Name', 
        validators=[
            Optional()
        ]
    )
    core_specialization = StringField(
        'Core Specialization Field', 
        validators=[
            InputRequired()
        ]
    )
    course_title = StringField(
        'Course Title', 
        validators=[
            InputRequired()
        ]
    )
    short_description = TextAreaField(
        'Short Description', 
        validators=[
            InputRequired()
        ]
    )

    video = FileField(
        'Video (Max size: 500 MB)', 
        validators=[
            Optional(),
            FileAllowed(
                ['mp4', 'avi'], 
                'Only MP4 and AVI formats are allowed.'
            )
        ]
    )
    thumbnail = FileField(
        'Please upload a nice thumbnail for your course',
        validators = [
        InputRequired(),
        FileAllowed(
            ['jpeg', 'png', 'jpg'],
            'Only jpeg, png, jpg formats are allowed.'
        )


        ]

    )

class CourseDetailsForm(FlaskForm):
    tech_field = SelectField(
        'Course Category', 
        choices=[
            ('None', '- Select a category -'),
            ('AI', 'Artificial Intelligence'),
            ('Robotics', 'Robotics'),
            ('Web_Dev', 'Web Development'),
            ('DevOps', 'DevOps'),
            ('Crypto', 'Cryptocurrency'),
            ('Data_Science', 'Data Science'),
            ('Game_Dev', 'Game Development'),
            ('App_Dev', 'App Development'),
            ('Cybersecurity', 'Cybersecurity')
        ], 
        validators=[InputRequired()]
    )

class CourseFinalStepForm(FlaskForm):
    


