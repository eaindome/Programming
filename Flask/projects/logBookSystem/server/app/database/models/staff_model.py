from app.database import db
from app.database.models.user_model import User
from app.database.models.logs_model import Log
from datetime import datetime

class Staff(db.Model):
    __tablename__ = 'staff_pcs'
    
    staff_record_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    staff_num = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(255))
    district = db.Column(db.String(50))
    pc_brand = db.Column(db.String(30), nullable=False)
    pc_serial_num = db.Column(db.String(50), nullable=False)
    complaint = db.Column(db.Text, nullable=False)
    date_in = db.Column(db.Date, nullable=True)
    sign_in = db.Column(db.String(255))
    date_out = db.Column(db.Date, nullable=True)
    sign_out = db.Column(db.String(255))
    username = db.Column(db.String(255), db.ForeignKey('users.username'))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user = db.relationship('User', backref=db.backref('staff_pcs', lazy=True))

    # function to return a dictionary of the vendor data
    def to_dict(self):
        data = {
            c.name: getattr(self, c.name) for c in self.__table__.columns
        }
        if data['date_in']:
            data['date_in'] = data['date_in'].strftime('%d/%m/%Y')
        elif data['date_in'] == '':
            data['date_in'] = None
        if data['date_out']:
            data['date_out'] = data['date_out'].strftime('%d/%m/%Y')
        elif data['date_out'] == '':
            data['date_out'] = None
        data['sign_in'] = 'Yes' if data['sign_in'] else 'No'
        data['sign_out'] = 'Yes' if data['sign_out'] else 'No'
        return data
        
    # function to create a log
    def create_log(self, action):
        #log = Log(user_id=self.user_id, table_name='staff_pcs', action=action)
        log = Log(username=self.username, table_name='staff_pcs', action=action)
        db.session.add(log)
        db.session.commit()

    # function to save vendor data to the database
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