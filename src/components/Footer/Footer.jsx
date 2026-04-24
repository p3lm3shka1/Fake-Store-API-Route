import { FaGithub } from "react-icons/fa";

import "./Footer.scss";

function Footer() {
  return (
    <footer>
      <a
        href="https://github.com/p3lm3shka1/Fake-Store-API-Route"
        target="_blank"
      >
        {" "}
        <FaGithub size={30} />
      </a>
      <p>
        © 2026{" "}
        <a href="https://fakestoreapi.com/" target="_blank">
          FakeStore API
        </a>
      </p>
    </footer>
  );
}

export default Footer;
