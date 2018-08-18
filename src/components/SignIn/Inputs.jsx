import React from "react";
import Input from "../Input/Input.jsx";
import InputError from "../InputError/InputError.jsx";

const Inputs = props => {
  return (
    <div>
      <div>
        <Input
          labelMessage="Email"
          myInput="email"
          inputId="email"
          inputHolder=""
          onInputChange={props.onInputChange}
          inputValue={props.state.email}
          icon="fas fa-at"
        >
          {props.validation.email.isInvalid ? (
            <InputError error={props.validation.email.message} />
          ) : null}
        </Input>
      </div>

      <div>
        <Input
          labelMessage="Password"
          myInput="password"
          inputId="password"
          inputHolder=""
          onInputChange={props.onInputChange}
          inputValue={props.state.password}
          icon="fa fa-lock"
        >
          {props.validation.password.isInvalid ? (
            <InputError error={props.validation.password.message} />
          ) : null}
        </Input>
      </div>
    </div>
  );
};

export default Inputs;
