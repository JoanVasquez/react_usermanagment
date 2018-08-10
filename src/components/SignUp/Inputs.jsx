import React from 'react';
import Input from '../Input/Input.jsx';
import ShowError from '../ShowError/ShowError.jsx';

const Inputs = props => {
    return (
        <div>
            {
                props.origin === 'update'
                    ?
                    <div>
                        <Input
                            labelMessage="Id"
                            myInput="text"
                            inputId="id"
                            inputHolder="User Id"
                            onInputChange={props.onInputChange}
                            inputValue={props.state.id}
                            icon="fas fa-fingerprint" >
                        </Input>
                    </div>
                    :
                    null
            }

            <div>
                <Input
                    labelMessage="Name"
                    myInput="name"
                    inputId="name"
                    inputHolder=""
                    onInputChange={props.onInputChange}
                    inputValue={props.state.name}
                    icon="fa fa-user"
                    isInvalid={props.validation.name.isInvalid} >
                    {props.validation.name.isInvalid ? <ShowError error={props.validation.name.message} /> : null}
                </Input>
            </div>

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

            <div>
                <Input
                    labelMessage="Password Confirmation"
                    myInput="password"
                    inputId="passwordConfirmation"
                    inputHolder=""
                    onInputChange={props.onInputChange}
                    inputValue={props.state.passwordConfirmation}
                    icon="fa fa-lock"
                    isInvalid={props.validation.passwordConfirmation.isInvalid} >
                    {props.validation.passwordConfirmation.isInvalid ? <ShowError error={props.validation.passwordConfirmation.message} /> : null}
                </Input>
            </div>
        </div>
    );
}

export default Inputs;