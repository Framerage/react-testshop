import Home from "./components/pages/Home/Home";
import "./index.scss";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/pages/Cart";
function App() {

  return (
    <div className="wrapper">
      <Routes>
        <Route exact path="/react-testshop/" element={<Home/>}/>
        <Route path="/react-testshop/cart/" element={<Cart/>}/>
      </Routes>
    </div>
  );
}

export default App;
