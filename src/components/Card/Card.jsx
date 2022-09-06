import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import classes from "./card.module.scss";
const Card = ({
  id,
  animation,
  car,
  stockImage,
  stockText,
  tunerText,
  tunerImage,
  stockHP,
  tunerHP,
  drive,
  stockPrice,
  tunerPrice,
}) => {
  const { onAddToCart } = useContext(AppContext);
  const carTypes = ["stock", "tuner"];
  const [animChoosedType, setAnimChoosedType] = useState(0);
  const [choosedType, setChoosedType] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const onAddCard = () => {
    setIsAdded(!isAdded);
    choosedType
      ? onAddToCart({ car, stockHP, stockPrice })
      : onAddToCart({ car, tunerHP, tunerPrice });
  };
  const onClickType = (index) => {
    setAnimChoosedType(index);
    setChoosedType(!choosedType);
  };

  return (
      <div className={classes.card} id={id}>
        <button onClick={(elem) => animation(elem)} />
        <div className={classes.card__filling}>
          <img src={choosedType ? stockImage : tunerImage} alt="car" />
          <div className={classes.card__filling__shotDescrip}>
            <div className={classes.shotDescrip__text}>{drive}</div>
            <div className={classes.shotDescrip__text}>
              {choosedType ? stockHP : tunerHP} hp
            </div>
          </div>
        </div>
        <div className={classes.card__functional}>
          {carTypes.map((type, index) => (
            <div
              onClick={() => onClickType(index)}
              className={
                animChoosedType === index
                  ? classes.functional__chooseType + " " + classes.activeType
                  : classes.functional__chooseType
              }
              key={type + index}
            >
              {type}
            </div>
          ))}
          <p>{car}</p>
          <img
            onClick={onAddCard}
            src={isAdded ? "./img/btn-checked.svg" : "./img/btn-plus.svg"}
            alt="checked"
          />
        </div>
        <div className={classes.card__descrption}>
          <span>Description:</span>
          <div className={classes.descrptionText}>
            <span>{choosedType ? stockText : tunerText}</span>
            <span>Price: {choosedType ? stockPrice : tunerPrice} US</span>
          </div>
        </div>
      </div>

  );
};
export default Card;
