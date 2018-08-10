import React from 'react';
import Panel from '../Panel/Panel.jsx';
import SignInForm from './SignInForm.jsx';


const SignIn = props => {

    return (
        <div className="col-lg-5 col-xs-12 mx-auto mt-5" style={{ opacity: '0.8' }}>
            <Panel headerType="card-default" headerMessage="Login">
                <SignInForm onLogin={props.onLogin}/>
            </Panel>
        </div>
    );
}

export default SignIn;
