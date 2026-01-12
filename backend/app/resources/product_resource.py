from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required
from app.models.product import Product
from app.extensions import db
from app.utils.permissions import admin_required

class ProductCreateResource(Resource):

    @jwt_required()
    def post(self):

        # 1️⃣ Check admin permission
        if not admin_required():
            return {"message": "Admin access required"}, 403

        # 2️⃣ Read request data
        data = request.get_json()

        # 3️⃣ Validate input
        if not data.get("name") or not data.get("price"):
            return {"message": "Name and price are required"}, 400

        # 4️⃣ Create product object
        product = Product(
            name=data["name"],
            description=data.get("description"),
            price=data["price"],
            stock=data.get("stock", 0),
            image_url=data.get("image_url")
        )

        # 5️⃣ Save to database
        db.session.add(product)
        db.session.commit()

        return {
            "message": "Product created successfully",
            "product_id": product.id
        }, 201
    



class ProductListResource(Resource):

    def get(self):
        products = Product.query.all()

        result = []

        for product in products:
            result.append({
                "id": product.id,
                "name": product.name,
                "description": product.description,
                "price": product.price,
                "stock": product.stock,
                "image_url": product.image_url
            })

        return result, 200
    


class ProductDetailResource(Resource):

    def get(self, product_id):

        product = Product.query.get(product_id)

        if not product:
            return {"message": "Product not found"}, 404

        return {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "stock": product.stock,
            "image_url": product.image_url
        }, 200
    


class ProductUpdateResource(Resource):

    @jwt_required()
    def put(self, product_id):

        # 1️⃣ Admin check
        if not admin_required():
            return {"message": "Admin access required"}, 403

        # 2️⃣ Fetch product
        product = Product.query.get(product_id)

        if not product:
            return {"message": "Product not found"}, 404

        # 3️⃣ Read request data
        data = request.get_json()

        # 4️⃣ Update fields (only if provided)
        product.name = data.get("name", product.name)
        product.description = data.get("description", product.description)
        product.price = data.get("price", product.price)
        product.stock = data.get("stock", product.stock)
        product.image_url = data.get("image_url", product.image_url)


        # 5️⃣ Save changes
        db.session.commit()

        return {"message": "Product updated successfully"}, 200\
        


class ProductDeleteResource(Resource):

    @jwt_required()
    def delete(self, product_id):

        # 1️⃣ Admin check
        if not admin_required():
            return {"message": "Admin access required"}, 403

        # 2️⃣ Fetch product
        product = Product.query.get(product_id)

        if not product:
            return {"message": "Product not found"}, 404

        # 3️⃣ Delete product
        db.session.delete(product)
        db.session.commit()

        return {"message": "Product deleted successfully"}, 200