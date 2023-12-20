# Configuration file
# bytesprintrobotics LLC
# config.py

import os
class Config:
    SECRET_KEY ='AAAAB3NzaC1yc2EAAAADAQABAAABAQCjrFncQTzkFeeK7GB7b2Y6CqGBAiuovcWeWr3W1dqwZHu86kJxuNSAEUnJG82HlHOxmPT7tZNYaruKaoMUufxqnLWPr+1+m0Jg4hZMTRA3Uoh/TELKjj+LpObLhZT7Mphk0T+n27hrW6gF+hmq4sd3wYAJYPQx3iou65pqN78DXe8wDBjm0evHoDmgeQ1mPZBFcjmsGz+ntjiEhnobEmADmhDEYdF3aQQGUIEiyFVpMns5W1t4VvUTfVjQCjdGljMzW7rH3dJkraALwWlUmcX3LXetJLQWuOV3ezsx0q3zp84XLQMHUV62jtDOJy39aIjQDE+lo2/kqnQJ3Du1DE8p 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'
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
