import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoadAnimation from "../../LoadAnimation";
import styles from "./Orders.module.scss";
const Orders = () => {
  type OrdersType = {
    id: string;
    time: string;
    items: {
      map(arg0: (item: any) => JSX.Element): React.ReactNode;
      id: string;
      car: string;
      stockImage: string;
      stockText: string;
      tunerText: string;
      tunerImage: string;
      stockHP: string;
      tunerHP: string;
      drive: string;
      stockPrice: string;
      tunerPrice: string;
    };
  }[];
  const [orders, setOrders] = useState<OrdersType>();
  const [isOrdersLoad, setIsOrdersLoad] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setIsOrdersLoad(true);
        const { data } = await axios.get(
          "https://631076b736e6a2a04eeef849.mockapi.io/orders"
        );
        setOrders(data);
        //console.log(data.flatMap(obj=>obj.items))
        //console.log(data.map(obj=>obj.items).flat())
        //console.log(data.reduce((prev,curr)=>[...prev,...curr.items],[]))
      } catch (error) {
        alert("err");
      }
      setTimeout(() => {
        setIsOrdersLoad(false);
      }, 1000);
    })();
  }, []);
  return (
    <div className={styles.orderContent}>
      <header className={styles.orderContent__header}>
        <Link to="/react-testshop/">
          <div className={styles.headerItems__logo}>
            <div className={styles.logo__img}></div>
            <p>Drift training</p>
          </div>
        </Link>

        <div className={styles.header__orderLogo}>
          <Link to="/react-testshop/cart/">
            <img src="../img/lightpacket.png" alt="Cart" />
          </Link>
          <p>Orders</p>
          <div className={styles.orderLogo__img}></div>
        </div>
      </header>

      <main className={styles.orderContent__orderItems}>
        <div className={styles.orderItems__descrip}>Your orders</div>
        {isOrdersLoad ? (
          <LoadAnimation />
        ) : (
          orders &&
          orders.map((order) => (
            <div
              key={`${order.id}_${order.items.car}`}
              className={styles.orderItems__item}
            >
              <span className={styles.descripName}>
                Order number #{order.id} at {order.time}
              </span>
              <div className={styles.descripOrders}>
                {order.items.map((item) => (
                  <div key={`${item.car}`} className={styles.orderItem}>
                    <img
                      className={styles.orderItem__img}
                      src={
                        item.stockImage
                          ? "." + item.stockImage
                          : "." + item.tunerImage
                      }
                      alt="imgCar"
                    />
                    <div className={styles.orderItem__text}>
                      <h3>Performance:</h3>
                      {item.choosedType ? (
                        <>
                          <p>Name of car: {item.car}</p>
                          <p>Type of car: {"stock"}</p>
                          <p>Drive: {item.drive}</p>
                          <p>Car's HP: {item.stockHP}</p>
                          <p>Price: {item.stockPrice} US</p>
                        </>
                      ) : (
                        <>
                          <p>Name of car: {item.car}</p>
                          <p>Type of car: {"tuner"}</p>
                          <p>Drive: {item.drive}</p>
                          <p>Car's HP: {item.tunerHP}</p>
                          <p>Price: {item.tunerPrice} US</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};
export default Orders;
