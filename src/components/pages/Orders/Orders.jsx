import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './Orders.module.scss'
const Orders = () => {
    const [orders,setOrders]=useState([])
    const [isOrdersLoad,setIsOrdersLoad]=useState(false)
    useEffect(()=>{
      (async()=>{
          try{
              setIsOrdersLoad(true)
              const {data} =await axios.get('https://631076b736e6a2a04eeef849.mockapi.io/orders')
              setOrders(data)
              console.log(data)
              //console.log(data.flatMap(obj=>obj.items))
              //console.log(data.map(obj=>obj.items).flat())
              //console.log(data.reduce((prev,curr)=>[...prev,...curr.items],[]))
          }
          catch(error){
              alert('err')
          }
          setTimeout(()=>{
              setIsOrdersLoad(false)
  
          },1000)
      })
      ()
    },[])
  return (
    <main className={styles.orderContent}>
      <div className={styles.orderContent__header}>
        <Link to="/react-testshop/">
          <div className={styles.headerItems__logo}>
            <div className={styles.logo__img}></div>
            <p>Drift training</p>
          </div>
        </Link>
        <div className={styles.header__orderLogo}>
          <p>Orders</p>
          <div className={styles.orderLogo__img}></div>
        </div>
      </div>
      <div className={styles.orderItems}>

      </div>
    </main>
  );
};
export default Orders;
