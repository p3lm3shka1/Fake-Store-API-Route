<<<<<<< HEAD
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

=======
import { Link } from "react-router-dom";
import "./Navigation.scss";
import cartIcon from "../../assets/images/cart-icon.svg";

function Navigation({ onCartClick }) {
>>>>>>> 867737a41154b39644cdce3ce8476d5bc307d810
  return (
    <nav>
      <div className="navigation">
        <Link to="/" className="logo">
          FakeStore
        </Link>
<<<<<<< HEAD

        <button className="cart-btn" onClick={() => setCartOpened(true)}>
          <GrCart className="cart-btn__icon" />
          {quantity > 0 && <span className="cart-btn__count">{quantity}</span>}
        </button>
      </div>
      {cartOpened && (
        <Cart open={cartOpened} onClose={() => setCartOpened(false)} />
      )}
=======
        <button className="cart-btn" onClick={onCartClick}>
          <img src={cartIcon} alt="Cart" />
        </button>
      </div>
>>>>>>> 867737a41154b39644cdce3ce8476d5bc307d810
    </nav>
  );
}

export default Navigation;
