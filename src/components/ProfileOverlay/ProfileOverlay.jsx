import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";

import { useAuth } from "../../context/AuthContext";

import "./ProfileOverlay.scss";

const ProfileOverlay = ({ open, onClose }) => {
  const { isAuth, login, logout } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sumbitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSubmitting(true);
      await login(username, password);
      onClose();
    } catch (err) {
      setError("Login failed. Please check your username and password.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      <div className="profile__bg" onClick={onClose} />
      <section className="profile" onClick={(e) => e.stopPropagation()}>
        <header className="profile__header">
          <h3 className="profile__title">{isAuth ? "Profile" : "Sign in"}</h3>
          <button className="profile__close" onClick={onClose}>
            <IoClose />
          </button>
        </header>

        <div className="profile__content">
          {!isAuth ? (
            <form className="profile__form" onSubmit={handleLogin}>
              <label className="profile__field">
                <input
                  className="profile__input"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>

              <label className="profile__field">
                <input
                  className="profile__input"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              {error && <p className="profile__error">{error}</p>}

              <button
                className="profile__btn profile__btn--primary"
                type="submit"
                disabled={sumbitting || !username || !password}
              >
                {sumbitting ? "Logging in..." : "Log in"}
              </button>

              <Link
                to="/register"
                className="profile__btn profile__btn--secondary"
                onClick={onClose}
              >
                Registration
              </Link>

              <button className="profile__link" type="button">
                Forgot password?
              </button>
            </form>
          ) : (
            <div className="profile__content">
              <Link
                to="/add-product"
                className="profile__btn profile__btn--primary"
                onClick={onClose}
              >
                <MdAddBox size={20} /> Add New Product
              </Link>
              <Link
                to="/profile-page"
                className="profile__btn profile__btn--secondary"
                onClick={onClose}
              >
                My products
              </Link>

              <button
                className="profile__btn profile__btn--secondary"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProfileOverlay;
