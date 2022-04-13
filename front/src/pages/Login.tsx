import React from 'react';
import LoginForm from '../components/LoginForm';
import Page from '../components/page';

const Login = () => {
    return (
        <Page>
            <div className='login__body'>
                <div className="login__body-content">
                    <LoginForm />
                </div>
            </div>
        </Page>
    );
}

export default Login;