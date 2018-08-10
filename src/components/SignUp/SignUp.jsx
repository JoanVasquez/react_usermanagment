import React from 'react';
import Panel from '../Panel/Panel.jsx';
import SignUpForm from './SignUpForm.jsx';

const SignUp = props => {
        return (
            <div className="col-lg-5 col-xs-12 mx-auto mt-2" style={{ opacity: '0.8' }}>
                <Panel headerType="card-default" headerMessage="Register">
                    <SignUpForm origin='signIn' onLogin={props.onLogin}/>
                </Panel>
            </div>
        );
}

export default SignUp;