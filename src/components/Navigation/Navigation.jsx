import { GrCart } from "react-icons/gr";
import { VscAccount } from "react-icons/vsc";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { useCart } from "../../context/cartContext";
import { useHiddenScroll } from "../../hooks/useHiddenScroll";

import "./Navigation.scss";
import Cart from "../Cart/Cart";
import ProfileOverlay from "../ProfileOverlay/ProfileOverlay";

const Navigation = () => {
  const { cartItems } = useCart();
  const quantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const hidden = useHiddenScroll({ threshold: 150, delta: 2 });

  const [cartOpened, setCartOpened] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (hidden && open) setOpen(false);
  }, [hidden, open]);

  return (
    <motion.nav
      animate={{ y: hidden ? -140 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <div className="navigation">
        <Link to="/" className="logo">
          FakeStore
        </Link>
        <div className="navigation__btngroup">
          <button className="account-btn" onClick={() => setProfileOpen(true)}>
            <VscAccount className="account-btn__icon" />
          </button>
          <button className="cart-btn" onClick={() => setCartOpened(true)}>
            <GrCart className="cart-btn__icon" />
            {quantity > 0 && (
              <aside className="cart-btn__count">{quantity}</aside>
            )}
          </button>
        </div>
      </div>
      {cartOpened && (
        <Cart open={cartOpened} onClose={() => setCartOpened(false)} />
      )}
      {profileOpen && (
        <ProfileOverlay
          open={profileOpen}
          onClose={() => setProfileOpen(false)}
        />
      )}
    </motion.nav>
  );
};

export default Navigation;
