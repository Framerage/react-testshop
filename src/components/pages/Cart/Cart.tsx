import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import CreatingOrder from "../../CreatingOrder";
import styles from "./Cart.module.scss";
const Cart = () => {
  const { cartItems, onRemoveCartItems, setCartItems } = useContext<{
    cartItems: any;
    onRemoveCartItems: Function;
    setCartItems: Function;
  }>(AppContext);
  const [isOrderComlete, setIsOrderComlete] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(false);
  const delay = () => new Promise((resolve) => setTimeout(resolve, 500));

  useEffect(() => {
    const tryCart = async () => {
      if (!cartItems) {
        await axios
          .get(`https://631076b736e6a2a04eeef849.mockapi.io/cartItems/`)
          .then(({ data }) => setCartItems(data));
      }
    };
    tryCart();
  }, []);
  const onFillOrder=()=>{
    setIsLoadingOrders(true);
  }
  const onClickOrder = async () => {
    try {
      if (cartItems) {
        setIsLoadingOrders(true);
        await axios.post(
          "https://631076b736e6a2a04eeef849.mockapi.io/orders",
          {
            items: cartItems,
            time: new Date().getHours() + ":" + new Date().getMinutes(),
          }
        );
        setIsOrderComlete(true);
        setCartItems([]);

        for (let i = 0; i < cartItems.length; i++) {
          const item = cartItems[i];
          await axios.delete(
            `https://631076b736e6a2a04eeef849.mockapi.io/cartItems/${item.id}`
          );
          await delay();
          setIsLoadingOrders(false);
        }
      }
    } catch (error) {
      console.log("Error with order");
    }
  };
  return (
   <>
    <CreatingOrder opened={isLoadingOrders} />
    <div className={styles.cartContent}>
      <header className={styles.cartContent__header}>
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
      </header>
      <main>
        <div className={styles.cartContent__descrip}>Your products</div>
        <div className={styles.cartContent__cartItems}>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map(
              (
                item: {
                  id: string;
                  car: string;
                  choosedType: boolean;
                  stockImage: string;
                  tunerImage: string;
                  stockPrice: string;
                  tunerPrice: string;
                },
                index: number
              ) => (
                <div
                  key={`${item.car}_${index}`}
                  className={styles.cartItems__item}
                >
                  <div className={styles.descripPart}>
                    <img
                      className={styles.descripPart__img}
                      src={
                        item.choosedType
                          ? "." + item.stockImage
                          : "." + item.tunerImage
                      }
                      alt="item"
                    />
                    <div className={styles.item__descrip}>
                      <div className={styles.descrip__text}>
                        {item.choosedType ? item.car : item.car}
                      </div>
                      <div className={styles.descrip__text}>
                        {item.choosedType ? "stock" : "tuner"}
                      </div>
                    </div>
                  </div>
                  <div className={styles.descripPart}>
                    <span>
                      {item.choosedType ? item.stockPrice : item.tunerPrice} US
                    </span>
                    <button onClick={() => onRemoveCartItems(item.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )
            )
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {" "}
              <img
                style={{
                  margin: "10px 0",
                }}
                src="../img/empty-cart.png"
                alt="empty"
                width={200}
              />
              <h1
                style={{
                  margin: "10px 0",
                  fontSize: "10em",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {isOrderComlete ? "Order complete!" : "Nothing"}
              </h1>
            </div>
          )}
        </div>
        {cartItems.length !== 0 && (
          <div className={styles.createOrder}>
            <button onClick={onFillOrder} className={styles.createOrder__btn}>
              Create order
            </button>
          </div>
        )}
      </main>
    </div>
   </>
  );
};

export default Cart;
