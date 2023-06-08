# Email Sender

## Steps
# go over to our gmail account and setup 2 factor authentication
# generate app password
# create a function to send the mail

import ssl
import smtplib
from email.message import EmailMessage

email_sender = '*******@*****.***'     # your email
email_password = 'YOUR_PASSWORD'       # your app generated password

email_receiver = '*******@*****.***'   # receiver's email

subject = "Don't forget to subscribe"   # email subject
body = '''
When you watch a video, please hit subscribe.       
'''                                     # email content

em = EmailMessage()
em['From'] = email_sender
em['To'] = email_receiver
em['subject'] = subject
em.set_content(body)

context = ssl.create_default_context()

with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
    smtp.login(email_sender, email_password)
    smtp.sendmail(email_sender, email_receiver, em.as_string())





