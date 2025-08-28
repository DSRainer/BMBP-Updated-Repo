import getApiUrl from '@/lib/api';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useAuth } from '@clerk/clerk-react';

interface Order {
  order_id: number;
  order_date: string;
  total_amount: string;
  status: string;
  order_items: any[]; // Define a more specific type for order items if needed
}

import { useLocation } from 'react-router-dom';
import { useToast } from '../components/ui/use-toast';
import { Toaster } from '../components/ui/toaster';

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (location.state?.orderSuccess) {
      toast({
        title: "Confirmation Email Sent",
        description: "Your order has been successfully placed.",
        variant: "success",
      });
    }
  }, [location.state, toast]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await getToken();
        const api = getApiUrl('/orders/my-orders');
        const response = await fetch(api.url, {
          ...api.options,
          headers: {
            ...api.options.headers,
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [getToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Toaster />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <p>You have no orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.order_id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Order #{order.order_id}</h2>
                    <p className="text-sm text-gray-600">
                      Placed on {new Date(order.order_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₹{parseFloat(order.total_amount).toLocaleString()}</p>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                      order.status === 'paid' ? 'bg-green-200 text-green-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Items in this order:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {order.order_items.map(item => (
                      <li key={item.order_item_id}>{item.product_name} (x{item.quantity})</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;