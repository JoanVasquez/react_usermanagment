import React from "react";

const Button = props => {
  return props.click ? (
    <button type={props.type} className={props.btnClass} onClick={props.click}>
      {props.msg}
    </button>
  ) : (
    <button type={props.type} className={props.btnClass}>
      {props.msg}
    </button>
  );
};

export default Button;
