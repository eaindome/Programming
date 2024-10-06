import sqlite3
import datetime
import logging
import smtplib
import androidhelper
import schedule
import time

# Initialize the Android helper
droid = androidhelper.Android()

# Configure logging
logging.basicConfig(filename='expense_tracker.log', level=logging.INFO,
                    format='%(asctime)s:%(levelname)s:%(message)s')

def record_transaction(amount, description):
    try:
        conn = sqlite3.connect('expenses.db')
        c = conn.cursor()
        c.execute('CREATE TABLE IF NOT EXISTS expenses (date TEXT, amount REAL, description TEXT)')
        c.execute('INSERT INTO expenses (date, amount, description) VALUES (?, ?, ?)',
                  (datetime.datetime.now().strftime('%Y-%m-%d'), amount, description))
        conn.commit()
        logging.info(f"Recorded transaction: {description} of amount GHS {amount}")
    except Exception as e:
        logging.error(f"Error recording transaction: {e}")
    finally:
        conn.close()

def read_sms_and_record():
    try:
        sms = droid.smsGetMessages('inbox')  # Fetch SMS from inbox
        for message in sms.result:
            sender = message[1]  # Sender's number
            body = message[2]    # Message body

            if "MobileMoney" in sender:
                try:
                    if "Your payment of GHS" in body and "to MTN AIRTIME" in body:
                        # Airtime Purchase
                        amount = float(body.split('GHS ')[1].split(' ')[0])
                        description = "Airtime purchase"
                        record_transaction(amount, description)

                    elif "Payment made for GHS" in body and "to" in body:
                        # Sending Money
                        amount = float(body.split('GHS ')[1].split(' ')[0])
                        description = body.split('to ')[1].split('.')[0]  # Extract recipient name
                        record_transaction(amount, description)

                    elif "Payment received for GHS" in body:
                        # Receiving Money
                        amount = float(body.split('GHS ')[1].split(' ')[0])
                        description = body.split('from ')[1].split('.')[0]  # Extract sender name
                        record_transaction(amount, description)

                except (ValueError, IndexError) as parse_error:
                    logging.warning(f"Could not parse the transaction from message: {body}. Error: {parse_error}")
    
    except Exception as e:
        logging.error(f"Error reading SMS: {e}")

def send_email_summary():
    try:
        conn = sqlite3.connect('expenses.db')
        c = conn.cursor()
        today = datetime.datetime.now().strftime('%Y-%m-%d')
        c.execute('SELECT SUM(amount) FROM expenses WHERE date = ?', (today,))
        total = c.fetchone()[0] or 0
        c.execute('SELECT description FROM expenses WHERE date = ?', (today,))
        transactions = c.fetchall()
        
        message = f"Daily Summary for {today}\n\nTotal Expenses: GHS {total}\n\nTransactions:\n"
        for t in transactions:
            message += f"- {t[0]}\n"
        
        # Send email
        try:
            with smtplib.SMTP('smtp.gmail.com', 587) as server:
                server.starttls()
                server.login('your_email@gmail.com', 'your_password')  # Replace with your email and password
                server.sendmail('your_email@gmail.com', 'your_email@gmail.com', message)
                logging.info(f"Email summary sent for date: {today}")
        except Exception as email_error:
            logging.error(f"Error sending email: {email_error}")
    
    except Exception as e:
        logging.error(f"Error generating email summary: {e}")
    finally:
        conn.close()

# Schedule SMS reading and email sending
schedule.every(1).minutes.do(read_sms_and_record)
schedule.every().day.at("23:59").do(send_email_summary)

# Main loop
if __name__ == "__main__":
    while True:
        try:
            schedule.run_pending()
            time.sleep(1)
        except Exception as e:
            logging.error(f"Error in main loop: {e}")


