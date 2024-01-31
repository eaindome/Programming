from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.controllers.password_reset_controller import PasswordResetController

password_reset_bp = Blueprint('password_reset', __name__)
password_reset_controller = PasswordResetController()

@password_reset_bp.route('/create-password-reset', methods=['POST'])
@login_required
def create_password_reset():
    data = request.get_json()
    username = data['username']
    data['reset_by'] = username
    data.pop('username')
    password_reset = password_reset_controller.create_password_reset(data)
    return jsonify(password_reset)

@password_reset_bp.route('/get-password-reset-data/<reset_id>', methods=['GET'])
@login_required
def get_password_reset(reset_id):
    password_reset = password_reset_controller.get_password_reset(reset_id)
    if password_reset:
        return jsonify(password_reset)
    return jsonify({'message': 'Password Reset data not found'}), 404

@password_reset_bp.route('/get-all-password-reset-data', methods=['GET'])
@login_required
def get_all_password_reset():
    password_resets = password_reset_controller.get_all_password_reset()
    if password_resets:
        return jsonify(password_resets)
    return jsonify({'message': 'Password Reset data datas not found'}), 404

@password_reset_bp.route('/update-password-reset-data/<reset_id>', methods=['PUT'])
@login_required
def update_password_reset(reset_id):
    data = request.get_json()
    username = data['username']
    data['reset_by'] = username
    data.pop('username')
    password_reset = password_reset_controller.update_password_reset(reset_id, data)
    if password_reset:
        return jsonify(password_reset)
    return jsonify({'message': 'Password Reset data not found'}), 404

@password_reset_bp.route('/delete-password-reset-data/<reset_id>', methods=['DELETE'])
def delete_password_reset(reset_id):
    result = password_reset_controller.delete_password_reset(reset_id)
    if result:
        return jsonify({'message': 'Password Reset data deleted'})
    return jsonify({'message': 'Password Reset data not found'}), 404

@password_reset_bp.route('/search-password-reset-data', methods=['GET'])
@login_required
def search_password_reset():
    search_query = request.args.get('search', '')
    result = password_reset_controller.search_password_reset(search_query)
    return jsonify(result)


