from flask import Blueprint

main = Blueprint('main', __name__)
from . import views, errors
from ..models import Permission, Role, User


@main.app_context_processor
def inject_permissions():
    return dict(Permission=Permission, Role=Role, User=User)