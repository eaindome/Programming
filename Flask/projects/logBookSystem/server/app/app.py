from dotenv import load_dotenv
from flask import Flask
from flask_login import LoginManager
from flask_mail import Mail
from flask_cors import CORS
from .config import Config
from .database import db
from app.routers import (
    auth_bp, user_bp, vendor_bp, staff_bp, 
    password_reset_bp, forticlient_bp, log_bp
)
from app.database.models import *
from app.authentication import authenticate

# load environment variables from .env file
load_dotenv()

# initialize the flask app
app = Flask(__name__)
app.config.from_object(Config)  # load config from config.py
app.secret_key = 'prototype_secret_key'
mail = Mail(app)
#CORS(app, resources={r"/auth/*": {"origins": "http://127.0.0.1:5500"}})
CORS(app, origins=['http://127.0.0.1:5500'], supports_credentials=True)

# initialize flask login
login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'

# initialize the database
db.init_app(app)
# mail.init_app(app)

# create all the tables in the database
with app.app_context():
    db.create_all()     # create all the tables in the database

# register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(authenticate, url_prefix='/authenticate')
app.register_blueprint(user_bp, url_prefix='/users')
app.register_blueprint(vendor_bp, url_prefix='/vendor')
app.register_blueprint(staff_bp, url_prefix='/staff')
app.register_blueprint(password_reset_bp, url_prefix='/password-reset')
app.register_blueprint(forticlient_bp, url_prefix='/forticlient-vpn')
app.register_blueprint(log_bp, url_prefix='/log')

# load the user from the database
@login_manager.user_loader
def load_user(user_id):
    from app.database.models.user_model import User
    return User.query.get(int(user_id))