import nodemailer from 'nodemailer'
// Send OTP via email
const sendEmailVerificationOTP = async (email: string, otp: string) => {
  // Create SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email message
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification OTP',
    text: `Your OTP for email verification is: ${otp}`,
  };

  // Send email
  return await transporter.sendMail(mailOptions);
};
export {sendEmailVerificationOTP};
