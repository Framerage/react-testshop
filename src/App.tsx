import React from "react";
import Home from "./components/pages/Home/Home";
import "./index.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cart from "./components/pages/Cart/Cart";
import { AppContext } from "./context/AppContext";
import { useDispatch } from "react-redux";
import { fetchCards } from "./redux/actions/cards";
import { useEffect, useState } from "react";
import axios from "axios";
import Orders from "./components/pages/Orders/Orders";
import ItemDescription from "./components/pages/Home/ItemDescription/ItemDescription";
import { string } from "prop-types";
//import cards from "./redux/redusers/cards";
//import filterItems from "./redux/redusers/filterItems";
//import store from "./redux/store";

const App:React.FC=()=> {

  const dispatch:Function = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  type CartItemsType={
    id:string|undefined;
    car:string|undefined;
    stockPrice:string|undefined;
    tunerPrice:string|undefined;
    parentId:number|undefined;
    choosedType:boolean|undefined;
    stockImage:string|undefined;
    tunerImage:string|undefined;
    stockHP:string|undefined;
    tunerHP:string|undefined;
  }[];
  const [cartItems, setCartItems] = useState<CartItemsType>();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await axios
          .get("https://631076b736e6a2a04eeef849.mockapi.io/cartItems")
          .then(({ data }) => {
            setCartItems(data);
          });
          dispatch(fetchCards())
        setIsLoading(false);
      } catch (error) {
        console.log("Error with load data: ", error);
        navigate('/')
      }
    };
    fetchData();
  }, []);

  const onAddToCart = async (obj: {id:string|null}) => {
    try {
      if(cartItems){
        const findItem:{id:string|undefined}|undefined=cartItems.find(
          (el) => Number(el.parentId) === Number(obj.id)
        )
        if (findItem) {
          setCartItems((prev:object|any) =>
            prev.filter((el:object|any) => Number(el.parentId) !== Number(obj.id))
          );
          await axios.delete(
            `https://631076b736e6a2a04eeef849.mockapi.io/cartItems/${findItem.id}`
          );
        } else {
          setCartItems((prev:any) => [...prev, obj]);
          const { data } = await axios.post(
            "https://631076b736e6a2a04eeef849.mockapi.io/cartItems",
            obj
          );
          setCartItems((prev:any) =>
            prev.map((item:{parentId:string|null}) => {
              if (item.parentId  === data.parentId) {
                return {
                  ...item,
                  id: data.id,
                };
              }
              return item;
            })
          );
      }
      }
    } catch (error) {
      console.log("Error with adding card to cart, ", error);
    }
  };

  const isItemAdded = (id:null|string) => {
    if(cartItems) return cartItems.some((obj) => Number(obj.parentId as number|string) === Number(id))
  };

  const onRemoveCartItems = (id:number|string) => {
    try {
      axios.delete(
        `https://631076b736e6a2a04eeef849.mockapi.io/cartItems/${id}`
      );
      setCartItems((prev:any) => prev.filter((el:{id:string}) => Number(el.id as string|null) !== Number(id)));
    } catch (error) {
      alert(" Owibka udaleniya ");
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        onRemoveCartItems,
        cartItems,
        isItemAdded,
        onAddToCart,
        setCartItems
      }}
      >
      <div className="wrapper">
        <Routes>
          <Route path="/react-testshop/" element={<Home />} />
          <Route path="/react-testshop/description/" element={<ItemDescription />} />
          <Route path="/react-testshop/cart/" element={<Cart />} />
          <Route path="/react-testshop/orders/" element={<Orders />} />
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
