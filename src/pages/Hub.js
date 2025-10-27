import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import "../assets/css/Hub.css";

function Hub() {
  return (
    <div className="hub-page">
      <Navbar showLinks={false} variant="hub" />

      <main className="hub-main">
        <div className="hub-buttons-row">
          <Link to="/ferramentas" className="hub-button">
            <span className="hub-button-text">Ferramentas</span>
          </Link>

          <Link to="/portfolio" className="hub-button">
            <span className="hub-button-text">Portfólio</span>
          </Link>

          <a
            href="https://documentacao-geral.vercel.app/"
            className="hub-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="hub-button-text">Documentação</span>
          </a>
        </div>
      </main>
    </div>
  );
}

export default Hub;
