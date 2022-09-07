import React from "react";
import styles from "./selectCards.module.scss";
const SelectCards = ({ options, value, onChange, defaultValue }) => {

  return (
    <select
      className={styles.slct}
      value={value}
      onChange={(event) => onChange(event.target.value)}
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
