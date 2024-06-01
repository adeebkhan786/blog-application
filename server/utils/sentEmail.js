import nodemailer from "nodemailer";









export const sendEmail = async (username, password, subject, data) => {
  // Create a transporter using your SMTP settings
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  });

  // Setup email data
  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: username,
    subject: subject,
    text: `<p>Hi ${data.name},</p>
    <p>Your New Password is - <strong>${password}</strong>.</p>
    <p>Thanks and Regards<br>Adeeb Khan</p>`
  };

  // Send email
  const sentEmail = await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error.message);
      return;
    } else {
      console.log("Email sent: ", info.response);
    }
    console.log('Email sent successfully!');
  });
  console.log("gjshjhdhdhhdshgsdshds", sentEmail);
  return sentEmail;
}