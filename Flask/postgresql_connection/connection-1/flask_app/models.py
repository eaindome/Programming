from datetime import datetime
from flask_app import db

# create a class temperature, which is going to be a table in the database
class Temperature(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    room = db.Column(db.String)
    temperature = db.Column(db.Float)
    date = db.Column(db.DateTime, default = datetime.utcnow)
    
    def __repr__(self):
        return f'<Temperature {self.id}>'


