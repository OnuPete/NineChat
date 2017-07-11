import React, { Component } from 'react';

class Confirmation extends Component {
    constructor(props) {
    super(props);
    this.state = { stateForConfirmation: this.props.currentState }
  }

submitRegistration () {
      
    const data = {
      'name': this.stateForConfirmation.name,
      'password': this.stateForConfirmation.password,
      'email': this.stateForConfirmation.email,
    }

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/createUser',
      data: data
    })
    .done()
    .fail(function(err) {
      console.log('failed to register');
    });


}

  render (){
    return (
      <div>

        <h2>Confirm Registration</h2>
        <ul>
          <li><b>Name:</b> {this.state.stateForConfirmation.name}</li>
        </ul>
        <ul>
          <li><b>Email:</b> {this.state.stateForConfirmation.email}</li>
        </ul>
        <ul>
          <li>
            <button onClick={this.props.previousStep}>Back</button>
            <button onClick={this.props.nextStep}>Submit Registration</button>
          </li>
        </ul>
        
      </div>
    )
  }

}

export default Confirmation





