from flask import Blueprint
from flask_restful import Api
from app.resources.order_resource import (
    CheckoutResource,
    OrderHistoryResource,
    OrderDetailResource
)

order_bp = Blueprint("orders", __name__)
api = Api(order_bp)

api.add_resource(CheckoutResource, "/checkout")
api.add_resource(OrderHistoryResource, "")
api.add_resource(OrderDetailResource, "/<int:order_id>")
