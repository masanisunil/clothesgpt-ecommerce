from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.cart import Cart, CartItem
from app.models.order import Order, OrderItem
from app.models.product import Product

class CheckoutResource(Resource):

    @jwt_required()
    def post(self):

        # 1️⃣ Get logged-in user
        user_id = int(get_jwt_identity())

        # 2️⃣ Fetch user's cart
        cart = Cart.query.filter_by(user_id=user_id).first()

        if not cart:
            return {"message": "Cart not found"}, 404

        # 3️⃣ Fetch cart items
        cart_items = CartItem.query.filter_by(cart_id=cart.id).all()

        if not cart_items:
            return {"message": "Cart is empty"}, 400

        # 4️⃣ Create order (temporary total = 0)
        order = Order(
            user_id=user_id,
            total_price=0
        )
        db.session.add(order)
        db.session.flush()  # get order.id without commit

        total_price = 0

        # 5️⃣ Copy cart items → order items
        for item in cart_items:
            product = Product.query.get(item.product_id)

            if not product:
                continue  # safety

            subtotal = product.price * item.quantity
            total_price += subtotal

            order_item = OrderItem(
                order_id=order.id,
                product_id=product.id,
                quantity=item.quantity,
                price=product.price
            )
            db.session.add(order_item)

        # 6️⃣ Update order total
        order.total_price = total_price

        # 7️⃣ Clear cart
        CartItem.query.filter_by(cart_id=cart.id).delete()

        # 8️⃣ Save everything
        db.session.commit()

        return {
            "message": "Order placed successfully",
            "order_id": order.id,
            "total_price": total_price
        }, 201
    


class OrderHistoryResource(Resource):

    @jwt_required()
    def get(self):

        # 1️⃣ Get logged-in user
        user_id = int(get_jwt_identity())

        # 2️⃣ Fetch user orders
        orders = Order.query.filter_by(user_id=user_id)\
                            .order_by(Order.created_at.desc())\
                            .all()

        result = []

        # 3️⃣ Serialize orders
        for order in orders:
            result.append({
                "order_id": order.id,
                "total_price": order.total_price,
                "status": order.status,
                "created_at": order.created_at.isoformat()
            })

        return result, 200
    

class OrderDetailResource(Resource):

    @jwt_required()
    def get(self, order_id):

        # 1️⃣ Get logged-in user
        user_id = int(get_jwt_identity())

        # 2️⃣ Fetch order
        order = Order.query.get(order_id)

        if not order:
            return {"message": "Order not found"}, 404

        # 3️⃣ Ownership check
        if order.user_id != user_id:
            return {"message": "Access denied"}, 403

        # 4️⃣ Fetch order items
        order_items = OrderItem.query.filter_by(order_id=order.id).all()

        items = []

        for item in order_items:
            product = Product.query.get(item.product_id)

            items.append({
                "product_id": item.product_id,
                "product_name": product.name if product else "Deleted product",
                "quantity": item.quantity,
                "price": item.price,
                "subtotal": item.price * item.quantity
            })

        return {
            "order_id": order.id,
            "status": order.status,
            "total_price": order.total_price,
            "created_at": order.created_at.isoformat(),
            "items": items
        }, 200