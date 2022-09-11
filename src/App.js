import Home from "./components/pages/Home/Home";
import "./index.scss";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/pages/Cart/Cart";
import { AppContext } from "./context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./redux/actions/cart";
import { setCardItems } from "./redux/actions/cards";
import { useEffect, useState } from "react";
import axios from "axios";
//import cards from "./redux/redusers/cards";
//import filterItems from "./redux/redusers/filterItems";
//import store from "./redux/store";

function App() {
  const { cartItems } = useSelector(({ cartItems }) => {
    return {
      cartItems: cartItems.cartItems,
    };
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://631076b736e6a2a04eeef849.mockapi.io/cartItems")
      .then(({ data }) => {
        dispatch(setCart(data));
      });
    axios
      .get("https://631076b736e6a2a04eeef849.mockapi.io/cars")
      .then(({ data }) => {
        dispatch(setCardItems(data));
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // const fetchCards=async()=>{
  //   try{
  //     setIsLoading(true)
  //     const getCartItems= await axios.get("https://631076b736e6a2a04eeef849.mockapi.io/cartItems")
  //     setCartItems(getCartItems.data)
  //     const getCards = await axios.get('https://631076b736e6a2a04eeef849.mockapi.io/cars');
  //     setCards(getCards.data)
  //     setTimeout(()=>{
  //       setIsLoading(false)
  //     },1000)
  //   }
  //   catch(error){
  //     console.log('Error with getting data')
  //   }
  // }
  // fetchCards();

  return (
    <AppContext.Provider
      value={{
        cartItems,
        isLoading,
      }}
    >
      <div className="wrapper">
        <Routes>
          <Route exact path="/react-testshop/" element={<Home />} />
          <Route path="/react-testshop/cart/" element={<Cart />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
export default App;

//For class component

// export default connect(
//   (state)=>{
//     return {
//       items:state.cards.cars,
//       filter:state.filters
//     }
//   },
//   (dispatch)=>{
//     return{
//       setCards:(items)=>dispatch(setCardItems(items))
//     }
//   }
// )(App)

// class App extends Component{
//   componentDidMount(){
//     axios.get('https://631076b736e6a2a04eeef849.mockapi.io/cars').then(({data})=>{
//     this.props.setCardItems(data)
//     });

//   }

//   render(){
//     //console.log(this.props)
//     return(

//       <div className="wrapper">
//         <Routes>
//           <Route
//             exact
//             path="/react-testshop/"
//             element={<Home
//               cards={this.props.items}
//               filterItems={[]}
//               />}
//           />
//           <Route path="/react-testshop/cart/" element={<Cart
//           cartItems={[]}
//           />} />
//         </Routes>
//       </div>
//     )
//   }
// }

// const mapStateToProps=(state)=>{
//   //console.log(state.cards.cars)
//   return {
//     items:state.cards.cars,
//     filter:state.filters
//   }
// };
// const mapDispatchToProps={
//   setCardItems,
// }

// export default connect(mapStateToProps,
//   mapDispatchToProps
//   )(App);
