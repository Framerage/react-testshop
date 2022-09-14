import React, { useState } from "react";
import classes from "./card.module.scss";
import PropTypes, { number } from 'prop-types'
import { Link } from "react-router-dom";
type CardTypes={
  id:string ,
  animation:Function,
  car:string,
  stockImage:string,
  stockText:string,
  tunerText:string,
  tunerImage:string,
  stockHP:string,
  tunerHP:string,
  drive:string,
  stockPrice:string,
  tunerPrice:string,
  onAddToCart:Function,
  isItemAdded:Function
}
const Card :React.FC<CardTypes> = ({
  id ,
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
  onAddToCart,
  isItemAdded
}) => {
  const carTypes = ["stock", "tuner"];
  const [animChoosedType, setAnimChoosedType] = useState(0);
  const [choosedType, setChoosedType] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const onAddCard = () => {
    setIsAdded(!isAdded);
    choosedType
      ? onAddToCart({ car,id,stockImage, stockHP , stockPrice,parentId :id,choosedType })
      : onAddToCart({ car,id,tunerImage, tunerHP, tunerPrice,parentId:id as string | undefined,choosedType });
  };
  const onClickType = (index:number) => {
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
          {id!=='#' &&           <img
            onClick={onAddCard}
            src={isItemAdded(id) ? "./img/btn-checked.svg" : "./img/btn-plus.svg"}
            alt="checked"
          />}
        </div>
        <div className={classes.card__descrption}>
        <Link className="link" to='/react-testshop/description/'>
          <span>Description:</span>
          </Link>
          <div className={classes.descrptionText}>
            <span>{choosedType ? stockText : tunerText}</span>
            <span>Price: {choosedType ? stockPrice : tunerPrice} US</span>
          </div>
        </div>
      </div>

  );
};

Card.defaultProps={
  id:'#',
  car:"Name",
  stockPrice:"0",
  tunerPrice:"0",
  drive:'WD',
  stockImage:'https://otvet.imgsmail.ru/download/3469d045a3fac33da623e340cc5fe27f_i-3.jpg',
  tunerImage:'https://otvet.imgsmail.ru/download/3469d045a3fac33da623e340cc5fe27f_i-3.jpg',
  stockHP:'?',
  tunerHP:'?',
}
export default Card;
