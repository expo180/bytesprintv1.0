# /models/articles.py
from .. import db

class Article(db.Model):
    __tablename__=  'articles'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text(), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    article = db.Column(db.Text(), nullable=False)
    pictures = db.Column(db.Text(), nullable=False)
    article_date_posted = db.Column(db.DateTime(), default=datetime.utcnow)
    

article_authors = db.Table(
    'article_authors',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('article_id', db.Integer, db.ForeignKey('articles.id'), primary_key=True)
)


comment_authors = db.Table(
    'comment_authors',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('comment_id', db.Integer, db.ForeignKey('comments.id'), primary_key=True)
)