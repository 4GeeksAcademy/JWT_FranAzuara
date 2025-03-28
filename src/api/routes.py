"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, current_user

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/sign_up', methods=['POST'])
def create_user():
    email= request.json.get("email",None)
    password= request.json.get("password",None)

    #Crear nuevo usuario
    new_user = User(email=email, is_active=True)
    new_user.set_password(password)

    #Guardar en la base de datos
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado"}), 201

@api.route('/sign_in', methods=['POST'])
def generate_token():

    email= request.json.get("email",None) #recibimos el email de login
    password= request.json.get("password",None) #recibimos el password de login

    user = User.query.filter_by(email=email).one_or_none() #Buscar al usuario para comprobar su identidad
    if not user or not user.check_password(password): #comparar que email y contraseña coincidan con las de la BASEdeDATOS para dejarlo acceder
        return jsonify("Wrong username or password"), 401
    
    acces_token = create_access_token(identity=user) #si dejamos entrar al usuario, se crea el token
    return jsonify({"access_token": acces_token, "user_id": user.id})

@api.route('/perfil_privado', methods=['GET'])
@jwt_required()
def get_current_user():
    return jsonify(current_user.serialize()), 200