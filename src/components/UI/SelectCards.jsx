import React, { useState } from "react";
import styles from "./selectCards.module.scss";
const SelectCards = ({ options, value, onChange, defaultValue }) => {
  const [selectedOption,setSelectedOption]=useState('')
  const onSelectedOption=(option)=>{
    console.log(option)
    setSelectedOption(option)
  }
  return (
    <select
      className={styles.slct}
      value={value}
      onChange={(event) => onSelectedOption(event.target.value)}
    >
      <option className={styles.slct__item} value="">
        {defaultValue}
      </option>
      {options.map((option,index) => (
        <option
          className={styles.slct__item}
          key={option.value}
          value={option.value}
        >
          {option.name}

        </option>
      ))}
    </select>
  );
};
export default SelectCards;
