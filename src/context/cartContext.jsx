import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

const STORAGE_KEY = "fakestore_cart";

export function CartProvider({ children }) {
  // cart local storage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  //local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product) {
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + 1,
        };
        return updated;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQuantity(id, quantity) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
