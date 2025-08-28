import { Router } from 'express';
import { pool } from '../index';

const router = Router();

// Get all active packages
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Packages WHERE is_active = true ORDER BY total_price');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching packages', error: error.message });
        } else {
            res.status(500).json({ message: 'Error fetching packages', error: 'An unknown error occurred' });
        }
    }
});

// Get a single package by ID with its items
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const packageResult = await pool.query('SELECT * FROM Packages WHERE package_id = $1', [id]);
        if (packageResult.rows.length === 0) {
            return res.status(404).json({ message: 'Package not found' });
        }

        const itemsResult = await pool.query(
            `SELECT p.* 
             FROM Products p
             JOIN Package_Items pi ON p.product_id = pi.product_id
             WHERE pi.package_id = $1`,
            [id]
        );

        const pkg = packageResult.rows[0];
        pkg.features = itemsResult.rows;

        res.json(pkg);
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching package details', error: error.message });
        } else {
            res.status(500).json({ message: 'Error fetching package details', error: 'An unknown error occurred' });
        }
    }
});

export default router;
