from flask import Blueprint
from flask_restful import Api
from app.resources.payment_resource import MockPaymentResource

payment_bp = Blueprint("payment", __name__)
api = Api(payment_bp)

api.add_resource(MockPaymentResource, "/mock")
