import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import styles from "./Cart.module.scss";
const Cart = () => {
  const { cartItems } = useContext(AppContext);
  const onRemoveCartItems = (id) => {
    try {
      axios.delete(
        `https://631076b736e6a2a04eeef849.mockapi.io/cartItems/${id}`
      );
      //setCartItems((prev) => prev.filter((el) => Number(el.id) !== Number(id)));
    } catch (error) {
      alert(" Owibka udaleniya ", error);
    }
  };
  return (
    <main className={styles.cartContent}>
      <div className={styles.cartContent__header}>
        <Link to="/react-testshop/">
          <div className={styles.headerItems__logo}>
            <div className={styles.logo__img}></div>
            <p>Drift training</p>
          </div>
        </Link>
        <div className={styles.header__cartLogo}>
          <p>Basket</p>
          <div className={styles.cartLogo__img}></div>
        </div>
      </div>
      <div>
        <div className={styles.cartContent__descrip}>Your products</div>
        <div className={styles.cartContent__cartItems}>
          {cartItems.map((item, index) => (
            <div
              key={`${item.car}_${index}`}
              className={styles.cartItems__item}
            >
              <div className={styles.descripPart}>
                <img
                  className={styles.descripPart__img}
                  src={item.choosedType ?'.'+ item.stockImage :'.'+  item.tunerImage}
                  alt="item"
                />
                <div className={styles.item__descrip}>
                  <div className={styles.descrip__text}>{item.choosedType ? item.car : item.car}</div>
                  <div className={styles.descrip__text}>{item.choosedType ? 'stock' : 'tuner'}</div>
                </div>
              </div>
              <div className={styles.descripPart}>
                <span>
                  {item.choosedType ? item.stockPrice : item.tunerPrice} US
                </span>
                <button onClick={()=>onRemoveCartItems(item.id)}>Delete</button>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </main>
  );
};
export default Cart;
