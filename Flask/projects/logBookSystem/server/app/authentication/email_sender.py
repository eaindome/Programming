from flask_mail import Message
from flask import current_app
from .token_generator import generate_token

def send_signin_email(to_email):
    token = generate_token(to_email)
    signin_link = f"{current_app.config['APP_BASE_URL']}/signin/{token}"
    
    subject = "Sign In Request"
    body = f"Click the link below to sign in:\n{signin_link}"
    
    send_email(to_email, subject, body)

def send_email(to_email, subject, body):
    msg = Message(subject, recipients=[to_email], body=body)
    current_app.mail.send(msg)
