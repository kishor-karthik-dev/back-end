const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 1000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Set up nodemailer transporter (use your email credentials here)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'salemdentalcenter.in@gmail.com', // Your email address
    pass: 'ygkp zter gmbu aaog'     // Replace with the app password generated
  },
  tls: {
    rejectUnauthorized: false // Disable SSL verification for self-signed certificates
  }
});

// Endpoint to send email
app.post('/send-email', (req, res) => {
  const { name, phone, email, treatment, bookingDate, bookingTime, message } = req.body;

  // Check if bookingTime is undefined and set a default value if necessary
  const finalBookingTime = bookingTime || 'Not Provided';

  // Email content
  const mailOptions = {
    from: 'salemdentalcenter.in@gmail.com', // Your email address
    to: 'salemdentalcenter.in@gmail.com',   // Email address where you want to receive the appointment details
    subject: 'New Appointment Booking',
    text: `You have a new appointment booking request:

    Name: ${name}
    Phone: ${phone}
    Email: ${email}
    Treatment: ${treatment}
    Booking Date: ${bookingDate}
    Booking Time: ${finalBookingTime}
    Message: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error Sending Email:', error);  // Log error if sending fails
      return res.status(500).json({ message: 'Error sending email' });  // Send failure response
    } else {
      console.log('Email sent:', info.response);  // Log successful email send
      return res.status(200).json({ message: 'Email sent successfully!' });  // Send success responsei
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
