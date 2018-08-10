import React from 'react';
import Input from '../Input/Input.jsx';
import ShowError from '../ShowError/ShowError.jsx';

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
                    isInvalid={props.validation.email.isInvalid} >
                    {props.validation.email.isInvalid ? <ShowError error={props.validation.email.message} /> : null}
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
                    isInvalid={props.validation.password.isInvalid} >
                    {props.validation.password.isInvalid ? <ShowError error={props.validation.password.message} /> : null}
                </Input>
            </div>
        </div>
    );
}

export default Inputs;