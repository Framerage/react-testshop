import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import classes from "./card.module.scss";
import PropTypes from 'prop-types'
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
  const { onAddToCart,isItemAdded } = useContext(AppContext);
  const carTypes = ["stock", "tuner"];
  const [animChoosedType, setAnimChoosedType] = useState(0);
  const [choosedType, setChoosedType] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const onAddCard = () => {
    setIsAdded(!isAdded);
    choosedType
      ? onAddToCart({ car,id,stockImage, stockHP , stockPrice,parentId:id,choosedType })
      : onAddToCart({ car,id,tunerImage, tunerHP, tunerPrice,parentId:id,choosedType });
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
            src={isItemAdded(id) ? "./img/btn-checked.svg" : "./img/btn-plus.svg"}
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

Card.propTypes={
  car:PropTypes.string,
  stockPrice:PropTypes.string,
  tunerPrice:PropTypes.string,
  stockHP:PropTypes.string,
  tunerHP:PropTypes.string,
  stockText:PropTypes.string,
  tunerText:PropTypes.string,
  drive:PropTypes.string,
  stockImage:PropTypes.string,
  tunerImage:PropTypes.string,
};

Card.defaultProps={
  car:'Name',
  stockPrice:'0',
  tunerPrice:'0',
  drive:'WD',
  stockImage:'https://otvet.imgsmail.ru/download/3469d045a3fac33da623e340cc5fe27f_i-3.jpg',
  tunerImage:'https://otvet.imgsmail.ru/download/3469d045a3fac33da623e340cc5fe27f_i-3.jpg',
  stockHP:'?',
  tunerHP:'?',
}
export default Card;
