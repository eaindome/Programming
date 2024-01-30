from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.controllers.forticlient_controller import FortiClientController

forticlient_bp = Blueprint('forticlient', __name__)
forticlient_controller = FortiClientController()

@forticlient_bp.route('/create-forticlient', methods=['POST'])
@login_required
def create_forticlient():
    data = request.get_json()
    #data['username'] = current_user.username
    username = data['username']
    data['username'] = username
    forticlient = forticlient_controller.create_forticlient(data)
    return jsonify(forticlient)

@forticlient_bp.route('/get-forticlient-data/<vpn_id>', methods=['GET'])
@login_required
def get_forticlient(vpn_id):
    forticlient = forticlient_controller.get_forticlient(vpn_id)
    if forticlient:
        return jsonify(forticlient)
    return jsonify({'message': 'FortiClient not found'}), 404

@forticlient_bp.route('/get-all-forticlient-data', methods=['GET'])
@login_required
def get_all_forticlient():
    forticlients = forticlient_controller.get_all_forticlient()
    if forticlients:
        return jsonify(forticlients)
    return jsonify({'message': 'FortiClient datas not found'}), 404

@forticlient_bp.route('/update-forticlient-data/<vpn_id>', methods=['PUT'])
@login_required
def update_forticlient(vpn_id):
    data = request.get_json()
    username = data['username']
    data['username'] = username
    forticlient = forticlient_controller.update_forticlient(vpn_id, data)
    if forticlient:
        return jsonify(forticlient)
    return jsonify({'message': 'FortiClient not found'}), 404

@forticlient_bp.route('/delete-forticlient-data/<vpn_id>', methods=['DELETE'])
def delete_forticlient(vpn_id):
    result = forticlient_controller.delete_forticlient(vpn_id)
    if result:
        return jsonify({'message': 'FortiClient deleted'})
    return jsonify({'message': 'FortiClient not found'}), 404

@forticlient_bp.route('/search-forticlient-data', methods=['GET'])
@login_required
def search_forticlient():
    search_query = request.args.get('search', '')
    result = forticlient_controller.search_forticlient(search_query)
    return jsonify(result)

