from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.cart import Cart, CartItem
from app.models.product import Product

class AddToCartResource(Resource):

    @jwt_required()
    def post(self):

        # 1️⃣ Get logged-in user ID
        user_id = int(get_jwt_identity())

        # 2️⃣ Read request data
        data = request.get_json()
        product_id = data.get("product_id")
        quantity = data.get("quantity", 1)

        # 3️⃣ Validate input
        if not product_id:
            return {"message": "product_id is required"}, 400

        if quantity <= 0:
            return {"message": "quantity must be greater than 0"}, 400

        # 4️⃣ Check product exists
        product = Product.query.get(product_id)
        if not product:
            return {"message": "Product not found"}, 404

        # 5️⃣ Get or create cart
        cart = Cart.query.filter_by(user_id=user_id).first()
        if not cart:
            cart = Cart(user_id=user_id)
            db.session.add(cart)
            db.session.commit()  # commit so cart gets ID

        # 6️⃣ Check if product already in cart
        cart_item = CartItem.query.filter_by(
            cart_id=cart.id,
            product_id=product_id
        ).first()

        if cart_item:
            cart_item.quantity += quantity
        else:
            cart_item = CartItem(
                cart_id=cart.id,
                product_id=product_id,
                quantity=quantity
            )
            db.session.add(cart_item)

        # 7️⃣ Save changes
        db.session.commit()

        return {"message": "Product added to cart"}, 200
    


class ViewCartResource(Resource):

    @jwt_required()
    def get(self):

        # 1️⃣ Get logged-in user
        user_id = int(get_jwt_identity())

        # 2️⃣ Get user's cart
        cart = Cart.query.filter_by(user_id=user_id).first()

        if not cart:
            return {
                "items": [],
                "total_price": 0
            }, 200

        # 3️⃣ Get cart items
        cart_items = CartItem.query.filter_by(cart_id=cart.id).all()

        items = []
        total_price = 0

        # 4️⃣ Build response
        for item in cart_items:
            product = Product.query.get(item.product_id)

            if not product:
                continue  # safety check

            subtotal = product.price * item.quantity
            total_price += subtotal

            items.append({
                "product_id": product.id,
                "name": product.name,
                "price": product.price,
                "quantity": item.quantity,
                "subtotal": subtotal,
                "image_url": product.image_url
            })

        return {
            "items": items,
            "total_price": total_price
        }, 200



class RemoveCartItemResource(Resource):

    @jwt_required()
    def delete(self, product_id):

        # 1️⃣ Get logged-in user
        user_id = int(get_jwt_identity())

        # 2️⃣ Get user's cart
        cart = Cart.query.filter_by(user_id=user_id).first()

        if not cart:
            return {"message": "Cart not found"}, 404

        # 3️⃣ Find cart item
        cart_item = CartItem.query.filter_by(
            cart_id=cart.id,
            product_id=product_id
        ).first()

        if not cart_item:
            return {"message": "Item not found in cart"}, 404

        # 4️⃣ Delete item
        db.session.delete(cart_item)
        db.session.commit()

        return {"message": "Item removed from cart"}, 200
    

class UpdateCartItemQuantityResource(Resource):

    @jwt_required()
    def put(self, product_id):

        # 1️⃣ Get logged-in user
        user_id = int(get_jwt_identity())

        # 2️⃣ Read request data
        data = request.get_json()
        quantity = data.get("quantity")

        if quantity is None:
            return {"message": "quantity is required"}, 400

        if quantity < 1:
            return {"message": "quantity must be at least 1"}, 400

        # 3️⃣ Get user's cart
        cart = Cart.query.filter_by(user_id=user_id).first()

        if not cart:
            return {"message": "Cart not found"}, 404

        # 4️⃣ Find cart item
        cart_item = CartItem.query.filter_by(
            cart_id=cart.id,
            product_id=product_id
        ).first()

        if not cart_item:
            return {"message": "Item not found in cart"}, 404

        # 5️⃣ Update quantity
        cart_item.quantity = quantity

        db.session.commit()

        return {
            "message": "Cart item quantity updated",
            "product_id": product_id,
            "quantity": quantity
        }, 200