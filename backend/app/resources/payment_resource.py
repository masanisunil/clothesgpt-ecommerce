from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.order import Order
from flask import request

class MockPaymentResource(Resource):

    @jwt_required()
    def post(self):

        user_id = int(get_jwt_identity())
        data = request.get_json()

        order_id = data.get("order_id")
        payment_method = data.get("payment_method", "CARD")

        if not order_id:
            return {"message": "order_id is required"}, 400

        order = Order.query.get(order_id)

        if not order:
            return {"message": "Order not found"}, 404

        if order.user_id != user_id:
            return {"message": "Access denied"}, 403

        if order.status != "CREATED":
            return {"message": "Order already processed"}, 400

        # 🔹 MOCK PAYMENT SUCCESS
        order.payment_method = payment_method
        order.payment_status = "SUCCESS"
        order.status = "PAID"

        db.session.commit()

        return {
            "message": "Payment successful",
            "order_id": order.id,
            "status": order.status
        }, 200
