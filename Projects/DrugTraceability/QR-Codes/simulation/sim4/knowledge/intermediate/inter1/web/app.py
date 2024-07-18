import sys
import os

# Add the project root directory to the Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_dir, '..'))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

from flask import Flask, jsonify
from database.queries import get_pack_by_id, get_box_by_id, get_product_by_id
from database.company import get_company_info

app = Flask(__name__)

@app.route('/pack/<int:pack_id>', methods=['GET'])
def pack_details(pack_id):
    pack = get_pack_by_id(pack_id)
    company_info = get_company_info()
    if pack:
        response = {
            'company': company_info,
            'pack': pack
        }
        return jsonify(response)
    return jsonify({'error': 'Pack not found'}), 404

@app.route('/box/<int:box_id>', methods=['GET'])
def box_details(box_id):
    box = get_box_by_id(box_id)
    company_info = get_company_info()
    if box:
        response = {
            'company': company_info,
            'box': box
        }
        return jsonify(response)
    return jsonify({'error': 'Box not found'}), 404

@app.route('/product/<int:product_id>', methods=['GET'])
def product_details(product_id):
    product = get_product_by_id(product_id)
    company_info = get_company_info()
    if product:
        response = {
            'company': company_info,
            'product': product
        }
        return jsonify(response)
    return jsonify({'error': 'Product not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)

