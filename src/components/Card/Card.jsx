import React from 'react'
import classes from './card.module.scss'
const Card = ({id,animation,image}) => {

return (    
    <div className={classes.card} id={id}>
    <button onClick={elem=>animation(elem)} />
    <div className={classes.card__filling}>
        <img src={image} alt='car' />
        <div className={classes.card__filling__shotDescrip}>
            <div className={classes.shotDescrip__text}>RWD</div>
            <div className={classes.shotDescrip__text}>150 hp</div>
        </div>
    </div>
  </div>
);
};
export default Card;