from flask_restful import Resource
from flask_jwt_extended import jwt_required
from app.utils.permissions import admin_required
from app.models.order import Order
from app.extensions import db
from flask import request

class AdminOrderListResource(Resource):

    @jwt_required()
    def get(self):

        if not admin_required():
            return {"message": "Admin access required"}, 403

        orders = Order.query.order_by(Order.created_at.desc()).all()

        result = []

        for order in orders:
            result.append({
                "order_id": order.id,
                "user_id": order.user_id,
                "total_price": order.total_price,
                "status": order.status,
                "payment_status": order.payment_status,
                "created_at": order.created_at.isoformat()
            })

        return result, 200


class AdminOrderUpdateStatusResource(Resource):

    @jwt_required()
    def put(self, order_id):

        if not admin_required():
            return {"message": "Admin access required"}, 403

        data = request.get_json()
        status = data.get("status")

        allowed_statuses = ["SHIPPED", "DELIVERED", "CANCELLED"]

        if status not in allowed_statuses:
            return {
                "message": f"Invalid status. Allowed: {allowed_statuses}"
            }, 400

        order = Order.query.get(order_id)

        if not order:
            return {"message": "Order not found"}, 404

        order.status = status
        db.session.commit()

        return {
            "message": "Order status updated",
            "order_id": order.id,
            "new_status": order.status
        }, 200