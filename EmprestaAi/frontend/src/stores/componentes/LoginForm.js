import React, { Component }  from 'react';
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import UserStore from '../UserStore'


import './Login.css'



class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      buttonDisabled: false
    }
  }

  setInputValue(property, val){
    val = val.trim();
    if(val.length > 12){
      return;
    }
    this.setState({
      [property]: val
    })
  }

  resetForm() {
    this.setState({
      email: '',
      password: '',
      buttonDisabled: false
    })
  }

  async doLogin() {
    
    if(!this.state.email){
      return;
    }
    if(!this.state.password){
      return
    }

    this.setState({
      buttonDisabled: true
    })

    try{

      let res = await fetch('/login', {
        method: 'post',
        headers: {
          'Accept': 'aplication/json',
          'Content-Type':  'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })

      let result = await res.json();
      if(result && result.success){
        UserStore.isLoggedIn = true;
        UserStore.email = result.email;
      }

      else if(result && result.success === false){
        this.resetForm();
        alert(result.msg);
      }
    }

    catch(e){
      console.log(e);
      this.resetForm();
    }

  }

  async cadastrar(){
    UserStore.cadastrar = true;
  }


  render(){
    return (

          <div >
            <div className="login-text">
              <h2>Bem Vindo!</h2>
            </div>
            <div className="login-text">
              Efetue Login ...
            </div>

            <div className="login-form-box">
              <div>
                <label>
                  <InputField
                    type='text'
                      placeholder='E-mail'
                    value={this.state.email ? this.state.email : ''}
                    onChange={ (val) => this.setInputValue('email', val) }
                  />
                </label>
              </div>
              
              <div>
                <label>
                  <InputField
                    type='password'
                    placeholder='Senha'
                    value={this.state.password ? this.state.password : ''}
                    onChange={ (val) => this.setInputValue('password', val) }
                  />
                </label>
              </div>
          
                <div className="btn-login-box">
                  <div className="btn-login">
                    <SubmitButton 
                       text='Login'
                       disabled={this.state.buttonDisabled}
                        onClick={ () => this.doLogin() }
                    />
                  </div>

                  <div className="btn-cadastro">
                      <button 
                        className='btn' 
                        onClick={ () => this.cadastrar() }>
                          <span>Cadastre-se</span>
                        </button>
                  </div>

                  </div>
              </div>
        </div>
    );
  }
}

export default LoginForm;
