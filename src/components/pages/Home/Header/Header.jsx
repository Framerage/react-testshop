import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
const Header = ({ lightTheme, usialTheme, darkTheme }) => {
  return (
  
  <header id="header" className={styles.header} style={{backgroundImage: "url('./img/headnight.jpg')"}}>
      <div className={styles.headerItems}>
      <Link to="/react-testshop/">
      <div className={styles.headerItems__logo}>
          <div className={styles.logo__img} style={{backgroundImage: `url("./img/logo.png")`}}></div>
          <p>Drift training</p>
        </div>
            </Link>

        <div className={styles.headerItems__userActive}>
          <div className={styles.userActive__items}>
            cart
            <Link to="/react-testshop/cart/">
              <img src="./img/user.png" alt="User" />
            </Link>
          </div>
          <div className={styles.userActive__themes}>
            <button style={{ background: "red" }} onClick={lightTheme}></button>
            <button
              style={{ background: "green" }}
              onClick={usialTheme}
            ></button>
            <button style={{ background: "blue" }} onClick={darkTheme}></button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
