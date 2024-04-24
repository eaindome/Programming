from app.database import db
from app.database.models.user_model import User
from app.database.models.forticlient_model import FortiClientVPN
from app.database.models.staff_model import Staff
from app.database.models.vendor_model import Vendor
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from flask import url_for, render_template, request
from werkzeug.security import generate_password_hash

mail = Mail()

s = URLSafeTimedSerializer('Thisisasecret!')

def send_link(email, table_name):
    token = s.dumps({'email': email, 'table_name': table_name}, salt='email-confirm')

    msg = Message('Confirm Email', sender='noreply@domain.com', recipients=[email])

    link = url_for('authenticate.confirm_email_route', token=token, _external=True)

    msg.body = 'Your link is {}'.format(link)

    mail.send(msg)

    return 'Email sent!'

def confirm_email(token):
    try:
        email = s.loads(token, salt='email-confirm', max_age=3600)
    except SignatureExpired:
        return '<h2>The token is expired!</h2>'
    return render_template('sign_in.html', email=email)

def sign_in(token):
    try:
        data = s.loads(token, salt='email-confirm', max_age=3600)
    except SignatureExpired:
        return '<h2>The token is expired!</h2>'

    email = data['email']
    table_name = data['table_name']

    if table_name == 'forticlient_vpn':
        record = FortiClientVPN.query.filter_by(email=email).order_by(FortiClientVPN.timestamp.desc()).first()
        if record:
            if record.sign is None:
                record.sign = generate_password_hash('Yes')
                db.session.commit()
                return '<h2>Signed in!</h2>'
            else:
                return '<h2>The user has already signed in!</h2>'
        else:
            return '<h2>Record not found!</h2>'
    elif table_name == 'staff_pcs':
        record = Staff.query.filter_by(email=email).order_by(Staff.date_in.desc(), Staff.date_out.desc()).first()
    elif table_name == 'vendor_pcs':
        record = Vendor.query.filter_by(email=email).order_by(Vendor.date_in.desc(), Vendor.date_out.desc()).first()
    else:
        return '<h2>Invalid table name!</h2>'

    if record:
        if record.sign_in is None:
            record.sign_in = generate_password_hash('Yes')
            db.session.commit()
            return '<h2>Signed in!</h2>'
        elif record.sign_out is None:
            record.sign_out = generate_password_hash('Yes')
            db.session.commit()
            return '<h2>Signed out!</h2>'
        else:
            return '<h2>The user has already signed out!</h2>'
    else:
        return '<h2>Record not found!</h2>'

"""
def sign_in():
    email = request.form['email']
    user = User.query.filter_by(email=email).first()

    if user:
        user.signed_in = generate_password_hash('Yes')
        db.session.commit()
        return '<h2>Signed in!</h2>'
    else:
        return '<h2>User not found!</h2>'
"""
