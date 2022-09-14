import React from "react";
import styles from "./selectCards.module.scss";
type SelectProps={
  options:{value:string,type:string}[];
  value:string;
  onChange:Function;
  defaultValue:string;
}
const SelectCards:React.FC<SelectProps> = ({ options, value, onChange, defaultValue }) => {

  return (
    <select
      className={styles.slct}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option className={styles.slct__item} value="">
        {defaultValue}
      </option>
      {options.map((option,index:number) => (
        <option
          className={styles.slct__item}
          key={option.value+index}
          value={option.value}
        >
          {option.type}

        </option>
      ))}
    </select>
  );
};
export default SelectCards;
