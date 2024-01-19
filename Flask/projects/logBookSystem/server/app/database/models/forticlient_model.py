from app.database import db
from app.database.models.user_model import User
from app.database.models.logs_model import Log
from datetime import datetime
from sqlalchemy import CheckConstraint

class FortiClientVPN(db.Model):
    __tablename__ = 'forticlient_vpn'
    
    vpn_id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(255), nullable=False)
    owners_name = db.Column(db.String(30), nullable=False)
    initial_phone = db.Column(db.String(255), nullable=False)
    current_phone = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    new_phone = db.Column(db.String(5), nullable=False)
    date_requested = db.Column(db.Date, nullable=False)
    sign = db.Column(db.String(255))
    username = db.Column(db.String(255), db.ForeignKey('users.username'))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user = db.relationship('User', backref=db.backref('forticlient_vpn', lazy=True))
    
    __table_args__ = (
        CheckConstraint(new_phone.in_(['Yes', 'No'])),
    )

    # function to return a dictionary of the forticlient data
    def to_dict(self):
        data = {
            c.name: getattr(self, c.name) for c in self.__table__.columns
        }
        if data['date_requested']:
            data['date_requested'] = data['date_requested'].strftime('%d/%m/%Y')
        data['sign'] = 'Yes' if data['sign'] else 'No'
        return data
    
    # function to create a log
    def create_log(self, action):
        #log = Log(user_id=self.user_id, table_name='forticlient_vpn', action=action)
        log = Log(username=self.username, table_name='forticlient_vpn', action=action)
        db.session.add(log)
        db.session.commit()

    # function to save forticlient data to the database
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