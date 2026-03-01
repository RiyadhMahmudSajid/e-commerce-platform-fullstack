import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
 const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

 useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    
    setCart(prev => {
      const exist = prev.find(p => p._id === product._id);

      if (exist) {
        return prev.map(p =>
          p._id === product._id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };


  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };


  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };
   
 
  const removeAllFromCart = (selectedItem) => {
  setCart(prev => prev.filter(item => item !== selectedItem));
};


  return (
    <CartContext.Provider value={{ cart,setCart, addToCart, increaseQty, decreaseQty, removeFromCart,removeAllFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
