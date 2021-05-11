import React from 'react'
import './Login.css'
import InputField from './InputField'
import UserStore from '.././UserStore'
import LoginForm from './LoginForm'

class CadastroForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            buttonDisabled: false
        }
      }

      setInputValue(property, val){
        val = val.trim();
        if(val.length > 120){
          return;
        }
        this.setState({
          [property]: val
        })
      }
    
      resetForm() {
        this.setState({
            username: '',
            email: '',
            password: '',
            buttonDisabled: false
        })
      }


      async doCadastro() {
    
        if(!this.state.username){
          return;
        }
        if(!this.state.email){
          return
        }
        if(!this.state.password){
            return;
          }
    
        this.setState({
          buttonDisabled: true
        })
    
        try{
    
          let res = await fetch('/cadastro', {
            method: 'post',
            headers: {
              'Accept': 'aplication/json',
              'Content-Type':  'application/json'
            },
            body: JSON.stringify({
              username: this.state.username,
              email: this.state.email,
              password: this.state.password
            })
          })
          
          let result = await res.json();
          if(result && result.success){
             alert(result.msg);
              UserStore.cadastrar = false;
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

    
    render(){
        return(
            <div className="container">
                <div className="login-box">
                    <div className="login-text">
                        <h2>Cadastre-se já!</h2>
                    </div>

                    <div className="login-form-box">
                        <div>
                            <label>
                                <InputField
                                    type='text'
                                    placeholder='Nome'
                                    value={this.state.username ? this.state.username : ''}
                                    onChange={ (val) => this.setInputValue('username', val) }
                                />
                            </label>
                        </div>
                        
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
                    </div>
                    <div className="btn-cadastro">
                        
                      <button 
                        className='btn'
                        id="cadastrar" 
                        onClick={ () => this.doCadastro() }>
                          <span>Cadastrar</span>
                        </button>
                    </div>

                </div>
            </div>
        )
    }
}

export default CadastroForm