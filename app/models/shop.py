# /models/shop.py
from .. import db

class Products(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text(), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    price = db.Column(db.Float, nullable=False)
    left = db.Column(db.Integer, nullable=False)
    pictures = db.Column(db.String(255), nullable=False)