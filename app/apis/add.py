from flask import render_template, abort

@api.route('/products/add', methods=['GET', 'POST'])
def add_product():
    if not current_user.can_add_products():
        abort(403) 