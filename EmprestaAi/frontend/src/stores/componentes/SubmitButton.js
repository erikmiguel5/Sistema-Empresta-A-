import React from 'react';
import './Button.css'


class SubmitButton extends React.Component {
  render(){
    return (
      <div className="submitButton">
        <button
          className='btn'
          disabled={this.props.disabled}
          onClick={ () => this.props.onClick() }
        >
          <span>
          { this.props.text }
          </span>
        </button>
      </div>
    );
  }
}

export default SubmitButton;
