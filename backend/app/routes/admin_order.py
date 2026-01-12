from flask import Blueprint
from flask_restful import Api
from app.resources.admin_order_resource import (
    AdminOrderListResource,
    AdminOrderUpdateStatusResource
)

admin_order_bp = Blueprint("admin_orders", __name__)
api = Api(admin_order_bp)

api.add_resource(AdminOrderListResource, "/orders")
api.add_resource(AdminOrderUpdateStatusResource, "/orders/<int:order_id>")
