import React from 'react';
import { Header, Body } from '../Panel/Panel.jsx';
import SignInForm from './SignInForm.jsx';
import { Redirect } from 'react-router-dom';

const SignIn = props => {
    let isLoggedIn = sessionStorage.getItem('jwt') ? true : false;
    return (
        isLoggedIn ? 
        <Redirect to="/main" /> :
        <div className="col-lg-5 col-xs-12 mx-auto mt-5" style={{ opacity: '0.8' }}>
            <div className="card">
                <Header>Login</Header>
                <Body>
                    <SignInForm />
                </Body>
            </div>
        </div>
    );
}

export default SignIn;
