import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import cors from 'cors';
import { Pool } from 'pg';
import * as url from 'url';

import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import packageRoutes from './routes/packages';
import orderRoutes from './routes/orders';
import contactRoutes from './routes/contact';

const app: Express = express();
const port = process.env.PORT || 3001;

// Database Connection
const params = url.parse(process.env.DATABASE_URL || '');
const auth = params.auth?.split(':');

export const pool = new Pool({
  user: auth?.[0] || undefined,
  password: auth?.[1] || undefined,
  host: params.hostname || undefined,
  port: params.port ? parseInt(params.port) : undefined,
  database: params.pathname ? params.pathname.split('/')[1] : undefined,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/packages', packageRoutes);
app.use('/orders', orderRoutes);
app.use('/contact', contactRoutes);

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('BMBP Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack,
  });
});
