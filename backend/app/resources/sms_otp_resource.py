import random
from datetime import datetime, timedelta
from flask_restful import Resource
from flask import request, current_app
from twilio.rest import Client
from app.models.otp import OTP
from app.extensions import db
from flask_jwt_extended import create_access_token
from app.models.user import User

class SendSMSOTPResource(Resource):
    def post(self):
        phone = request.json.get("phone")

        if not phone:
            return {"message": "Phone number required"}, 400

        otp_code = str(random.randint(100000, 999999))

        otp = OTP(
            phone=phone,
            code=otp_code,
            expires_at=datetime.utcnow() + timedelta(minutes=5)
        )

        db.session.add(otp)
        db.session.commit()

        # Twilio client
        client = Client(
            current_app.config["TWILIO_ACCOUNT_SID"],
            current_app.config["TWILIO_AUTH_TOKEN"]
        )

        client.messages.create(
            body=f"Your FashionX OTP is {otp_code}",
            from_=current_app.config["TWILIO_PHONE_NUMBER"],
            to=phone
        )

        return {"message": "OTP sent successfully"}, 200
    



class VerifySMSOTPResource(Resource):
    def post(self):
        phone = request.json.get("phone")
        code = request.json.get("otp")

        otp = OTP.query.filter_by(phone=phone, code=code).order_by(OTP.created_at.desc()).first()

        if not otp or otp.is_expired():
            return {"message": "Invalid or expired OTP"}, 400

        user = User.query.filter_by(phone=phone).first()

        if not user:
            return {"message": "User not found"}, 404

        db.session.delete(otp)
        db.session.commit()

        token = create_access_token(
            identity=str(user.id),
            additional_claims={"role": user.role}
        )

        return {"access_token": token}, 200
