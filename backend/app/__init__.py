from flask import Flask
from .config import DevelopmentConfig,Config
from .extensions import db,migrate,jwt
from app.routes.auth import auth_bp
from app.routes.product import product_bp
from app.routes.cart import cart_bp
from app.routes.order import order_bp
from app.routes.payment import payment_bp
from app.routes.admin_order import admin_order_bp
from app.errors import register_error_handlers
from flask_cors import CORS
from app.routes.admin_dashboard_routes import admin_dashboard_bp


def create_app():
    app=Flask(__name__)
    app.config.from_object(Config)
    CORS(
    app,
    resources={r"/api/*": {"origins": "*"}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

    db.init_app(app)
    migrate.init_app(app,db)
    jwt.init_app(app)

    from app import models
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(product_bp, url_prefix="/api/products")
    app.register_blueprint(cart_bp, url_prefix="/api/cart")
    app.register_blueprint(order_bp, url_prefix="/api/orders")
    app.register_blueprint(payment_bp, url_prefix="/api/payments")
    app.register_blueprint(admin_order_bp, url_prefix="/api/admin")
    register_error_handlers(app)
    app.register_blueprint(
    admin_dashboard_bp,
    url_prefix="/api/admin/dashboard"
)

    @app.route('/')
    def home():
        return {'message':"server is running..!"}
    
    return app
