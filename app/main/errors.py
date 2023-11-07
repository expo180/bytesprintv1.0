from flask import render_template
from . import main

@main.app_errorhandler(403)
def forbidden(e):
    return render_template('errors/403-error.html')

@main.app_errorhandler(404)
def page_not_found(e):
    return render_template('errors/404-error.html'), 404

@main.app_errorhandler(500)
def internal_server_error(e):
    return render_template('errors/500.html'), 500
