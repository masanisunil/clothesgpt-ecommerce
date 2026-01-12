from flask_jwt_extended import get_jwt_identity
from app.models.user import User

def admin_required():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user or user.role != "ADMIN" :
        return False

    return True
