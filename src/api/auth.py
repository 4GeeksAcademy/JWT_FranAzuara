from flask_jwt_extended import JWTManager
from api.models import User

jwt = JWTManager()

# Funcion que utiliza Flask para Crea el token
@jwt.user_identity_loader
def user_identity_lookup(User):
    return User.id


# Register a callback function that loads a user from your database whenever
# a protected route is accessed. This should return any python object on a
# successful lookup, or None if the lookup failed for any reason (for example
# if the user has been deleted from the database).

#Busca al usuario en las areas/vistas de la web donde el TOKEN es requerido (para mostrar o no la vista)
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()