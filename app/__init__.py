from flask import Flask
from flask_mail import Mail
from flask_moment import Moment
from flask_sqlalchemy import SQLAlchemy
from config import config
from flask_bootstrap import Bootstrap
from flask_login import LoginManager
from flask_oauthlib.client import OAuth
from flask_restcountries import CountriesAPI
from flask_cors import CORS
from flask_migrate import Migrate

login_manager = LoginManager()
login_manager.login_view = 'auth.login'
bootstrap = Bootstrap()
mail = Mail()
db = SQLAlchemy()
moment = Moment()
oauth = OAuth()
rapi = CountriesAPI()
migrate = Migrate()


def create_app(production=True):
    app = Flask(__name__)
    app.config.from_object(config['production'])
    config['production'].init_app(app)
    bootstrap.init_app(app)
    mail.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    moment.init_app(app)
    login_manager.init_app(app)
    oauth.init_app(app)
    rapi.init_app(app)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .apis import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api/v1')

    with app.app_context():
        db.create_all()
        from app.models import Role
        Role.insert_roles()
        

    return app
