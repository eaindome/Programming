from flask import Blueprint, jsonify, request, session
from flask_login import current_user, login_required
from app.controllers.user_controller import UserController

user_bp = Blueprint('user', __name__)
user_controller = UserController()

# route to add a user
@user_bp.route('/add_user', methods=['POST'])
@login_required
def add_user():
    data = request.get_json()
    result = user_controller.add_user(
        username=data.get('username'),
        user_password=data.get('user_password'),
        user_role=data.get('user_role'),
        start_date=data.get('start_date'),
        end_date=data.get('end_date')
    )
    return jsonify(result)

# route to get all users
@user_bp.route('/get-all-users', methods=['GET'])
@login_required
def get_all_users():
    result = user_controller.get_all_users()
    return jsonify(result)

# route to get users by role (with optional year parameter)
@user_bp.route('/get-users-by-role/<string:role>', methods=['GET'])
@login_required
def get_users_by_role(role):
    year = request.args.get('year')
    result = user_controller.get_users_by_role(role, year)
    return jsonify(result)

# route to get interns by year
@user_bp.route('/get-interns-by-year/<int:year>', methods=['GET'])
@login_required
def get_interns_by_year(year):
    result = user_controller.get_interns_by_year(year)
    return jsonify(result)

# route to get workers by year
@user_bp.route('/get-workers-by-year/<int:year>', methods=['GET'])
@login_required
def get_workers_by_year(year):
    result = user_controller.get_workers_by_year(year)
    return jsonify(result)

# route to get service personnel by year
@user_bp.route('/get-service-personnel-by-year/<int:year>', methods=['GET'])
@login_required
def get_service_personnel_by_year(year):
    result = user_controller.get_service_personnel_by_year(year)
    return jsonify(result)

# route to get admins by year
@user_bp.route('/get-admins-by-year/<int:year>', methods=['GET'])
@login_required
def get_admins_by_year(year):
    result = user_controller.get_admins_by_year(year)
    return jsonify(result)

# route to update a user
@user_bp.route('/update_user/<string:username>', methods=['PUT'])
@login_required
def update_user(username):
    data = request.get_json()
    result = user_controller.update_user(
        username=username,
        user_password=data.get('user_password'),
        user_role=data.get('user_role'),
        start_date=data.get('start_date'),
        end_date=data.get('end_date')
    )
    return jsonify(result)

# route to search for a user
@user_bp.route('/search_user_by_name/<string:username>', methods=['GET'])
@login_required
def search_user_by_name(username):
    result = user_controller.search_user_by_name(username)
    if result:
        return jsonify(result), 200
    
    return jsonify({
        "message": "User not found"
    }), 404

# route to search for a user by role
@user_bp.route('/search_user_by_role/<string:role>', methods=['GET'])
@login_required
def search_user_by_role(role):
    result = user_controller.search_user_by_role(role)
    if result:
        return jsonify(result), 200
    
    return jsonify({
        "message": "User not found"
    }), 404

# route to get the information of a logged-in user
@user_bp.route('/get-logged-in-user', methods=['GET'])
@login_required
def get_logged_in_user():
    result = user_controller.get_logged_in_user()
    return jsonify(result)
#

# route to set a user's start date

# route to set a user's end date
