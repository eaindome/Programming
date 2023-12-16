import os

class Config:
    SECRET_KEY = ""
    SQLALCHEMY_DATABASE_URI = ""
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Flask-Mail SMTP server settings
    MAIL_SERVER = ""
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = ""
    MAIL_PASSWORD = ""
    MAIL_DEFAULT_SENDER = ""