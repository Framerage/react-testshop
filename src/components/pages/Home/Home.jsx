import React, { useEffect, useState } from "react";
import Content from "./Content/Content";
import Header from "./Header/Header";
const Home = ({filterItems,cards}) => {
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
    <>
    <Header 
    lightTheme={getLightTheme}
    usialTheme={getUsialTheme}
    darkTheme={getDarkTheme}
    />
    <Content cards={cards} filterItems={filterItems}/>
    </>
  );
};
export default Home;
