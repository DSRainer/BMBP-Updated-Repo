import { Router } from 'express';
import { pool } from '../index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret'; // Use environment variables in production

// Register a new user
router.post('/register', async (req, res) => {
    const { email, password, fullName, phoneNumber } = req.body;

    if (!email || !password || !fullName || !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            'INSERT INTO Users (email, password_hash, full_name, phone_number) VALUES ($1, $2, $3, $4) RETURNING user_id, email, full_name',
            [email, hashedPassword, fullName, phoneNumber]
        );

        const token = jwt.sign({ userId: newUser.rows[0].user_id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: newUser.rows[0] });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error registering new user', error: error.message });
        } else {
            res.status(500).json({ message: 'Error registering new user', error: 'An unknown error occurred' });
        }
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const result = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { user_id: user.user_id, email: user.email, full_name: user.full_name } });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error logging in', error: error.message });
        } else {
            res.status(500).json({ message: 'Error logging in', error: 'An unknown error occurred' });
        }
    }
});

export default router;
