from flask import Blueprint, request, abort, jsonify
from flask_login import login_required
from app.controllers.staff_controller import StaffController

staff_bp = Blueprint('staff', __name__)
staff_controller = StaffController()

@staff_bp.route('/add-staff', methods=['POST'])
@login_required
def add_staff():
    data = request.get_json()
    username = data['username']
    data['username'] = username
    if data is None:
        abort(400, description="Invalid data format. Expected a dictionary.")
    return jsonify(staff_controller.add_staff(data))

@staff_bp.route('/get-staff/<int:staff_record_id>', methods=['GET'])
@login_required
def get_staff(staff_record_id):
    staff = staff_controller.get_staff(staff_record_id)
    if staff:
        return jsonify(staff)
    return jsonify({'message': 'Staff data not found'}), 404

@staff_bp.route('/all-staff-data', methods=['GET'])
@login_required
def get_all_staffs():
    staff = staff_controller.get_all_staffs()
    if staff:
        return jsonify(staff)
    return jsonify({'message': 'Staff data not found'}), 404

@staff_bp.route('/update-staff/<int:staff_record_id>', methods=['PUT'])
@login_required
def update_staff(staff_record_id):
    data = request.get_json()
    username = data['username']
    data['username'] = username
    staff = staff_controller.update_staff(staff_record_id, data)
    if data is None:
        abort(400, description="Invalid data format. Expected a dictionary.")
    if staff:
        return jsonify(staff)
    return jsonify({'message': 'Staff data not found'}), 404

@staff_bp.route('/delete-staff/<int:staff_record_id>', methods=['DELETE'])
@login_required
def delete_staff(staff_record_id):
    result = staff_controller.delete_staff(staff_record_id)
    if result:
        return jsonify({'message': 'Staff data deleted'})
    return jsonify({'message': 'Staff data not found'}), 404

@staff_bp.route('/search-staff-data', methods=['GET'])
@login_required
def search_staff():
    search_query = request.args.get('search', '')
    result = staff_controller.search_staff(search_query)
    return jsonify(result)



