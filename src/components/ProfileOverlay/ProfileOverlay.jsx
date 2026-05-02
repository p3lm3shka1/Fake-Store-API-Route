import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import "./ProfileOverlay.scss";

const ProfileOverlay = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <>
      <div className="profile__bg" onClick={onClose} />
      <section
        className="profile__overlay"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="profile__header">
          <h3 className="profile__title">Sign in</h3>
          <button className="profile__close" onClick={onClose}>
            <IoClose />
          </button>
        </header>

        <div className="profile__content">
          <form className="profile__form" onSubmit={(e) => e.preventDefault()}>
            <label className="profile__field">
              <span className="profile__label">Username</span>
              <input
                className="profile__input"
                type="text"
                placeholder="Enter username"
              />
            </label>

            <label className="profile__field">
              <span className="profile__label">Password</span>
              <input
                className="profile__input"
                type="password"
                placeholder="Enter password"
              />
            </label>

            <button
              className="profile__btn profile__btn--primary"
              type="submit"
            >
              Log-in
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
        </div>
      </section>
    </>
  );
};

export default ProfileOverlay;
