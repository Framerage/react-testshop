import React from "react";
import styles from "./Header.module.scss";
const Header = ({ lightTheme, usialTheme, darkTheme }) => {
  return (
    <header id="header" className={styles.header}>
      <div className={styles.headerItems}>
        <div className={styles.headerItems__logo}>
          <div className={styles.logo__img}></div>
          <p>Drift training</p>
        </div>
        <div className={styles.headerItems__userActive}>
          <div className={styles.userActive__items}>
            cart
            <img src="./img/user.png" alt="User"/>
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
