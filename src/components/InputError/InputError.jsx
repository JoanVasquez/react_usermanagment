import React from "react";

const InputError = props => {
  return (
    <div>
      <span className="pf-5 text-danger align-middle">
        &nbsp;
        <i className="fas fa-exclamation-circle">
          &nbsp;
          {props.error}
        </i>
      </span>
    </div>
  );
};

export default InputError;
