import React from "react";
import classNames from "classnames";
const Footer=(props)=> {

    return (
      <button
        className={classNames(
          "button",
          { 'btn__out': props.text },
          { 'btn__test': props.test }
        )}>
        {props.text}
      </button>
    );
}
export default Footer;
