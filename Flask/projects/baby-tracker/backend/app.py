from datetime import datetime
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Eai%402460@localhost/baby_tracker'  # the database connection
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)    # <--- SQLAlchemy   

class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Event: {self.description}>'

    def __init__(self, description):
        self.description = description

# This is a helper function that will convert our events to JSON
def format_event(event):
    return {
        "description": event.description,
        "id": event.id,
        "created_at": event.created_at
    }

# 
@app.route('/')
def hello():
    return "Hey!"

# Route to create an event
@app.route('/events', methods=['POST'])   # <--- Note that we're now accepting POST requests
def create_event():
    description = request.json['description']
    event = Event(description)       # <--- Create a new event
    db.session.add(event)
    db.session.commit()
    
    return format_event(event=event)   # <--- Return the newly created event
    
# Route to get all events
@app.route('/events', methods=['GET'])   # <--- Note that we're now accepting GET requests
def get_events():
    events = Event.query.order_by(Event.id.asc()).all()  # <--- Query for all events
    event_list = []
    for event in events:
        event_list.append(format_event(event))
    
    return {"events": event_list}

# Route to get a specific event
@app.route('/events/<id>', methods=['GET'])   # <--- Note that we're now accepting an id
def get_event(id):
    event = Event.query.filter_by(id=id).one()  # <--- Query for the event, can use .first() instead of .one()
    return {'event': format_event(event)}

# Route to update an event
@app.route('/events/<id>', methods=['PUT'])   # <--- Note that we're now accepting an id and a PUT request  
def update_event(id):
    event = Event.query.filter_by(id=id)
    description = request.json['description']
    event.update(dict(description=description, created_at = datetime.utcnow()))  # <--- Update the event
    db.session.commit()
    
    return {'event': format_event(event.one())}  # <--- Return the updated event

# Route to delete an event
@app.route('/events/<id>', methods=['DELETE'])   # <--- Note that we're now deleting an event
def delete_event(id):
    event = Event.query.filter_by(id=id).one() # <--- Query for the event
    db.session.delete(event)                   # <--- Delete the event
    db.session.commit()
    
    return f"Event (id: {id}) successfully deleted"  # <--- Return a message

if __name__ == "__main__":
    app.run(debug=True)


