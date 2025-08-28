import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderDetailsForEmail {
    orderId: string;
    userName: string;
    userEmail: string;
    totalAmount: number;
    eventDate: string;
    eventTime: string;
    deliveryAddress: string;
    orderItems: Array<{
        name: string;
        quantity: number;
        priceAtPurchase: number;
        addOns?: Array<{
            name: string;
            quantity: number;
            priceAtPurchase: number;
        }>;
    }>;
}

export const sendOrderConfirmationEmail = async (orderDetails: OrderDetailsForEmail) => {
    console.log("Attempting to send order confirmation email with Resend...");
    const { orderId, userName, userEmail, totalAmount, eventDate, eventTime, deliveryAddress, orderItems } = orderDetails;

    let itemsHtml = '';
    orderItems.forEach(item => {
        itemsHtml += `
            <p><strong>${item.name}</strong> (Quantity: ${item.quantity}) - ₹${item.priceAtPurchase.toFixed(2)}</p>
        `;
        if (item.addOns && item.addOns.length > 0) {
            itemsHtml += '<ul style="list-style-type: none; padding-left: 20px;">';
            item.addOns.forEach(addOn => {
                itemsHtml += `
                    <li>${addOn.name} (Quantity: ${addOn.quantity}) - ₹${addOn.priceAtPurchase.toFixed(2)}</li>
                `;
            });
            itemsHtml += '</ul>';
        }
    });

    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'sahilrodrigues222@gmail.com', // Can be replaced with userEmail after domain verification
            subject: `Order Confirmation - #${orderId}`,
            html: `
                <h1>Hello ${userName},</h1>
                <p>Thank you for your order! Your order #${orderId} has been confirmed.</p>
                <h2>Order Summary:</h2>
                <p><strong>Event Date:</strong> ${eventDate}</p>
                <p><strong>Event Time:</strong> ${eventTime}</p>
                <p><strong>Delivery Address:</strong> ${deliveryAddress}</p>
                <h3>Items:</h3>
                ${itemsHtml}
                <p><strong>Total Amount:</strong> ₹${totalAmount.toFixed(2)}</p>
                <p>We will contact you shortly to finalize the details.</p>
                <p>Best regards,</p>
                <p>The BMBP Team</p>
            `,
        });

        if (error) {
            console.error('Error sending email from Resend:', error);
            return;
        }

        console.log('Order confirmation email sent successfully:', data);
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
    }
};