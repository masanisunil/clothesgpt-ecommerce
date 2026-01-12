from flask import Blueprint
from flask_restful import Api
from app.resources.auth_resource import RegisterResource, LoginResource
from app.resources.sms_otp_resource import (
    SendSMSOTPResource,
    VerifySMSOTPResource
)

auth_bp = Blueprint("auth", __name__)
api = Api(auth_bp)

api.add_resource(RegisterResource, "/register")
api.add_resource(LoginResource, "/login")
api.add_resource(SendSMSOTPResource, "/otp/sms")
api.add_resource(VerifySMSOTPResource, "/otp/sms/verify")
