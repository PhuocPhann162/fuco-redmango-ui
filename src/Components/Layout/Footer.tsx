import { Link } from "react-router-dom";

let logo = require("../../Assets/Images/mango.png");
let footer_deco = require("../../Assets/Images/footer_deco.jpg");

function Footer() {
  return (
    <footer className="bd-footer py-5 mt-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 py-5">
            <div className="d-inline-flex align-items-center mb-3 link-dark text-decoration-none">
              <Link className="nav-link" aria-current="page" to="/">
                <img src={logo} alt="Logo" style={{ height: "40px" }} />
              </Link>
              <span className="fs-5 px-2">FucoMastery</span>
            </div>
            <ul className="list-unstyled small text-muted ms-2">
              <li className="mb-2">
                Designed and built with all the love in the world by the{" "}
                <a
                  className="text-dark"
                  href="https://github.com/PhuocPhann162"
                >
                  Fuco team
                </a>{" "}
                with the help of our contributors.
              </li>
              <li className="mb-2">
                Code licensed{" "}
                <a href="/" className="text-dark text-decoration-none">
                  MIT
                </a>
                , docs{" "}
                <a href="/" className="text-dark text-decoration-none">
                  CC BY 1.0
                </a>
                .
              </li>
              <li className="mb-2">Currently v1.0.0.</li>
              <li className="mb-2">
                Analytics by{" "}
                <a
                  className="text-dark"
                  href="https://github.com/PhuocPhann162"
                >
                  PhuocPhan
                </a>
                .
              </li>
            </ul>
          </div>
          <div className="col-8 col-lg-7 offset-lg-2">
            <img
              src={footer_deco}
              alt="Footer"
              style={{ height: "350px", width: "650px" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
