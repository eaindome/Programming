from flask import Blueprint, request, abort, jsonify
from flask_login import login_required
from app.controllers.vendor_controller import VendorController

vendor_bp = Blueprint('vendor', __name__) 
vendor_controller = VendorController() 

@vendor_bp.route('/add-vendor', methods=['POST'])
@login_required
def add_vendor():
    data = request.get_json()
    username = data['username']
    data['username'] = username
    if data is None:
        abort(400, description="Invalid data format. Expected a dictionary.")
    return jsonify(vendor_controller.add_vendor(data))

@vendor_bp.route('/get-vendor/<int:vendor_book_id>', methods=['GET'])
@login_required
def get_vendor(vendor_book_id):
    vendor = vendor_controller.get_vendor(vendor_book_id)
    if vendor:
        return jsonify(vendor)
    return jsonify({'message': 'Vendor data not found'}), 404

@vendor_bp.route('/all-vendor-data', methods=['GET'])
@login_required
def get_all_vendors():
    vendor = vendor_controller.get_all_vendors()
    if vendor:
        return jsonify(vendor)
    return jsonify({'message': 'Vendor data not found'}), 404

@vendor_bp.route('/update-vendor/<int:vendor_book_id>', methods=['PUT'])
@login_required
def update_vendor(vendor_book_id):
    data = request.get_json()
    username = data['username']
    data['username'] = username
    vendor = vendor_controller.update_vendor(vendor_book_id, data)
    if data is None:
        abort(400, description="Invalid data format. Expected a dictionary.")
    if vendor:
        return jsonify(vendor)
    return jsonify({'message': 'Vendor data not found'}), 404

@vendor_bp.route('/delete-vendor/<int:vendor_book_id>', methods=['DELETE'])
@login_required
def delete_vendor(vendor_book_id):
    result = vendor_controller.delete_vendor(vendor_book_id)
    if result:
        return jsonify({'message': 'Vendor data deleted'})
    return jsonify({'message': 'Vendor data not found'}), 404

@vendor_bp.route('/search-vendor-data', methods=['GET'])
@login_required
def search_vendor():
    search_query = request.args.get('search', '')
    result = vendor_controller.search_vendor(search_query)
    return jsonify(result)
