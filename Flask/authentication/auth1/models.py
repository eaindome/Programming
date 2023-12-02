from datetime import datetime
from extensions import db
from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String(), primary_key=True, default=str(uuid4()))
    username = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False)
    password = db.Column(db.Text()) 
    
    def __repr__(self):
        return f"<User {self.username}>"
    
    def set_password(self, password):
        self.password = generate_password_hash(password=password)
    
    def check_password(self, password):
        return check_password_hash(pwhash=self.password, password=password)  # returns True or False
    
    @classmethod                      # class method
    def get_user_by_username(cls, username):    # function to get user by username
        return cls.query.filter_by(username=username).first()
    
    # function to save user to database
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    # function to delete user from database
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class TokenBlocklist(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    jti = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return f"<Token {self.jti}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    