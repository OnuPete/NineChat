//import things here
import React, { Component } from 'react';

import Login from './Login';
import AccountFields from './AccountFields';
import Confirmation from './Confirmation';
import Success from './Success';

// const socket = new WebSocket('ws://ec2-34-212-61-95.us-west-2.compute.amazonaws.com:3000/');

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = this.getInitialState()
    this.state = {
			step: 1,
      name : null,
      password : null,
      email: null,
      age: null,
      gender: null,
      location: null,
      photo: null
    };
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.jumpToChat = this.jumpToChat.bind(this);
    this.saveValues = this.saveValues.bind(this);
  }

saveValues (data) {
  this.setState({
    'name': data.name,
    'password': data.password,
    'email': data.email,
    'age': data.age,
    'gender': data.gender,
    'location': data.location,
    'photo': data.photo
  });
}


nextStep () {
  this.setState({
    step : this.state.step + 1
  })
}

previousStep () {
  this.setState({
    step : this.state.step - 2
  })
}

jumpToChat () {
  this.setState({
    step : this.state.step + 3
  })
}

  render() {
    switch (this.state.step) {
          case 1:
            return <Login         nextStep={this.nextStep}
                                  saveValues={this.saveValues}
                                  jumpToChat={this.jumpToChat} />
          case 2:
            return <AccountFields nextStep={this.nextStep}
                                  saveValues={this.saveValues} />
          case 3:
            return <Confirmation  previousStep={this.previousStep}
                                  submitRegistration={this.submitRegistration}
                                  nextStep={this.nextStep}
                                  saveValues={this.saveValues}
                                  currentState={this.state}
                                  saveValues={this.saveValues}/>
          case 4:
            console.log(this.state.photo);
            return <Success       currentState={this.state} />
        }

  }
}

export default App;
