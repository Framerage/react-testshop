import { useEffect, useState } from "react";
import Home from "./components/pages/Home/Home";
import Header from "./components/Header/Header";
import "./index.scss";
import Footer from "./components/Footer";
function App() {
  const [fillColor, setFillColor] = useState("middle");

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
      headerBg.style.backgroundImage = `url('./img/headsun.jpg')`;
      headerBg.style.backgroundPositionY = '-550px';
    } else if (fillColor !== "black" && fillColor !== "white") {
      let docBg = document.getElementById("html");
      docBg.style.background =
        "linear-gradient(rgb(64, 184, 224),violet,rgb(64, 184, 224))";
      let headerBg = document.getElementById("header");
      headerBg.style.backgroundImage = `url('./img/headday.jpg')`;
    } else {
      let docBg = document.getElementById("html");
      docBg.style.background = "linear-gradient(black,rgb(55, 34, 93),black)";
      let headerBg = document.getElementById("header");
      headerBg.style.backgroundImage = `url('./img/headnight.jpg')`;
    }
  }, [fillColor]);
  return (
    <div className="wrapper">
      <Header 
      lightTheme={getLightTheme}
      usialTheme={getUsialTheme}
      darkTheme={getDarkTheme}
      />
      <Home/>
      <Footer text='btn' >hello</Footer>
      <Footer color='green' ></Footer>
    </div>
  );
}

export default App;
