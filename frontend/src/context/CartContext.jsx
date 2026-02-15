import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ADD TO CART
  const addToCart = (product) => {
    const exists = cartItems.find((item) => item._id === product._id);

    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // REMOVE FROM CART (decrease quantity by 1)
  const removeFromCart = (product) => {
    const exists = cartItems.find((item) => item._id === product._id);
    if (!exists) return;

    if (exists.quantity === 1) {
      // remove item if quantity is 1
      setCartItems(cartItems.filter((item) => item._id !== product._id));
    } else {
      // decrease quantity by 1
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  // UPDATE QUANTITY
  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      setCartItems(cartItems.filter((item) => item._id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item._id === id ? { ...item, quantity: qty } : item
        )
      );
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
