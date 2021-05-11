import Rect, {Component} from 'react'
import UserStore from '../UserStore'
import InputField from './InputField'
import SubmitButton from './SubmitButton'


class Home extends Rect.Component{

    render(){
        return(    
            <div className='container'>
                Welcome { UserStore.username }

                <SubmitButton 
                text={'Logout'}
                disabled={false}
                onClick={ () => this.doLogout() }
                />
            </div>)
    }
}

export default Home