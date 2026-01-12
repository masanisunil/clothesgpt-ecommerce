from flask import Blueprint
from flask_restful import Api
from app.resources.product_resource import (
    ProductCreateResource,
    ProductListResource,
    ProductDetailResource,
    ProductUpdateResource,
    ProductDeleteResource
)

product_bp = Blueprint("products", __name__)
api = Api(product_bp)

api.add_resource(ProductListResource, "")
api.add_resource(ProductCreateResource, "")
api.add_resource(ProductDetailResource, "/<int:product_id>")
api.add_resource(ProductUpdateResource, "/<int:product_id>")
api.add_resource(ProductDeleteResource, "/<int:product_id>")