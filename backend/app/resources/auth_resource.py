from flask_restful import Resource
from flask import request
from app.models.user import User
from app.extensions import db
from flask_jwt_extended import create_access_token


class RegisterResource(Resource):
    def post(self):
        data = request.get_json()

        # 1️⃣ Validate input
        if not data.get("email") or not data.get("password"):
            return {"message": "Email and password required"}, 400

        # 2️⃣ Check if user exists
        if User.query.filter_by(email=data["email"]).first():
            return {"message": "User already exists"}, 409

        # 3️⃣ Create user
        user = User(
            name=data.get("name"),
            email=data["email"],
            role="USER"   # ✅ important
        )
        user.set_password(data["password"])

        # 4️⃣ Save to DB
        db.session.add(user)
        db.session.commit()

        return {"message": "User registered successfully"}, 201


class LoginResource(Resource):
    def post(self):
        data = request.get_json()

        user = User.query.filter_by(email=data.get("email")).first()

        if not user or not user.check_password(data.get("password")):
            return {"message": "Invalid credentials"}, 401

        # ✅ Include role in JWT
        token = create_access_token(
            identity=str(user.id),
            additional_claims={
                "role": user.role
            }
        )

        return {
            "access_token": token,
            "role": user.role
        }, 200
