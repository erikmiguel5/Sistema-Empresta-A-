import React        from 'react'
import { observer } from 'mobx-react'
import SubmitButton from './stores/componentes/SubmitButton'
import UserStore    from './stores/UserStore'
import                    './App.css'
import Login   from './stores/componentes/Login'
import Home from './stores/componentes/Home'
import CadastroForm from './stores/componentes/CadastroForm'

class App extends React.Component {

  async componentDidMount() {

    try {

      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      let result = await res.json();

      if(result && result.success){
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.email = result.email;
      }
      else{
        UserStore.loading = false;
         UserStore.isLoggedIn = false;
      }

    }

    catch(e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }

  }

  async doLogout() {

    try {

      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      let result = await res.json();

      if(result && result.success){
        UserStore.isLoggedIn = false;
        UserStore.email = '';
      }

    }

    catch(e) {
      console.log(e);
    }

  }

  render(){

    if(UserStore.loading){
      return (
        <div className="app">
          <div className='container'>
            Loading, please wait ...
          </div>
        </div>
      )
    }
    else{

      if(UserStore.isLoggedIn){
        return (
          <div className="app">
            <Home />
        </div>
        );
      }

      if(UserStore.cadastrar){
        return(
        <CadastroForm />
        );
      }
      return (
        <div className="container">
            <Login />
        </div>
      );
    }
  }
}

export default observer(App);
