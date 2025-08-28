import { Router } from 'express';
import { pool } from '../index';

const router = Router();

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Categories ORDER BY name');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching categories' });
    }
});

// Get all products with optional filters
router.get('/', async (req, res) => {
    const { type, category_id, category } = req.query;

    let query = 'SELECT p.* FROM Products p';
    const params = [];

    if (category) {
        query = 'SELECT p.* FROM Products p JOIN Categories c ON p.category_id = c.category_id WHERE c.name = $1';
        params.push(category);
        if (type) {
            query += ' AND p.product_type = $2';
            params.push(type);
        }
    } else if (type) {
        query = 'SELECT p.* FROM Products p WHERE p.product_type = $1';
        params.push(type);
    } else if (category_id) {
        query = 'SELECT p.* FROM Products p WHERE p.category_id = $1';
        params.push(category_id);
    }

    query += ' ORDER BY p.name';

    try {
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching products', error: error.message });
        } else {
            res.status(500).json({ message: 'Error fetching products', error: 'An unknown error occurred' });
        }
    }
});

import { baseProducts } from '../seed';

// Get a single product by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Products WHERE product_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const product = result.rows[0];
        const baseProduct = baseProducts.find(p => p.id === parseInt(id));
        if (baseProduct) {
            product.amenities = baseProduct.amenities;
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching product' });
    }
});

export default router;