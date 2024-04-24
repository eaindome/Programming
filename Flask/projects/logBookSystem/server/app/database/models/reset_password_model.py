from app.database import db
from app.database.models.user_model import User
from app.database.models.logs_model import Log
from datetime import datetime

class PasswordReset(db.Model):
    __tablename__ = 'password_reset'
    
    reset_id = db.Column(db.Integer, primary_key=True)
    staff_name = db.Column(db.String(50), nullable=False)
    staff_username = db.Column(db.String(30), nullable=False)
    district = db.Column(db.String(255))
    date_reset = db.Column(db.Date, nullable=False)
    remarks = db.Column(db.Text)
    reset_by = db.Column(db.String(255), db.ForeignKey('users.username'))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    reset_by_user = db.relationship('User', backref=db.backref('password_reset', lazy=True))

    # function to return a dictionary of the forticlient data
    def to_dict(self):
        data = {
            c.name: getattr(self, c.name) for c in self.__table__.columns
        }
        if data['date_reset']:
            data['date_reset'] = data['date_reset'].strftime('%d/%m/%Y')
        return data
    
    # function to create a log
    def create_log(self, action):
        #log = Log(user_id=self.user_id, table_name='password_reset', action=action)
        log = Log(username=self.reset_by, table_name='password_reset', action=action)
        db.session.add(log)
        db.session.commit()

    # function to save password reset data to the database
    def save(self):
        db.session.add(self)
        self.create_log('Add')
        db.session.commit()
        
    # function to delete data from the database
    def delete(self):
        db.session.delete(self)
        db.session.commit()    

    # function to update data in the database    
    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)
        self.create_log('Update')
        db.session.commit()
