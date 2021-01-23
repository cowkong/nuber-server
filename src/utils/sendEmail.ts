import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY || "",
    domain: "sandbox6efdb95f3ae849dea30b6e8f04822623.mailgun.org"
})

const sendEmail = (subject: string, html: string) => {
    const emailData = { 
        from: "a01047079420@gmail.com",
        to: "a01047079420@gmail.com",
        subject,
        html
    }
    return mailGunClient.messages().send(emailData);
}

export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello! ${fullName}, pealse verify your email`;
    const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}"/>here</a>`;
    return sendEmail(emailSubject, emailBody);
}