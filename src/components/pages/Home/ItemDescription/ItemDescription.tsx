import React from "react";
import { useSelector } from "react-redux";
const ItemDescription:React.FC = () => {
  const { descripPage }:any = useSelector<any>(({ descripPage }) => {
    return {
      descripPage:descripPage.car
    };
  });
  return (
    <div>
      <h1 style={{ fontSize: "7em", color: "white" }}>Description of {descripPage}</h1>
      <h2 style={{ fontSize: "5em", color: "white" }}>History:</h2>
    </div>
  );
};
export default ItemDescription;
