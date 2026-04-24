import Cart from "../Cart/Cart";
import { useCart } from "../../context/cartContext";

import { use, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "./Navigation.scss";

import { GrCart } from "react-icons/gr";

function Navigation() {
  const [cartOpened, setCartOpened] = useState(false);
  const { cartItems } = useCart();
  const quantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav>
      <div className="navigation">
        <Link to="/" className="logo">
          FakeStore
        </Link>

        <button className="cart-btn" onClick={() => setCartOpened(true)}>
          <GrCart className="cart-btn__icon" />
          {quantity > 0 && <span className="cart-btn__count">{quantity}</span>}
        </button>
      </div>
      {cartOpened && (
        <Cart open={cartOpened} onClose={() => setCartOpened(false)} />
      )}
    </nav>
  );
}

export default Navigation;
