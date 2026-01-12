from flask import Blueprint
from flask_restful import Api
from app.resources.admin_dashboard_resource import AdminDashboardStatsResource

admin_dashboard_bp = Blueprint("admin_dashboard", __name__)
api = Api(admin_dashboard_bp)

api.add_resource(AdminDashboardStatsResource, "/stats")
