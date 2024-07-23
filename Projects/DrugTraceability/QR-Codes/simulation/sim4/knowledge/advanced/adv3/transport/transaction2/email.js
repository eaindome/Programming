const nodemailer = require('nodemailer');

require('dotenv').config();

// const { transporter } = require('../../auth/password/controller');

const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use any email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendNotification = async (to_email, to, fromUser, goodsId, private_key, username, data, user, transactionId) => {
    const verificationLink = `http://localhost:8000/transaction/verify-transaction/${fromUser}/${to}/${goodsId}/${private_key}/${username}/${data}/${user}/${transactionId}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to_email,
        subject: 'Verify Transaction',
        html: `
            <p>Verify transaction from ${fromUser}</p>
            <p>Click <a href="${verificationLink}">here</a> to verify or cancel the transaction.</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${user} for verification.`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = {
    sendNotification,
};
