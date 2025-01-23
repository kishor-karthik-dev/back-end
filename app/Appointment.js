const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS to allow cross-origin requests from frontend
app.use(cors());

// Create reusable transporter object using SMTP transport (Gmail in this case)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'salemdentalcenter.in@gmail.com',  // Your email address
        pass: 'ygkp zter gmbu aaog'    // Your email password or app-specific password
    },
    tls: {
        rejectUnauthorized: false  // Disable certificate validation (only for development)
    }
});

// Endpoint to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, phone, email, treatment, bookingDate, bookingTime, message } = req.body;

    // Log the received data for debugging purposes
    console.log("Received Data:", req.body);

    // Create email message content
    const mailOptions = {
        from: 'salemdentalcenter.in@gmail.com',  // Your email address (sender)
        to: 'salemdentalcenter.in@gmail.com',    // Recipient's email address
        subject: 'New Appointment Booking Request',
        html: `
            <h3>New Appointment Request</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Treatment:</strong> ${treatment}</p>
            <p><strong>Booking Date:</strong> ${bookingDate}</p>
            <p><strong>Booking Time:</strong> ${bookingTime}</p>
            <p><strong>Message:</strong> ${message}</p>
        `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Failed to send email.' });
        }
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'Form submitted successfully!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});