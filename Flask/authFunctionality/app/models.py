from app import db

class SupportTicket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(255))
    phone_number = db.Column(db.String(20))
    district = db.Column(db.String(100))
    brand_of_pc = db.Column(db.String(100))
    serial_number_of_pc = db.Column(db.String(100))
    complaint = db.Column(db.Text)
    date_in = db.Column(db.DateTime)
    sign_in = db.Column(db.String(255))  # Token will be stored here after sign-in
    date_out = db.Column(db.DateTime)
    sign_out = db.Column(db.String(255))  # Token will be stored here after sign-out