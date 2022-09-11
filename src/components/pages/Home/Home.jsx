import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../../context/AppContext";
import { useCards } from "../../../hooks/useCards";
import Card from "../../Card/Card";
import LoadAnimation from "../../LoadAnimation";
import SelectCards from "../../UI/SelectCards";
import Header from "./Header/Header";
import styles from "./Home.module.scss";
import { setFilterBy, setSortBy } from "../../../redux/actions/filters";
import axios from "axios";
import { useEffect } from "react";
import {setCardItems} from '../../../redux/actions/cards'
const Home = () => {
  const statusCard = [];
  const filterItems = [
    {
      filterName: "4WD",
      filterBg: "./img/4wdBG.jpg",
    },
    {
      filterName: "RWD",
      filterBg: "./img/rwdBG.jpg",
    },
  ];
  const dispatch=useDispatch();
  const { cards, sortBy, category } = useSelector(({ cards, filters }) => {
    return {
      cards: cards.cars,
      sortBy: filters.sortBy,
      category: filters.category,
    };
  });

  const {cartItems,isLoading}=useContext(AppContext)
  useEffect(()=>{
        axios.get('https://631076b736e6a2a04eeef849.mockapi.io/cars').then(({data})=>{
        dispatch(setCardItems(data))
    });
  },[])

  const onSelectFilter = (filterName) => {
    dispatch(setFilterBy(filterName));
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

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (el) => Number(el.parentId) === Number(obj.id)
      );
      if (findItem) {
        // setCartItems((prev) =>
        //   prev.filter((el) => Number(el.parentId) !== Number(obj.id))
        // );
        await axios.delete(
          `https://631076b736e6a2a04eeef849.mockapi.io/cartItems/${findItem.id}`
        );
      } else {
        //setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://631076b736e6a2a04eeef849.mockapi.io/cartItems",
          obj
        );
        // setCartItems((prev) => prev.map((item)=>{
        //   if(item.parentId===data.parentId){
        //     return {
        //       ...item,
        //       id:data.id
        //     }
        //   }
        //   return item;
        // }));
      }
    } catch (error) {
      console.log("Error with adding card to cart, ", error);
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };
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
            {filterItems.map((item, index) => (
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
            defaultValue="Sort cars by ..."
            value={sortBy}
            onChange={(sort) => dispatch(setSortBy(sort))}
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
            {sortedAndFilteredCards.map((card, index) => (
              <Card
                key={`${card.name}_${index}`}
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
