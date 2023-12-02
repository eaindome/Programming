from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, current_user, get_jwt, get_jwt_identity
from models import User, TokenBlocklist

auth_bp = Blueprint('auth', __name__)


# Route to register user
@auth_bp.post('/register')
def register_user():
    data = request.get_json()
    user = User.get_user_by_username(username=data['username'])
    
    # check if user exist
    if user is not None:
        return jsonify({"error": "user already exist"}), 403
    
    # create a user
    new_user = User(username=data['username'], email=data['email'])
    new_user.set_password(password=data['password'])    # set user password
    
    # save user
    new_user.save()
    
    return jsonify({'message': 'user created'}), 201

# Route to login user
@auth_bp.post('/login')
def login_user():
    data = request.get_json()
    user = User.get_user_by_username(username=data['username'])
    
    # c
    if user and (user.check_password(password=data['password'])):
        access_token = create_access_token(identity=user.username)
        refresh_token = create_refresh_token(identity=user.username)
        
        return jsonify(
            {
                "message": "Logged In",
                "tokens": {
                    "access token": access_token,
                    "refresh token": refresh_token
                }
            }
        ), 200
        
    return jsonify({"error": "invalid username or password"}), 400

# Route to know who is logged in
@auth_bp.get('/whoami')
@jwt_required()
def whoami():
    
    return jsonify({
        "message": "you are logged in",
        "user_details": {
            "username": current_user.username,
            "email": current_user.email
        },
    })
    
    """    claims = get_jwt()
        #user = get_jwt_identity()
        #return jsonify({"user": user}), 200 
        return jsonify({
            "message": "you are logged in",
            "claims": claims
        })"""

# Route to refresh access token
@auth_bp.get('/refresh')
@jwt_required(refresh=True)
def refresh_access():
    identity = get_jwt_identity()
    new_access_token = create_access_token(identity=identity)
    
    return jsonify({
        "access token": new_access_token,
    })

# Route to logout user
@auth_bp.get('/logout')
@jwt_required(verify_type=False)
def logout_user():
    jti = get_jwt()['jti']
    token_type = get_jwt()['type']
    token = TokenBlocklist(jti=jti)
    token.save()
    
    return jsonify({
        "message": f"{token_type} token revoked successfully"
    }), 200

