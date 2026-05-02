import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import "./ProfileOverlay.scss";

const ProfileOverlay = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <>
      <div className="profile__bg" onClick={onClose}></div>
      <section className="profile__overlay">
        <div className="profile__overlay__content">
          <Link to="/register" className="profile__overlay__content__btn">
            Registration
          </Link>
          <Link to="/login" className="profile__overlay__content__btn">
            Log-in
          </Link>
        </div>
      </section>
    </>
  );
};

export default ProfileOverlay;
