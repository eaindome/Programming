const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '318203718345-mqoi3p02kl7nevi6m08gnimtm1gvfmak.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04gi-VL7z0lUuCgYIARAAGAQSNwF-L9IrQNdCdZvuhu79JAhlaVruTS48UrGW8DXa1mzGjl-Fw58IsLjx5DR3JEBKY8sjLMpdWPs';

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
            from: 'ekow <ekow.a.indome@gmail.com',
            to: 'eaindome@gmail.com',
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

