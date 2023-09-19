const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
const REDIRECT_URL = 'redirect-url';
const REFRESH_TOKEN = 'refresh-token';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'ekow.a.indome@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: 'ekow <your-email',
            to: 'recepient-email',
            subject: "Hello from gmail using API",
            text: "Hello from gmail email useing API",
            html: '<h1>Hello from gmail email using API</h1>'
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error
    }
};

sendMail()
    .then(result => console.log('Email is sent...', result))
    .catch(error => console.log(error.message));

// re-committing
