import { Router, RequestHandler } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { pool } from '../index';
import { ClerkExpressRequireAuth, WithAuthProp } from '@clerk/clerk-sdk-node';
import { sendOrderConfirmationEmail } from '../utils/email';

const router = Router();

// Create a new order
router.post('/', ClerkExpressRequireAuth() as any, async (req, res) => {
    const { user, eventDetails, totalAmount, orderItems } = req.body;
    const clerkId = (req as any).auth.userId;

    // Basic validation
    if (!user || !eventDetails || !totalAmount || !orderItems) {
        return res.status(400).json({ message: 'Missing required order data.' });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Find or create the user
        let result = await client.query('SELECT user_id FROM Users WHERE clerk_id = $1', [clerkId]);
        let userId;

        if (result.rows.length > 0) {
            userId = result.rows[0].user_id;
        } else {
            // User not found, create a new one
            result = await client.query(
                'INSERT INTO Users (clerk_id, full_name, email, phone_number) VALUES ($1, $2, $3, $4) RETURNING user_id',
                [clerkId, user.fullName, user.email, user.phone]
            );
            userId = result.rows[0].user_id;
        }

        // 2. Create the order
        const orderResult = await client.query(
            `INSERT INTO Orders (user_id, event_date, event_time, delivery_address, guest_count, total_amount, notes)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING order_id`,
            [
                userId,
                eventDetails.eventDate,
                eventDetails.eventTime,
                eventDetails.deliveryAddress,
                eventDetails.guestCount,
                totalAmount,
                eventDetails.notes,
            ]
        );
        const orderId = orderResult.rows[0].order_id;

        // 3. Create the order items
        for (const item of orderItems) {
            // Insert the base product
            await client.query(
                `INSERT INTO Order_Items (order_id, product_id, quantity, price_at_purchase)
                 VALUES ($1, $2, $3, $4)`,
                [orderId, item.productId, item.quantity, item.priceAtPurchase]
            );

            // Insert add-ons for the base product
            if (item.addOns && item.addOns.length > 0) {
                for (const addOn of item.addOns) {
                    await client.query(
                        `INSERT INTO Order_Items (order_id, product_id, quantity, price_at_purchase, parent_product_id)
                         VALUES ($1, $2, $3, $4, $5)`,
                        [orderId, addOn.productId, addOn.quantity, addOn.priceAtPurchase, item.productId]
                    );
                }
            }
        }

        await client.query('COMMIT');

        // Fetch product names for email
        const productIds = orderItems.flatMap((item: any) => [
            item.productId,
            ...(item.addOns || []).map((addOn: any) => addOn.productId)
        ]);

        const productNamesResult = await client.query(
            'SELECT product_id, name FROM Products WHERE product_id = ANY($1::int[])',
            [productIds]
        );
        const productNamesMap = new Map(productNamesResult.rows.map(row => [row.product_id, row.name]));

        const orderItemsForEmail = orderItems.map((item: any) => ({
            name: productNamesMap.get(item.productId) || 'Unknown Product',
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
            addOns: item.addOns?.map((addOn: any) => ({
                name: productNamesMap.get(addOn.productId) || 'Unknown Add-on',
                quantity: addOn.quantity,
                priceAtPurchase: addOn.priceAtPurchase,
            })),
        }));

        // Send confirmation email
        console.log('Preparing to send order confirmation email...');
        await sendOrderConfirmationEmail({
            orderId: orderId,
            userName: user.fullName,
            userEmail: user.email,
            totalAmount: totalAmount,
            eventDate: eventDetails.eventDate,
            eventTime: eventDetails.eventTime,
            deliveryAddress: eventDetails.deliveryAddress,
            orderItems: orderItemsForEmail,
        });
        console.log('Finished sending order confirmation email.');

        res.status(201).json({ message: 'Order created successfully', orderId });

    } catch (error: unknown) {
        await client.query('ROLLBACK');
        console.error('Error creating order:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Failed to create order', error: error.message });
        } else {
            res.status(500).json({ message: 'Failed to create order', error: 'An unknown error occurred' });
        }
    } finally {
        client.release();
    }
});


// Get orders for the authenticated user
router.get('/my-orders', ClerkExpressRequireAuth() as any, async (req, res) => {
    try {
        const clerkId = (req as any).auth.userId;
        if (!clerkId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const result = await pool.query(
            `SELECT o.*,
                    json_agg(
                        json_build_object(
                            'order_item_id', oi.order_item_id,
                            'product_name', p.name,
                            'quantity', oi.quantity
                        )
                    ) as order_items
             FROM Orders o
             JOIN Order_Items oi ON o.order_id = oi.order_id
             JOIN Products p ON oi.product_id = p.product_id
             JOIN Users u ON o.user_id = u.user_id
             WHERE u.clerk_id = $1
             GROUP BY o.order_id
             ORDER BY o.order_date DESC`,
            [clerkId]
        );

        res.json(result.rows);
    } catch (error: unknown) {
        console.error('Error fetching user orders:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching user orders', error: error.message });
        } else {
            res.status(500).json({ message: 'Error fetching user orders', error: 'An unknown error occurred' });
        }
    }
});

export default router;