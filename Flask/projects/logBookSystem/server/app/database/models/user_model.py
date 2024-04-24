from app.database import db
from flask_login import UserMixin
from sqlalchemy import CheckConstraint
from werkzeug.security import generate_password_hash

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    user_role = db.Column(db.String(20), nullable=False)
    user_password = db.Column(db.String(255), nullable=False)
    start_date = db.Column(db.Date, nullable=True)
    end_date = db.Column(db.Date, nullable=True)
    
    __table_args__ = (
        CheckConstraint(user_role.in_(['Admin', 'Worker', 'Intern', 'Service Personnel'])),
    )
    
    # function to check if the user is active
    @property
    def is_active(self):
        return True
    
    # function to check if the user is authenticated
    @property
    def is_authenticated(self):
        return True
    
    # function to check if the user is anonymous
    @property
    def is_anonymous(self):
        return False
    
    # function to check if the user is an admin
    def is_admin(self):
        return self.user_role == 'Admin'
    
    # function to check if the user is a worker
    def is_worker(self):
        return self.user_role == 'Worker'
    
    # function to check if the user is an intern
    def is_intern(self):
        return self.user_role == 'Intern'
    
    # function to check if the user is a service personnel
    def is_service_personnel(self):
        return self.user_role == 'Service Personnel'
    
    # function to get the user id
    def get_id(self):
        return self.user_id
    
    # function to get the username
    def get_username(self):
        return self.username
        
    
    # constructor to set default values for start date and end date
    def __init__(self, username, user_password, user_role, start_date=None, end_date=None):
        self.username = username
        self.user_password = user_password
        self.user_role = user_role
        self.start_date = start_date
        self.end_date = end_date

    # function to save a user to the database
    def save(self):
        db.session.add(self)
        db.session.commit() 

    # function to delete a user from the database
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    


