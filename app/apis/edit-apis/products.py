from flask import render_template, abort

@app.route('/products/edit/<int:product_id>', methods=['GET', 'POST'])
def edit_product(product_id):
    product = get_product_by_id(product_id)
    if not current_user.can_edit_products():
        abort(403)

@app.route('/products/add', methods=['GET', 'POST'])
def add_product():
    if not current_user.can_add_products():
        abort(403) 
