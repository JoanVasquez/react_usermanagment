import React from 'react';
import { Header, Body } from '../Panel/Panel.jsx';
import SignUpForm from './SignUpForm.jsx';
import { Redirect } from 'react-router-dom';

const SignUp = props => {
    let isLoggedIn = sessionStorage.getItem('jwt') ? true : false;
    return (
        isLoggedIn ?
            <Redirect to="/main" /> :
            <div className="col-lg-5 col-xs-12 mx-auto mt-2" style={{ opacity: '0.8' }}>
                <div className="card">
                    <Header>Sign Up</Header>
                    <Body>
                        <SignUpForm />
                    </Body>
                </div>
            </div>
    );
}

export default SignUp;