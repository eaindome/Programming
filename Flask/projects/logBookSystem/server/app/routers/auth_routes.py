from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.controllers.auth_controller import AuthController

auth_bp = Blueprint('auth', __name__)
auth_controller = AuthController()

# Route to login a user
@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()       # get the data from the request body
        result = auth_controller.login(data['username'], data['password'])
        return jsonify(result)
    except (KeyError, TypeError, ValueError):
        return jsonify({
            "message": 'Request must include username and password fields.'
        }), 400

# Route to logout a user
@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    result = auth_controller.logout()
    return jsonify(result)

# Route to register a new user
@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        result = auth_controller.register(data['username'], data['password'], data['role'])
        return jsonify(result)
    except (KeyError, TypeError, ValueError):
        return jsonify({
            "message": 'Request must include username, password and role fields.'
        }), 400
    except Exception as e:
        print(e)
        return jsonify({
            "message": 'An error occurred. Please try again.'
        }), 500


# Route to reset a user's password
@auth_bp.route('/reset_password', methods=['POST'])
def reset_password():
    data = request.get_json()
    if data is None or 'username' not in data or 'password' not in data:
        return jsonify({
            "message": 'Request must include username and password fields.'
        }), 400
    result = auth_controller.reset_password(data['username'], data['password'])
    return jsonify(result)

# This route is for testing purposes only, to get the current user's username and role
@auth_bp.route('/user', methods=['GET'])
@login_required
def user():
    return jsonify({
        "username": current_user.username,
        "role": current_user.user_role
    })
