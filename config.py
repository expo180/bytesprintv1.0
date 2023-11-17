# Configuration file
# bytesprintrobotics LLC
# config.py

import os
class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.googlemail.com')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', '587'))
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'true').lower() in ['true', 'on', '1']
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    BYTESPRINT_ADMIN = os.environ.get('BYTESPRINT_ADMIN')
    TECHNICAL_WRITER = os.environ.get('TECHNICAL_WRITER')
    SALES_MANAGER = os.environ.get('SALES_MANAGER')
    HR_MANAGER = os.environ.get('HR_MANAGER')
    ACCOUNTING_MANAGER = os.environ.get('ACCOUNTING_MANAGER')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
	DEBUG = True
	SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL')

class TestingConfig(Config):
	TESTING = True
	SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL')

class ProductionConfig(Config):
	SQLALCHEMY_DATABASE_URI = os.environ.get('PRODUCTION_DATABASE_URL')

config = {
	'development' : DevelopmentConfig,
	'testing' : TestingConfig,
	'production' : ProductionConfig,

	'default' : DevelopmentConfig 
}
