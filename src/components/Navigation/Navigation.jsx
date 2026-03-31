import { Link } from "react-router-dom";
import "./Navigation.scss";
import cartIcon from "../../assets/images/cart-icon.svg";

function Navigation({ onCartClick }) {
  return (
    <nav>
      <div className="navigation">
        <Link to="/" className="logo">
          FakeStore
        </Link>
        <button className="cart-btn" onClick={onCartClick}>
          <img src={cartIcon} alt="Cart" />
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
