import { Link } from "react-router-dom";

import notFoundImg from "../../assets/images/404.png";

import "./NotFoundPage.scss";

function NotFoundPage() {
  return (
    <section className="notfound">
      <img src={notFoundImg} alt="404 Not Found" className="notfound__img" />

      <Link to="/" className="link">
        Go back
      </Link>
    </section>
  );
}

export default NotFoundPage;
