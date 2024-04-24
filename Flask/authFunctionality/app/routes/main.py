from flask import render_template, redirect, url_for, request
from flask_mail import Message
from app import app, db, mail
from app.models import SupportTicket
from datetime import datetime

@app.route('/')
def dashboard():
    tickets = SupportTicket.query.all()
    return render_template('dashboard.html', tickets=tickets)

@app.route('/add', methods=['GET', 'POST'])
def add_ticket():
    if request.method == 'POST':
        company_name = request.form['company_name']
        phone_number = request.form['phone_number']
        district = request.form['district']
        brand_of_pc = request.form['brand_of_pc']
        serial_number_of_pc = request.form['serial_number_of_pc']
        complaint = request.form['complaint']
        
        # for simplicity, assuming date_in is filled during add (not after sign-in)
        date_in = datetime.utcnow()
        
        ticket = SupportTicket(
            company_name=company_name, 
            phone_number=phone_number, 
            district=district, 
            brand_of_pc=brand_of_pc, 
            serial_number_of_pc=serial_number_of_pc, 
            complaint=complaint, 
            date_in=date_in
        )
        
        db.session.add(ticket)
        db.session.commit()
        
        # Send email with sign-in link
        send_signin_email(company_name, ticket.id)
        
        # return redirect(url_for('dashboard'))
    return render_template('add-ticket.html')

def send_signin_email(company_name, ticket_id):
    # Create the email message
    msg = Message('Sign-in Link', recipients=[company_name])
    signin_link = url_for('signin', ticket_id=ticket_id, _external=True)
    msg.body = f"Click the following link to sign in: {signin_link}"
    
    # Send the email
    mail.send(msg)
        
        