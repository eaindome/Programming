import os
from flask import Blueprint, request, send_from_directory
from flask_login import login_required
from .auth_control import send_link, confirm_email, sign_in

authenticate = Blueprint('authenticate', __name__)

# route to send a link to the user's email
@authenticate.route('/send_link', methods=['POST'])
@login_required
def send_link_route():
    email = request.form['email']
    table_name = request.form['table_name']
    return send_link(email, table_name)

# route to confirm the user's email
@authenticate.route('/confirm_email/<token>', methods=['GET', 'POST'])
def confirm_email_route(token):
    if request.method == 'POST':
        return sign_in(token)
    else:
        return confirm_email(token)

# route to sign in the user
@authenticate.route('/sign_in', methods=['POST'])
def sign_in_route():
    token = request.form['token']
    return sign_in(token)

# route to serve the css file
@authenticate.route('/auth/css/<path:filename>')
def auth_css(filename):
    return send_from_directory(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'static'), filename)