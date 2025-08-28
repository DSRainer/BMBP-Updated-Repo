import getApiUrl from "@/lib/api";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser, useClerk } from "@clerk/clerk-react";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, updateAddOnQuantity, removeAddOnFromCart, cartCount, clearCart, setCart } = useCart();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const { openSignIn, session } = useClerk();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    guests: "",
    eventDate: "",
    eventTime: "",
    address: "",
    notes: ""
  });
  const [dateError, setDateError] = useState<string | null>(null);
  const [isProcessingPendingOrder, setIsProcessingPendingOrder] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      const pendingOrderRaw = sessionStorage.getItem('pendingOrder');
      if (pendingOrderRaw) {
        const pendingOrder = JSON.parse(pendingOrderRaw);
        setCart(pendingOrder.cartItems);
        setFormData(pendingOrder.formData);
        setIsProcessingPendingOrder(true);
        sessionStorage.removeItem('pendingOrder');
      }
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    const submitPendingOrder = async () => {
      if (isProcessingPendingOrder && isFormValid()) {
        await handleSubmit();
        setIsProcessingPendingOrder(false);
      }
    };

    submitPendingOrder();
  }, [isProcessingPendingOrder, formData]);

  const subtotal = cartItems.reduce((total, item) => {
    const addOnsTotal = item.addOns.reduce((addOnsTotal, addOn) => addOnsTotal + addOn.price * addOn.quantity, 0);
    return total + item.salePrice + addOnsTotal;
  }, 0);

  const gst = subtotal * 0.18; // 18% GST
  const total = subtotal + gst;

  const handleInputChange = (field: string, value: string) => {
    if (field === "eventDate") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to compare dates only
      if (selectedDate < today) {
        setDateError("Event date cannot be in the past.");
      } else {
        setDateError(null);
      }
    }

    if (field === "phone" || field === "guests") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData(prev => ({ ...prev, [field]: numericValue }));
    } else if (field === "fullName") {
      const textValue = value.replace(/[0-9]/g, "");
      setFormData(prev => ({ ...prev, [field]: textValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(cartItemId, newQuantity);
    }
  };

  const handleAddOnQuantityChange = (cartItemId: string, addOnId: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateAddOnQuantity(cartItemId, addOnId, newQuantity);
    }
  };

  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.guests &&
      formData.eventDate &&
      formData.eventTime &&
      formData.address
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid() || !!dateError) {
      alert("Please fill all required fields correctly.");
      return;
    }

    if (!isSignedIn) {
      // Save cart and form data to session storage before redirecting to sign in
      sessionStorage.setItem('pendingOrder', JSON.stringify({ cartItems, formData }));
      openSignIn({ redirectUrl: '/cart' }); // Redirect back to cart to process the order
      return;
    }

    
    const token = await session?.getToken();

    const orderItems = cartItems.map(item => ({
      productId: item.product_id,
      quantity: 1, // Base product quantity is always 1
      priceAtPurchase: item.salePrice,
      packageId: item.selectedPackage?.id, // Assuming package has an ID
      addOns: item.addOns.map(addOn => ({
        productId: addOn.id,
        quantity: addOn.quantity,
        priceAtPurchase: addOn.price,
      })),
    }));

    const orderData = {
      user: {
        clerkId: user.id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      },
      eventDetails: {
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        deliveryAddress: formData.address,
        guestCount: parseInt(formData.guests),
        notes: formData.notes,
      },
      totalAmount: parseFloat(total.toFixed(2)),
      orderItems: orderItems,
    };

    try {
      const api = getApiUrl('/orders');
      const response = await fetch(api.url, {
        ...api.options,
        method: 'POST',
        headers: {
          ...api.options.headers,
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        clearCart();
        navigate('/my-orders', { state: { orderSuccess: true } });
      } else {
        const errorData = await response.json();
        alert(`Failed to place order: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Details - Left Panel */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h1>
                
                {/* Personal Information */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder="Enter your full name"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Guests <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="number"
                        min="1"
                        placeholder="Number of guests"
                        value={formData.guests}
                        onChange={(e) => handleInputChange("guests", e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          type="date"
                          placeholder="dd/mm/yyyy"
                          value={formData.eventDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => handleInputChange("eventDate", e.target.value)}
                          className="w-full pr-10"
                          required
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      {dateError && <p className="text-red-500 text-sm mt-1">{dateError}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Time <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          type="time"
                          placeholder="--:--"
                          value={formData.eventTime}
                          onChange={(e) => handleInputChange("eventTime", e.target.value)}
                          className="w-full pr-10"
                          required
                        />
                        <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full"
                      rows={3}
                      required
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Special Requests</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <Textarea
                      placeholder="Any special requests or instructions..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      className="w-full"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary - Right Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                
                {/* Vendor Information */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.cartItemId} className="border-b pb-4">
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <img 
                            src={item.image_url} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/64x64?text=Shop";
                            }}
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      {item.selectedPackage && (
                        <div className="mb-2">
                          <h4 className="font-medium text-gray-900">Package: {item.selectedPackage.name}</h4>
                          <p className="text-sm text-gray-600">Price: ₹{item.selectedPackage.price.toLocaleString()}</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {item.selectedPackage.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {item.addOns.map((addOn) => (
                        <div key={`${item.cartItemId}-${addOn.id}`} className="border-t mt-2 pt-2">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{addOn.name}</h4>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeAddOnFromCart(item.cartItemId, addOn.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddOnQuantityChange(item.cartItemId, addOn.id, addOn.quantity - 1)}
                                className="w-8 h-8 p-0"
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{addOn.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddOnQuantityChange(item.cartItemId, addOn.id, addOn.quantity + 1)}
                                className="w-8 h-8 p-0"
                              >
                                +
                              </Button>
                            </div>
                            <span className="font-medium text-gray-900">₹{addOn.price.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="text-gray-900">₹{gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-full">
                          <Button
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                            disabled={!isFormValid() || !!dateError}
                            onClick={handleSubmit}
                          >
                            Proceed to Payment
                          </Button>
                        </div>
                      </TooltipTrigger>
                      {(!isFormValid() || !!dateError) && (
                        <TooltipContent>
                          <p>
                            {dateError
                              ? dateError
                              : "Please fill all required fields to proceed."}
                          </p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/" className="flex items-center justify-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>

                {/* Payment Security */}
                <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Secure payment powered by Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;