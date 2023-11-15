from flask import render_template, abort

@api.route('/products/edit/<int:product_id>', methods=['GET', 'POST'])
def edit_product(product_id):
    product = get_product_by_id(product_id)
    if not current_user.can_edit_products():
        abort(403)

