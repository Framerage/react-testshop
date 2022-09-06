import Home from "./components/pages/Home/Home";
import "./index.scss";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/pages/Cart";
import { useState } from "react";
import { AppContext } from "./context/AppContext";
function App() {
  const [cards, setCards] = useState([
    {
      car: "Mazda RX8",
      drive: "RWD",
      stockText:
        "zavod, rotor, the with the best wheels and style. Burn at before 2000 years in Japan",
      stockImage: "./img/cars/st-M-rx8.jpg",
      stockHP: 150,
      tunerText: "JZ",
      tunerImage: "./img/cars/tun-M-rx8.jpg",
      tunerHP: 550,
      stockPrice: 700,
      tunerPrice: 1000,
    },
    {
      car: "Mazda RX7",
      drive: "RWD",
      stockText: "zavod",
      stockImage: "./img/cars/st-M-rx7.jpg",
      stockHP: 170,
      tunerText: "JZ-2",
      tunerImage: "./img/cars/tun-M-rx7.jpg",
      tunerHP: 650,
      stockPrice: 600,
      tunerPrice: 900,
    },
    {
      car: "Mitsubishi LE9",
      drive: "4WD",
      stockText: "zavod",
      stockImage: "./img/cars/st-Mit-le.jpg",
      stockHP: 110,
      tunerText: "zavod",
      tunerImage: "./img/cars/tun-Mit-le.jpg",
      tunerHP: 550,
      stockPrice: 800,
      tunerPrice: 1200,
    },
    {
      car: "Nissan Skyline R34",
      drive: "4WD",
      stockText: "zavod",
      stockImage: "./img/cars/st-N-sky.jpg",
      stockHP: 160,
      tunerText: "zavod",
      tunerImage: "./img/cars/tun-N-sky.jpg",
      tunerHP: 850,
      stockPrice: 900,
      tunerPrice: 1500,
    },
    {
      car: "Toyota Altezza",
      drive: "RWD",
      stockText: "zavod",
      stockImage: "./img/cars/st-T-alt.jpg",
      stockHP: 105,
      tunerText: "zavod",
      tunerImage: "./img/cars/tun-T-alt.jpg",
      tunerHP: 600,
      stockPrice: 750,
      tunerPrice: 1300,
    }
  ]);
  const [filterItems, setFilterItems] = useState([
    { filterName: "4WD", filterBg: "./img/4wdBG.jpg" },
    { filterName: "RWD", filterBg: "./img/rwdBG.jpg" },
  ]);
  const [cartItems, setCartItems] = useState([]);

  const onAddToCart = (obj) => {
    const findItem = cartItems.find(
      (el) => (el.car) === (obj.car))
    if (findItem) {
      setCartItems((prev) =>
        prev.filter((el) => (el.car) !== (obj.car))
      );
    } else {
      setCartItems((prev) => [...prev, obj]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        cards,
        cartItems,
        onAddToCart,
      }}
    >
      <div className="wrapper">
        <Routes>
          <Route
            exact
            path="/react-testshop/"
            element={<Home cards={cards} filterItems={filterItems} />}
          />
          <Route path="/react-testshop/cart/" element={<Cart />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
