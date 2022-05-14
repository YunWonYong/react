import "./layout.css";
import "../common/css/box.css";
import "../common/css/list.css";
import "../common/css/button.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="left">
        <strong>Copyright 2022. Playlinks. All rights reserved.</strong>
      </div>
      <div className="right">
        <ul className="item-list separator-pipe">
          <li className="item">
            <button className="default-style-reset">
              <strong>White paper</strong>
            </button>
          </li>
          <li className="item">
            <button className="default-style-reset">
              <strong>Terms of Service</strong>
            </button>
          </li>
          <li className="item">
            <button className="default-style-reset">
              <strong>Privacy Policy</strong>
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
