from flask import render_template, redirect, url_for, request, flash 
from app import app, db
from app.models import SupportTicket
from app.routes.main import generate_token, validate_token
from flask_mail import Message
from main import send_signin_email

@app.route('/sign-in/<int:ticket_id>', methods=['GET', 'POST'])
def sign_in(ticket_id):
    ticket = SupportTicket.query.get(ticket_id)
    if request.method == 'POST':
        token = generate_token(ticket.company_name)
        ticket.sign_in = token
        
        db.session.commit()
        
        send_signin_email(ticket.company_name, ticket.email, token)
        
        flash('Sign-in link sent to your email')
        return redirect(url_for('dashboard'))
    return render_template('sign-in.html', ticket=ticket)
