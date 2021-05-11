import React, { Component }  from 'react';
import LoginForm   from './LoginForm'
import './Login.css'


class Login extends React.Component {

    render(){
        return(
            <div class="login-box">
                <LoginForm />
            </div>
        )
    }


}

export default Login