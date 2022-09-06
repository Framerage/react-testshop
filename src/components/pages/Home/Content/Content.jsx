import React, { useState } from "react";
import Card from "../../../Card/Card";
import SelectCards from "../../../UI/SelectCards";
import styles from "./content.module.scss";
const Content = ({ cards, filterItems }) => {
  const statusCard = [];
  const [filterAnim, setFilterAnim] = useState(null);
  const onSelectFilter = (index) => {
    setFilterAnim(index);
  };

  const cardAnimation = (elem) => {
    let item = elem.target.parentElement;
    if (statusCard[item.id]) {
      statusCard[item.id] = false;
      item.classList.remove(`${styles.anim}`);
    } else {
      statusCard[item.id] = true;
      item.classList.add(`${styles.anim}`);
    }
  };

// Functional to take down filter
  // const filterRef = useRef();
  // const handleOutsideClick = (event) => {
  //   if (!event.path.includes(filterRef.current)) {
  //     setFilterAnim(null);
  //   } else {
  //     console.log("popal");
  //   }
  // };
  // useEffect(() => {
  //   document.body.addEventListener("click", handleOutsideClick);
  // }, []);

  return (
    <main className={styles.content}>
      <div className={styles.content__filter}>
        <div className={styles.filter__filterHead}>
          Choose drive
          <span onClick={() => onSelectFilter(null)}>All drives</span>
        </div>

        <div 
        //ref={filterRef} 
        className={styles.filter__filterItems}>
          {filterItems.map((item, index) => (
            <div
              onClick={() => onSelectFilter(index)}
              key={`${item.filterName}_${index}`}
              className={
                filterAnim === index
                  ? styles.activeFilter + " " + styles.filterItems__drives
                  : styles.filterItems__drives
              }
              style={{
                backgroundImage: `url(${item.filterBg})`,
                borderRadius: `${
                  item.filterName === "4WD" ? "0 0 0 25px" : "0 0 25px"
                }`,
                justifyContent: `${
                  item.filterName === "4WD" ? "end" : "start"
                }`,
              }}
            >
              <p>{item.filterName}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.content__selectCards}>
        <img
          src="./img/lightArrow.png"
          style={{ width: "45px", height: "55px" }}
          alt="lArrow"
        />
        <SelectCards
          options={[
            { value: "price", name: "sort by price" },
            { value: "name", name: "sort by name" },
          ]}
        />
        <img
          src="./img/lightArrow.png"
          style={{ rotate: "180deg", width: "45px", height: "55px" }}
          alt="rArrow"
        />
      </div>

      <div className={styles.content__items}>
        {cards.map((card, index) => (
          <Card
            key={`${card.name}_${index}`}
            {...card}
            id={index}
            animation={cardAnimation}
          />
        ))}
      </div>
    </main>
  );
};
export default Content;
