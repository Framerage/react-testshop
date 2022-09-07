import Home from "./components/pages/Home/Home";
import "./index.scss";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/pages/Cart/Cart";
import { useEffect, useState } from "react";
import { AppContext } from "./context/AppContext";
import axios from "axios";
function App() {
  const [cards, setCards] = useState([]);
  const filterItems = [
    { filterName: "4WD", filterBg: "./img/4wdBG.jpg" },
    { filterName: "RWD", filterBg: "./img/rwdBG.jpg" },
  ];
  const [cartItems, setCartItems] = useState([]);
  const [isLoading,setIsLoading]=useState(false)

  useEffect(()=>{
    const fetchCards=async()=>{
      try{
        setIsLoading(true)
        const getCartItems= await axios.get("https://631076b736e6a2a04eeef849.mockapi.io/cartItems")
        setCartItems(getCartItems.data)
        const getCards = await axios.get('https://631076b736e6a2a04eeef849.mockapi.io/cars');
        setCards(getCards.data)
        setTimeout(()=>{
          setIsLoading(false)
        },1000)
      }
      catch(error){
        console.log('Error with getting data')
      }
    }
    fetchCards();
  },[])
 


  const onAddToCart = async(obj) => {
    try {
      const findItem = cartItems.find(
        (el) => Number(el.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((el) => Number(el.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://631076b736e6a2a04eeef849.mockapi.io/cartItems/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://631076b736e6a2a04eeef849.mockapi.io/cartItems",
          obj
        );
        setCartItems((prev) => prev.map((item)=>{
          if(item.parentId===data.parentId){
            return {
              ...item,
              id:data.id
            }
          }
          return item;
        }));
      }
    } catch (error) {
      console.log("Error with adding card to cart, ", error);
    }
  };

  const onRemoveCartItems = (id) => {
    try {
      axios.delete(
        `https://631076b736e6a2a04eeef849.mockapi.io/cartItems/${id}`
      );
      setCartItems((prev) => prev.filter((el) => Number(el.id) !== Number(id)));
    } catch (error) {
      alert(" Owibka udaleniya ", error);
    }
  };
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        cards,
        cartItems,
        onAddToCart,
        setCards,onRemoveCartItems,isItemAdded,isLoading
      }}
    >
      <div className="wrapper">
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
