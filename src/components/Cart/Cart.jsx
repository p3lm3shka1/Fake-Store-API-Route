// Cart.jsx
import { useCart } from "../../context/cartContext";
import { IoClose, IoRemove, IoAdd, IoBagCheckOutline } from "react-icons/io5";
import { GiFullWoodBucket } from "react-icons/gi";
import "./Cart.scss";

const Cart = ({ open, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!open) return null;

  return (
    <>
      <section className="cart-sidebar-overlay" onClick={onClose} />
      <aside className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <button className="cart-sidebar__close-btn" onClick={onClose}>
          <IoClose />
        </button>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item__info">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="cart-item__image"
                    />
                    <div className="cart-item__quantity">
                      <IoRemove
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                      />
                      <span>{item.quantity}</span>
                      <IoAdd
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      />
                    </div>
                    <div className="cart-item__price">
                      ${item.price.toFixed(2)}
                    </div>
                    <button
                      className="cart-item__remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <GiFullWoodBucket />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <b>Total: ${total.toFixed(2)}</b>
            </div>
            <div className="btngroup">
              <button className="cart-clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
              <button
                className="cart-checkout-btn"
                onClick={() => alert("Proceed to checkout")}
              >
                <IoBagCheckOutline />
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default Cart;
