import nodemailer from 'nodemailer'
import {generateICSFileContent} from './calender.invite.service'
// Send OTP via email
const sendSessionNotifierEmail = async (email: string,sessionDetails:any) => {
  // Create SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
 // generate ics file
   const generatedIcsContent:string = generateICSFileContent(sessionDetails);
  // Email message
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Session has been booked',
    text: `Your session with ${sessionDetails.speaker} has been booked on ${sessionDetails.startTime}`,
    attachments:[
       {
        filename: 'session.ics',
        content: generatedIcsContent,
       }
    ]
  };
  // Send email
  await transporter.sendMail(mailOptions);
};
export {sendSessionNotifierEmail};
