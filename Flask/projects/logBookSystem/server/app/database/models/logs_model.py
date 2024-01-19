from datetime import datetime
from app.database import db
from app.database.models.user_model import User 

class Log(db.Model):
    __tablename__ = 'logs'

    log_id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    #user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    username = db.Column(db.String(255), db.ForeignKey('users.username'))
    table_name = db.Column(db.String(255))
    action = db.Column(db.String(255))

    user = db.relationship('User', backref=db.backref('logs', lazy=True))
    
    def to_dict(self):
        data = {
            c.name: getattr(self, c.name) for c in self.__table__.columns
        }
        return data