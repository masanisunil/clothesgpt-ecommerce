from flask import Blueprint
from flask_restful import Api
from app.resources.cart_resource import (
    AddToCartResource,
    ViewCartResource,
    RemoveCartItemResource,
    UpdateCartItemQuantityResource,
)

cart_bp = Blueprint("cart", __name__)
api = Api(cart_bp)

api.add_resource(AddToCartResource, "")
api.add_resource(ViewCartResource, "")
api.add_resource(RemoveCartItemResource, "/<int:product_id>")
api.add_resource(UpdateCartItemQuantityResource, "/<int:product_id>")