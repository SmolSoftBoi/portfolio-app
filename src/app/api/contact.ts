import { NextApiRequest, NextApiResponse } from 'next';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import axios from 'axios';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

async function sendEmail(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  const msg: MailDataRequired = {
    to: process.env.TO_EMAIL_ADDRESS || '',
    from: process.env.FROM_EMAIL_ADDRESS || '',
    replyTo: email,
    subject: 'New contact form submission',
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };
  try {
    await sgMail.send(msg);
    console.log(
      `Received contact form data: ${JSON.stringify({
        name,
        email,
        subject,
        message,
      })}`
    );
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
}

async function sendNotification(title: string, message: string) {
  const url = process.env.NOTIFICATION_URL || ''; // Use environment variable for notification URL
  if (!url) {
    throw new Error('Notification URL not set');
  }
  const accessToken = process.env.NOTIFICATION_ACCESS_TOKEN || ''; // Use environment variable for access token
  if (!accessToken) {
    throw new Error('Access token not set');
  }
  const toEmailAddress = process.env.TO_EMAIL_ADDRESS || ''; // Use environment variable for to email address
  if (!toEmailAddress) {
    throw new Error('To email address not set');
  }
  try {
    await axios.post(`${url}/kristian-alerts`, message, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Set authorization header with access token
        Title: title, // Add title header
        Email: toEmailAddress, // Add email header
      },
    });
    console.log(`Sent notification: ${title} - ${message}`);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send notification');
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Destructure form data from the request body
    const { name, email, subject, message } = req.body;

    // Perform server-side validation (optional)
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Send email and notification
    try {
      await sendEmail(name, email, subject, message);
      await sendNotification('New contact form submission', `From ${name}`);
      res.status(200).json({ message: 'Form submitted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    // Handle methods other than POST
    res.status(405).end(); // Method Not Allowed
  }
}
