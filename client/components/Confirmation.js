import React, { Component } from 'react';

class Confirmation extends Component {
    constructor(props) {
    super(props);
    this.state = { stateForConfirmation: this.props.currentState }
  }

submitRegistration (event) {
  event.preventDefault();
    const data = {
      'name': this.state.stateForConfirmation.name,
      'password': this.state.stateForConfirmation.password,
      'email': this.state.stateForConfirmation.email,
    }
    console.log('data.name',data.name)

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/createUser',
      data: data
    })
    .done()
    .fail(function(err) {
      console.log('failed to register');
    });

    this.props.nextStep()
    
}

  render (){
    return (
      <div>

        <form onSubmit={this.submitRegistration.bind(this)}>
        <h2>Confirm Registration</h2>
        <ul>
          <li><b>Name:</b> {this.state.stateForConfirmation.name}</li>
        </ul>
        <ul>
          <li><b>Email:</b> {this.state.stateForConfirmation.email}</li>
        </ul>
            <input type="submit" value="Submit" />
        </form>

      <button onClick={this.props.previousStep}>Back to Login</button>
        
      </div>
    )
  }

}

export default Confirmation





