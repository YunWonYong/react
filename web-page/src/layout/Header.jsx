import React from "react";
import { Link } from "react-router-dom";
import earthglobe_48px from "../assets/image/earthglobe_48px.png";
import quote_48px from "../assets/image/quote_48px.png";
import "./layout.css";
import "../common/css/box.css";
import "../common/css/list.css";
import "../common/css/button.css";

const Header = () => {
  return (
    <header className="header">
      <section className="logo left">
        <Link to="/">게임 로고</Link>
      </section>
      <section className="navigation right">
        <article>
          <img src={quote_48px} alt="지구" />
          <img src={earthglobe_48px} alt="지구" />
          <button className="default-style-reset">LOG IN</button>
        </article>
        <nav>
          <ul className="item-list flex-round">
            <li className="item">
              <Link to="/about">게임 소개</Link>
            </li>
            <li className="item">
              <Link to="/news">NEWS</Link>
            </li>
            <li className="item">
              <Link to="/event">EVENT</Link>
            </li>
            <li className="item">
              <Link to="/sloco">SLOCO</Link>
            </li>
            <li className="item">
              <Link to="/mint">MINT</Link>
            </li>
            <li className="item">
              <Link to="/market">NFT Market</Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
