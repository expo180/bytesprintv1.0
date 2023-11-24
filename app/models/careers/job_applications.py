# /models/job_applications.py
from .. import db

class Applications(db.Model):
    __tablename__ = 'applications'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(64), index=True, nullable=False)
    last_name = db.Column(db.String(64), index=True, nullable=False)
    email = db.Column(db.String(64), index=True, nullable=False)
    github = db.Column(db.Text())
    essay_one = db.Column(db.Text(), nullable=False)
    essay_two = db.Column(db.Text(), nullable=False)
    essay_three = db.Column(db.Text(), nullable=False)
    resume = db.Column(db.String(255), nullable=False)