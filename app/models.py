# models.py
from datetime import datetime
import hashlib
from werkzeug.security import generate_password_hash, check_password_hash
from flask import current_app, request, url_for
from flask_login import UserMixin, AnonymousUserMixin
from itsdangerous import Serializer
from . import db
from . import login_manager
from .instructors import INSTRUCTORS

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Permission definition
class Permission:
    FOLLOW = 2 
    COMMENT = 4
    MESSAGE = 8
    WRITE = 16
    ADD_LEARNER = 32
    REMOVE_LEARNER = 64
    REMOVE_COMMENT = 128
    POST_ARTICLE = 256
    EDIT_ARTICLE = 512
    REMOVE_ARTICLE = 1024
    TECHNICAL_WRITER = 2048
    MODERATE = 4096
    ADD_COURSES = 8192
    EDIT_COURSES = 16384
    REMOVE_COURSES = 32768
    EDIT_PRODUCTS = 65536
    ADD_PRODUCTS = 131072
    REMOVE_PRODUCTS = 262144
    ADD_MANAGER = 524288
    REMOVE_MANAGER = 1048576
    ADD_HR = 2097152
    REMOVE_HR = 4194304
    ADD_3DMAP = 8388608
    EDIT_3DMAP = 16777216
    REMOVE_3DMAP = 33554432
    INSTRUCTOR = 67108864
    SALES_MANAGER = 134217728
    HR_MANAGER = 268435456
    ACCOUNTING_MANAGER = 536870912
    ADMIN = 1073741824


# Role definition
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    default = db.Column(db.Boolean, default=False, index=True)
    permissions = db.Column(db.Integer)
    users = db.relationship('User', backref='role', lazy='dynamic')
    
    def __init__(self, **kwargs):
        super(Role, self).__init__(**kwargs)
        if self.permissions is None:
            self.permissions = 0
    
    @staticmethod
    def insert_roles():
        roles = {
            'User' : [
                Permission.FOLLOW,
                Permission.COMMENT,
                Permission.MESSAGE
            ],
             'Technical_writer' : [
                Permission.WRITE,
                Permission.FOLLOW,
                Permission.COMMENT,
                Permission.MESSAGE,
                Permission.POST_ARTICLE,
                Permission.EDIT_ARTICLE,
                Permission.REMOVE_ARTICLE,
                Permission.TECHNICAL_WRITER
            ],
            'Instructor' : [
                Permission.WRITE, 
                Permission.COMMENT,
                Permission.FOLLOW,
                Permission.MESSAGE,
                Permission.ADD_COURSES,
                Permission.EDIT_COURSES,
                Permission.REMOVE_COURSES,
                Permission.INSTRUCTOR,
            ],
            'Sales_Manager': [
                Permission.WRITE, 
                Permission.COMMENT,
                Permission.FOLLOW,
                Permission.MESSAGE,
                Permission.ADD_PRODUCTS,
                Permission.ADD_3DMAP,
                Permission.REMOVE_3DMAP,
                Permission.EDIT_3DMAP,
                Permission.REMOVE_PRODUCTS,
                Permission.EDIT_PRODUCTS,
                Permission.SALES_MANAGER
            ],
            'HR_Manager': [
                Permission.WRITE, 
                Permission.COMMENT,
                Permission.FOLLOW,
                Permission.MESSAGE,
                Permission.REMOVE_COMMENT,
                Permission.REMOVE_LEARNER,
                Permission.REMOVE_MANAGER,
                Permission.HR_MANAGER
            ],
            'Accounting_Manager': [
                Permission.WRITE, 
                Permission.COMMENT,
                Permission.FOLLOW,
                Permission.MESSAGE,
                Permission.ADD_LEARNER,
                Permission.REMOVE_LEARNER,
                Permission.ACCOUNTING_MANAGER
            ],
            'Administrator' : [
                Permission.WRITE, 
                Permission.COMMENT,
                Permission.FOLLOW,
                Permission.MESSAGE,
                Permission.POST_ARTICLE,
                Permission.EDIT_ARTICLE,
                Permission.REMOVE_ARTICLE,
                Permission.ADD_3DMAP,
                Permission.REMOVE_3DMAP,
                Permission.EDIT_3DMAP,
                Permission.ADD_PRODUCTS,
                Permission.REMOVE_PRODUCTS,
                Permission.EDIT_PRODUCTS,
                Permission.ADD_LEARNER,
                Permission.REMOVE_LEARNER,
                Permission.ADD_COURSES,
                Permission.EDIT_COURSES,
                Permission.REMOVE_COURSES,
                Permission.ADD_HR,
                Permission.REMOVE_COMMENT,
                Permission.REMOVE_MANAGER,
                Permission.INSTRUCTOR,
                Permission.TECHNICAL_WRITER,
                Permission.SALES_MANAGER,
                Permission.HR_MANAGER,
                Permission.ACCOUNTING_MANAGER,
                Permission.ADMIN
            ]
        }
        default_role = 'User'
        for r in roles:
            role = Role.query.filter_by(name=r).first()
            if role is None:
                role = Role(name=r)
            role.reset_permissions()
            for perm  in roles[r]:
                role.add_permission(perm)
            role.default = (role.name == default_role)
            db.session.add(role)
        db.session.commit()

    def add_permission(self, perm):
        if not self.has_permission(perm):
            self.permissions += perm

    def remove_permission(self, perm):
        if self.has_permission(perm):
            self.permissions -= perm

    def reset_permissions(self):
        self.permissions = 0
    
    def has_permission(self, perm):
        return self.permissions & perm == perm

    def __repr__(self):
        return '<Role %r>' % self.name

db.Table('roles', db.Model.metadata, extend_existing=True)

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), unique=True, nullable=False)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(128), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    age = db.Column(db.String)
    name = db.Column(db.String(64))
    gender = db.Column(db.String)
    country = db.Column(db.String)
    areas_of_interest = db.Column(db.String)
    bio = db.Column(db.Text())
    position = db.Column(db.String(64))
    profile_picture = db.Column(db.Text())
    iq = db.Column(db.Integer)
    eq = db.Column(db.Integer)
    courses = db.relationship('Course', secondary='enrollments', backref='users')
    articles = db.relationship('Article', secondary='article_authors', backref='users')
    comments = db.relationship('Comments', secondary='comment_authors', backref='users')
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    confirmed = db.Column(db.Boolean, default=False)
    skills_avg = db.Column(db.Integer)
    games_avg = db.Column(db.Integer)
    
    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')
    
    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_confirmation_token(self, expiration=3600):
        s = Serializer(current_app.config['SECRET_KEY'], expiration)
        return s.dumps({'confirm':self.id}).decode('utf-8')

    def confirm(self, token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try :
            data = s.loads(token.encoded('utf-8'))

        except :
            return False
        
        if data.get('confirm') != self.id:
            return False
        
        self.confirmed =  True
        db.session.add(self)
        return True

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        if self.email == current_app.config['BYTESPRINT_ADMIN']:
            self.role = Role.query.filter_by(name='Administrator').first()
            print(f"User email: {self.email}")
            print(f"TECHNICAL_WRITER config value: {current_app.config['TECHNICAL_WRITER']}")


        elif self.email == current_app.config['TECHNICAL_WRITER']:
            print("Assigning role: Technical Writer")
            self.role = Role.query.filter_by(name='Technical_writer').first()

        elif self.email == current_app.config['SALES_MANAGER']:
            self.role = Role.query.filter_by(name='Sales_Manager').first()

        elif self.email == current_app.config['HR_MANAGER']:
            self.role = Role.query.filter_by(name='HR_Manager').first()

        elif self.email == current_app.config['ACCOUNTING_MANAGER']:
            self.role = Role.query.filter_by(name='Accounting_Manager').first()

        elif self.email in INSTRUCTORS:
            self.role = Role.query.filter_by(name='Instructor').first()

        else:
            self.role = Role.query.filter_by(default=True).first()

    def can(self, perm):
        return self.role is not None and self.role.has_permission(perm)

    def is_administrator(self):
        return self.can(Permission.ADMIN) 

    def is_sales_manager(self):
        return self.can(Permission.SALES_MANAGER)

    def is_hr_manager(self):
        return self.can(Permission.HR_MANAGER)

    def is_accounting_manager(self):
        return self.can(Permission.ACCOUNTING_MANAGER)

    def is_instructor(self):
        return self.can(Permission.INSTRUCTOR)

    def is_technical_writer(self):
        return self.can(Permission.TECHNICAL_WRITER)
    
    def can_edit_products(self):
        return self.role is not None and self.role.has_permission(Permission.EDIT_PRODUCTS)

    def can_add_products(self):
        return self.role is not None and self.role.has_permission(Permission.ADD_PRODUCTS)
    
    def can_remove_products(self):
        return self.role is not None and self.role.has_permission(Permission.REMOVE_PRODUCTS)
    
    def can_add_articles(self):
        return self.role is not None and self.role.has_permission(Permission.POST_ARTICLE)

    def can_edit_articles(self):
        return self.role is not None and self.role.has_permission(Permission.EDIT_ARTICLE)

    def can_remove_articles(self):
        return self.role is not None and self.role.has_permission(Permission.REMOVE_ARTICLE)

    def can_add_learners(self):
        return self.role is not None and self.role.has_permission(Permission.ADD_LEARNER)

    def can_remove_learners(self):
        return self.role is not None and self.role.has_permission(Permission.REMOVE_LEARNER)

    def can_add_3Dmap(self):
        return self.role is not None and self.role.has_permission(Permission.ADD_3DMAP)

    def can_edit_3Dmap(self):
        return self.role is not None and self.role.has_permission(Permission.EDIT_3DMAP)

    def can_remove_3Dmap(self):
        return self.role is not None and self.role.has_permission(Permission.REMOVE_3DMAP)
    
    def can_add_manager(self):
        return self.role is not None and self.role.has_permission(Permission.ADD_MANAGER)

    def can_remove_manager(self):
        return self.role is not None and self.role.has_permission(Permission.REMOVE_MANAGER)

    def can_remove_HR(self):
        return self.role is not None and self.role.has_permission(Permission.REMOVE_HR)

    def can_add_courses(self):
        return self.role is not None and self.role.has_permission(Permission.ADD_COURSES)

    def can_edit_courses(self):
        return self.role is not None and self.role.has_permission(Permission.EDIT_COURSES)

    def can_remove_courses(self):
        return self.role is not None and self.role.has_permission(Permission.REMOVE_COURSES)

    

class AnonymousUser(AnonymousUserMixin):
    def can(self, permissions):
        return False

    def is_administrator(self):
        return False

login_manager.anonymous_user = AnonymousUser



class Course(db.Model):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    author_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255))
    company_name = db.Column(db.String(155))
    university_name = db.Column(db.String(155))
    core_specialization = db.Column(db.String(100))
    course_title = db.Column(db.String(255), nullable=False)
    short_description = db.Column(db.String(265), nullable=False)
    video_url = db.Column(db.String(255), nullable=False)
    video_links = db.relationship('CourseVideoLinks', secondary='course_video_links', backref='courses')
    skills = db.relationship('CourseSkillsList', secondary='course_skills_list', backref='courses') 
    instructor_works = db.relationship('InstructorContributions', secondary='instructor_contributions_list', backref='courses')

class InstructorContributions(db.Model):
    __tablename__ = 'instructor_contributions'
    id = db.Column(db.Integer, primary_key=True)
    scientific_paper_title = db.Column(db.String(255))
    scientific_paper_link = db.Column(db.String(255))


class CourseVideoLinks(db.Model):
    __tablename__ = 'video_links'
    id = db.Column(db.Integer, primary_key=True)
    link = db.Column(db.String(255))
    mask_text = db.Column(db.String(255))

class CourseSkillsList(db.Model):
    __tablename__ = 'course_skills'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

# Defines the relationship between instructor contributions and courses
instructor_contributions_list = db.Table(
    'instructor_contributions_list',
    db.Column('courses_id', db.Integer, db.ForeignKey('courses.id')),
    db.Column('instructor_contributions_id', db.Integer, db.ForeignKey('instructor_contributions.id'))
)

# Defines the relationship between courses and skills
course_skills_list = db.Table(
    'course_skills_list',
    db.Column('courses_id', db.Integer, db.ForeignKey('courses.id'), primary_key=True),
    db.Column('skill_id', db.Integer, db.ForeignKey('course_skills.id'), primary_key=True)
)

# Defines the relationship between courses and video links.
course_video_links = db.Table(
    'course_video_links',
    db.Column('courses_id', db.Integer, db.ForeignKey('courses.id'), primary_key=True),
    db.Column('link_id', db.Integer, db.ForeignKey('video_links.id'), primary_key=True)
)

# Defines the enrollments table for the many-to-many relationship between users and courses
enrollments = db.Table('enrollments',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('course_id', db.Integer, db.ForeignKey('courses.id'), primary_key=True)
)

class Curriculum(db.Model):
    __tablename__ = 'curricula'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), index=True)
    price = db.Column(db.Float(15, 9), index=True, default=2.0)
    overview = db.Column(db.Text())
    skill01 = db.Column(db.Text())
    skill02 = db.Column(db.Text())
    skill03 = db.Column(db.Text())
    skill04 = db.Column(db.Text())
    icon = db.Column(db.String(255))  # Add an icon field
    links = db.relationship('Link', back_populates='curriculum')
    # Establishing a many-to-many relationship with the Skill table
    skills = db.relationship('Skill', secondary='curriculum_skills', back_populates='curricula')

class Skill(db.Model):
    __tablename__ = 'skills'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), index=True, unique=True)

    # Establishing a many-to-many relationship with the Curriculum table
    curricula = db.relationship('Curriculum', secondary='curriculum_skills', back_populates='skills')

# Association table for the many-to-many relationship
class CurriculumSkills(db.Model):
    __tablename__ = 'curriculum_skills'
    id = db.Column(db.Integer, primary_key=True)
    curriculum_id = db.Column(db.Integer, db.ForeignKey('curricula.id'))
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'))

class Link(db.Model):
    __tablename__ = 'links'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), index=True)
    mask_text = db.Column(db.String(50))  # Text to mask the link
    link_type = db.Column(db.String(20))  # Type of link (GitHub, Guide, etc.)

    # Establishing a many-to-one relationship with the Curriculum model
    curriculum_id = db.Column(db.Integer, db.ForeignKey('curricula.id'))
    curriculum = db.relationship('Curriculum', back_populates='links')




        

# Defines the products table for the shop
class Products(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text(), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    price = db.Column(db.Float, nullable=False)
    left = db.Column(db.Integer, nullable=False)
    pictures = db.Column(db.String(255), nullable=False)


# Defines the applications table for instructors and prospective employees
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


class Comments(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    comment  = db.Column(db.Text())
    date = db.Column(db.DateTime(), default=datetime.utcnow)


