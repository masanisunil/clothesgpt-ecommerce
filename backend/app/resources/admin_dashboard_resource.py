from flask_restful import Resource
from flask_jwt_extended import jwt_required
from app.utils.permissions import admin_required
from app.models.product import Product
from app.models.order import Order
from app.extensions import db

class AdminDashboardStatsResource(Resource):

    @jwt_required()
    def get(self):

        if not admin_required():
            return {"message": "Admin access required"}, 403

        total_products = Product.query.count()
        total_orders = Order.query.count()

        total_revenue = (
            db.session.query(db.func.sum(Order.total_price))
            .filter(Order.status == "PAID")
            .scalar()
        ) or 0

        orders_by_status = {
            "PAID": Order.query.filter_by(status="PAID").count(),
            "SHIPPED": Order.query.filter_by(status="SHIPPED").count(),
            "DELIVERED": Order.query.filter_by(status="DELIVERED").count(),
            "CANCELLED": Order.query.filter_by(status="CANCELLED").count(),
        }

        return {
            "total_products": total_products,
            "total_orders": total_orders,
            "total_revenue": total_revenue,
            "orders_by_status": orders_by_status
        }, 200
