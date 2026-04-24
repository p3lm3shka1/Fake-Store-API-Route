import { Link } from "react-router-dom";

import "../App.scss";

function NotFoundPage() {
  return (
    <section className="notfound">
      <h1>404</h1>
      <p>Page is not found</p>
      <Link to="/" className="link">
        Go to Home Page
      </Link>
    </section>
  );
}

export default NotFoundPage;
