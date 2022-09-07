import Home from "./components/pages/Home/Home";
import "./index.scss";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/pages/Cart";
import { useEffect, useState } from "react";
import { AppContext } from "./context/AppContext";
import axios from "axios";
import Header from "./components/Header/Header";
function App() {
  const [cards, setCards] = useState([]);
  const [fillColor, setFillColor] = useState("middle");
  useEffect(()=>{
    const fetchCards=async()=>{
      const getCards = await axios.get('https://631076b736e6a2a04eeef849.mockapi.io/cars');
      setCards(getCards.data)
    }
    fetchCards();
  },[])
 
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
  

  const getLightTheme = () => {
    setFillColor("white");
  };
  const getUsialTheme = () => {
    setFillColor("middle");
  };
  const getDarkTheme = () => {
    setFillColor("black");
  };
  useEffect(() => {
    if (fillColor !== "black" && fillColor !== "middle") {
      let docBg = document.getElementById("html");
      docBg.style.background =
        "linear-gradient(yellowgreen,yellow,coral,yellowgreen)";
      let headerBg = document.getElementById("header");
      headerBg.style.backgroundImage = "url('./img/headsun.jpg')";
      headerBg.style.backgroundPositionY = '-550px';
    } else if (fillColor !== "black" && fillColor !== "white") {
      let docBg = document.getElementById("html");
      docBg.style.background =
        "linear-gradient(rgb(64, 184, 224),lightpink,rgb(64, 184, 224))";
      let headerBg = document.getElementById("header");
      headerBg.style.backgroundImage = "url('./img/headday.jpg')";
    } else {
      let docBg = document.getElementById("html");
      docBg.style.background = "linear-gradient(black,rgb(55, 34, 93),black)";
      let headerBg = document.getElementById("header");
      headerBg.style.backgroundImage = "url('./img/headnight.jpg')";
    }
  }, [fillColor]);
  return (
    <AppContext.Provider
      value={{
        cards,
        cartItems,
        onAddToCart,
        setCards
      }}
    >
      <div className="wrapper">
      < Header
    lightTheme={getLightTheme}
    usialTheme={getUsialTheme}
    darkTheme={getDarkTheme}
    />
        <Routes>
          <Route
            exact
            path="/react-testshop/"
            element={<Home cards={cards} filterItems={filterItems} />}
          />
          <Route path="/react-testshop/cart/" element={<Cart cartItems={cartItems} />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
