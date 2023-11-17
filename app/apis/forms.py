# apis forms.py

from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, SelectField, SubmitField, RadioField, BooleanField
from wtforms.validators import InputRequired, Email, Length

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
    title = StringField(
        'Course Title', 
        validators=[
            InputRequired(),
            Length(
                max=255,
                min=125
            )

        ]

    )