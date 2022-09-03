import React from "react";
import styles from "./Home.module.scss";
const Home = () => {
  return (
    <main className={styles.content}>
      <div className={styles.content__filter}>
        <div className={styles.filter__filterHead}>Choose drive</div>
        <div className={styles.filter__filterItems}>
          <div className={styles.filterItems__fourWheels}>
            <p>4WD</p>
          </div>
          <div className={styles.filterItems__rearWheels}>
            <p>RWD</p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;
