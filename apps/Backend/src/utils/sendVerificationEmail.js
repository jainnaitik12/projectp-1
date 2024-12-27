import nodemailer from 'nodemailer';

export default async function sendVerificationEmail(email, token) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: '"YourAppName" <no-reply@yourapp.com>',
        to: email,
        subject: 'Email Verification',
        html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email. This link is valid for 24 hours.</p>`
    };

    await transporter.sendMail(mailOptions);
}
