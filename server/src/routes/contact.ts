import { Router } from 'express';
import { Resend } from 'resend';

const router = Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body;

    const toEmail = process.env.EMAIL_USER;
    if (!toEmail) {
        console.error('EMAIL_USER environment variable is not set.');
        return res.status(500).json({ message: 'Server configuration error' });
    }

    try {
        await resend.emails.send({
            from: 'noreply@bashbuddy.com',
            to: toEmail,
            subject: 'New Contact Form Submission',
            html: `<p>You have a new contact form submission from:</p>
                   <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Phone:</strong> ${phone}</p>
                   <p><strong>Message:</strong> ${message}</p>`
        });

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error sending email', error: error.message });
        } else {
            res.status(500).json({ message: 'Error sending email', error: 'An unknown error occurred' });
        }
    }
});

export default router;