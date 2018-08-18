import React from "react";
import Input from "../Input/Input.jsx";
import InputError from "../InputError/InputError.jsx";

const Inputs = props => {
  return (
    <div>
      {props.state.id ? (
        <div>
          <Input
            isDisabled="true"
            labelMessage="Id"
            myInput="text"
            inputId="id"
            inputHolder="User Id"
            onInputChange={props.onInputChange}
            inputValue={props.state.id}
            icon="fas fa-id-card"
          />
        </div>
      ) : null}

      <div>
        <Input
          labelMessage="Name"
          myInput="name"
          inputId="name"
          inputHolder=""
          onInputChange={props.onInputChange}
          inputValue={props.state.name}
          icon="fa fa-user"
        >
          {props.validation.name.isInvalid ? (
            <InputError error={props.validation.name.message} />
          ) : null}
        </Input>
      </div>

      <div>
        <Input
          isDisabled={`${props.state.id ? "disabled" : ""}`}
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

      <div>
        <Input
          labelMessage="Password Confirmation"
          myInput="password"
          inputId="passwordConfirmation"
          inputHolder=""
          onInputChange={props.onInputChange}
          inputValue={props.state.passwordConfirmation}
          icon="fa fa-lock"
        >
          {props.validation.passwordConfirmation.isInvalid ? (
            <InputError error={props.validation.passwordConfirmation.message} />
          ) : null}
        </Input>
      </div>
    </div>
  );
};

export default Inputs;
