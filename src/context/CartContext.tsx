import { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '@/lib/products';

export interface Package {
  name: string;
  price: number;
  features: string[];
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartItem extends Product {
  cartItemId: string;
  quantity: number;
  addOns: AddOn[];
  selectedPackage: Package | null;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, addOns: AddOn[], selectedPackage: Package | null) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateAddOnQuantity: (cartItemId: string, addOnId: string, quantity: number) => void;
  removeAddOnFromCart: (cartItemId: string, addOnId: string) => void;
  cartCount: number;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, addOns: AddOn[], selectedPackage: Package | null) => {
    const cartItemId = `${product.id}-${JSON.stringify(addOns)}-${selectedPackage ? selectedPackage.name : 'no-package'}`;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.cartItemId === cartItemId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, cartItemId, quantity: 1, addOns, selectedPackage, salePrice: parseFloat(product.price) }];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const updateAddOnQuantity = (cartItemId: string, addOnId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.cartItemId === cartItemId) {
          const updatedAddOns = item.addOns.map((addOn) => {
            if (addOn.id === addOnId) {
              return { ...addOn, quantity };
            }
            return addOn;
          });
          return { ...item, addOns: updatedAddOns };
        }
        return item;
      })
    );
  };

  const removeAddOnFromCart = (cartItemId: string, addOnId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.cartItemId === cartItemId) {
          const updatedAddOns = item.addOns.filter((addOn) => addOn.id !== addOnId);
          return { ...item, addOns: updatedAddOns };
        }
        return item;
      })
    );
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const clearCart = () => {
    setCartItems([]);
  };

  const setCart = (items: CartItem[]) => {
    setCartItems(items);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateAddOnQuantity,
        removeAddOnFromCart,
        cartCount,
        clearCart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
