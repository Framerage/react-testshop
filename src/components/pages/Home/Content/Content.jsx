import React, { useEffect } from 'react'
import Card from '../../../Card/Card';
import SelectCards from '../../../UI/SelectCards';
import styles from './content.module.scss'
const Content = () => {
    const statusCard=[];

    // useEffect(()=>{
    //     cardAnimation();
    // },[])

    const cardAnimation=(elem)=>{
        let item=elem.target.parentElement;
        if (statusCard[item.id]){
          statusCard[item.id]=false;
          item.classList.remove(`${styles.anim}`)
          //console.log(statusCard)
        }
        else{
          statusCard[item.id]=true;
          item.classList.add(`${styles.anim}`)
          //console.log(statusCard)
        }
      }
return (
    <main className={styles.content}>
      <div className={styles.content__filter}>
        <div className={styles.filter__filterHead}>Choose drive</div>
        <div className={styles.filter__filterItems}>
          <div className={styles.filterItems__fourWheels} style={{backgroundImage: 'url("./img/4wdBG.jpg")'}}>
            <p>4WD</p>
          </div>
          <div className={styles.filterItems__rearWheels} style={{backgroundImage: 'url("./img/rwdBG.jpg")'}}>
            <p>RWD</p>
          </div>
        </div>
      </div>

      <div className={styles.content__selectCards}>
      <img src="./img/lightArrow.png" style={{ width: "45px", height: "55px" }}/>
      <SelectCards options={
            [{value:'price',name:'sort by price'},
            {value:'name',name:'sort by name'}]
        }/>
<img
  src="./img/lightArrow.png"
  style={{ rotate: "180deg",width: "45px", height: "55px" }}
/>

      </div>

      <div className={styles.content__items}>
        <Card image='./img/cars/st-M-rx8.jpg' id={0} animation={cardAnimation}/>
        <Card image='./img/cars/st-T-supra.jpg' id={1} animation={cardAnimation}/>
        <Card image='./img/cars/st-M-rx7.jpg' id={2} animation={cardAnimation}/>
        <Card image='./img/cars/st-Mit-le.jpg' id={3} animation={cardAnimation}/>
      </div>
    </main>
);
};
export default Content;