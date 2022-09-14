import React, { BaseSyntheticEvent, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../../context/AppContext";
import { useCards } from "../../../hooks/useCards";
import Card from "../../Card/Card";
import LoadAnimation from "../../LoadAnimation";
import SelectCards from "../../UI/SelectCards";
import Header from "./Header/Header";
import styles from "./Home.module.scss";
import { setFilterBy, setSortBy } from "../../../redux/actions/filters";
import { useCallback } from "react";
const Home = () => {
  const statusCard: Array<boolean> | [] = [];
  
  type FilterTypes={
    filterName:string;
    filterBg:string;
  };

  const filterItems: FilterTypes[] = [
    {
      filterName: "4WD",
      filterBg: "./img/4wdBG.jpg",
    },
    {
      filterName: "RWD",
      filterBg: "./img/rwdBG.jpg",
    },
  ];
  const dispatch = useDispatch();
  const { cards, sortBy, category }:any = useSelector<any>(({ cards, filters }) => {
    return {
      cards: cards.cars,
      sortBy: filters.sortBy,
      category: filters.category,
    };
  });
  const { isLoading, isItemAdded, onAddToCart } = useContext(AppContext);

  const onSelectFilter = useCallback((filterName: string | null) => {
    dispatch(setFilterBy(filterName));
  }, []);
  const onSelectSort = useCallback((sort: string) => {
    dispatch(setSortBy(sort));
  }, []);
  const cardAnimation = (elem: BaseSyntheticEvent) => {
    let item = elem.target.parentElement;
      if (statusCard[item.id]) {
        statusCard[item.id] = false;
        item.classList.remove(`${styles.anim}`);
      } else {
        statusCard[item.id] = true;
        item.classList.add(`${styles.anim}`);
      }
  };
  const sortedAndFilteredCards = useCards(cards, sortBy, category);
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
    <>
      <Header />
      <main className={styles.content}>
        <div className={styles.content__filter}>
          <div className={styles.filter__filterHead}>
            Choose drive
            <span onClick={() => onSelectFilter(null)}>All drives</span>
          </div>

          <div
            //ref={filterRef}
            className={styles.filter__filterItems}
          >
            {filterItems.map(
              (
                item: FilterTypes,
                index: number
              ) => (
                <div
                  onClick={() => onSelectFilter(item.filterName)}
                  key={`${item.filterName}_${index}`}
                  className={
                    category === item.filterName
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
              )
            )}
          </div>
        </div>

        <div className={styles.content__selectCards}>
          <img
            src="./img/lightArrow.png"
            style={{ width: "45px", height: "55px" }}
            alt="lArrow"
          />
          <SelectCards
            defaultValue="Sort cars by ..."
            value={sortBy}
            onChange={(sort: string) => onSelectSort(sort)}
            options={[
              { value: "stockPrice", type: "sort by stock price" },
              { value: "tunerPrice", type: "sort by tuner price" },
              { value: "car", type: "sort by name" },
            ]}
          />
          <img
            src="./img/lightArrow.png"
            style={{ rotate: "180deg", width: "45px", height: "55px" }}
            alt="rArrow"
          />
        </div>
        {isLoading ? (
          <LoadAnimation />
        ) : (
          <div className={styles.content__items}>
            {sortedAndFilteredCards &&
              sortedAndFilteredCards.map((card, index) => (
                <Card
                  key={`${card.car}_${index}`}
                  {...card}
                  animation={cardAnimation}
                  onAddToCart={onAddToCart}
                  isItemAdded={isItemAdded}
                />
              ))}
          </div>
        )}
      </main>
    </>
  );
};
export default Home;
