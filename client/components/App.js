//import things here
import React, { Component } from 'react';
import Chatbox from './chatbox';
import Topbar from './topbar';
import Bottombar from './bottombar';
import Userlist from './user-list.jsx';
import UserProfile from './user-profile.jsx';

import Login from './Login';
import AccountFields from './AccountFields';
import SurveyFields from './SurveyFields';
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
    //return data from socket.onconnect here, with the return statement below inside the callback for that. this will hold off on populating ANYTHING until that data comes through.
    //connect ajax to this?
      messages: [],
      friendsList: [{username: 'JanelleCS', name: 'Janelle', photo: 'http://images.wisegeek.com/potatoes-against-white-background.jpg'},{username: 'JeffreyCS', name:'Heffe', photo: 'http://www.hdwallpapers.in/walls/purple_flower_4k-wide.jpg'}],
      currentChat: {username: '', name:'', photo: ''},
      text: '',
      me: {username: 'GarrettCS', name:'Garrett', photo: 'test'}
      }
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.jumpToChat = this.jumpToChat.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.userClick = this.userClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.sendClick = this.sendClick.bind(this)
    this.saveValues = this.saveValues.bind(this)
  }

  componentDidMount(){
    // before executing the set state below, componentDidMount needs to reach out to
    // server via our websocket and pull down the list of messages between user and user[0].
    const HOST = location.origin.replace(/^http/, 'ws')
    this.ws = new WebSocket(HOST);
    console.log('did mount');
    const thisApp = this;
    console.log(this);
    this.ws.onopen = (event) => {
      thisApp.updateMessages();
    }
  }

  updateMessages() {
    const currchat = this.state.friendsList[0];
    this.ws.onmessage = (event) =>{
      console.log(event);
      let msgs = JSON.parse(event.data);
      msgs = Array.isArray(msgs) ? msgs.reverse() : msgs;
      const oldmsgs = this.state.messages.slice();
      msgs = oldmsgs.concat(msgs);
      document.cookie = "username=" + this.state.me.username;
      document.cookie = "chatBro=" + currchat.username;
      this.setState({
        currentChat: currchat,
        messages: msgs
      });
    }
  }

  // getInitialState() {

  //   return {
	// 		step: 1,
  //     name : null,
  //     password : null,
  //   //return data from socket.onconnect here, with the return statement below inside the callback for that. this will hold off on populating ANYTHING until that data comes through.
  //   //connect ajax to this?
  //     messages: [],
  //     friendsList: [{username: 'JanelleCS', name: 'Janelle', photo: 'http://images.wisegeek.com/potatoes-against-white-background.jpg'},{username: 'JeffreyCS', name:'Heffe', photo: 'http://www.hdwallpapers.in/walls/purple_flower_4k-wide.jpg'}],
  //     currentChat: {username: '', name:'', photo: ''},
  //     text: '',
  //     me: {username: 'GarrettCS', name:'Garrett', photo: 'test'}
  //     }


	// 	}





saveValues (data) {
    // Remember, `fieldValues` is set at the top of this file, we are simply appending
    // to and overriding keys in `fieldValues` with the `fields` with Object.assign
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  //   fieldValues = Object.assign({}, fieldValues, fields)
  // }()
      this.setState({
      'name': data.name,
      'password': data.password,
      'email': data.email
    })
}

nextStep () {
  this.setState({
    step : this.state.step + 1
  })
}

// Same as nextStep, but decrementing
previousStep () {
  this.setState({
    step : this.state.step - 1
  })
}

jumpToChat () {
  this.setState({
    step : this.state.step + 3
  })
}



  sendClick(event) {
      // message is sent to server via web socket,
      // message comes back as confirmed to client
      // client pushes it to messages array (SETS STATE)
      // react rerenders
      //textbox value is reset to null
      let aMessage = {
        src: this.state.me.username,
        dst: this.state.currentChat.username,
        content: this.state.text,
      }
      this.ws.send(JSON.stringify(aMessage));
      this.setState({text: ''});
  }

  handleKeyPress(event) {
    if (event.key === 'Enter'){
      event.preventDefault();
      let aMessage = {
        src: this.state.me.username,
        dst: this.state.currentChat.username,
        content: this.state.text,
      }
      this.ws.send(JSON.stringify(aMessage));
      this.setState({text: ''});
    }
  }

  userClick(user) {
    // update messages to reflect current user, this will require a pull from server
    // to server: send my ID, friendsID, should recieve back messages between me and friend, update state.messages to reflect the new messages.
    const chatter = this.state.friendsList[user];
    document.cookie = "chatBro=" + chatter.username;
    this.setState({
      currentChat : chatter
    });
  }

  handleChange(event){
    this.setState({text: event.target.value});
  }

  render() {


    
    switch (this.state.step) {
          case 1:
            return <Login         nextStep={this.nextStep}
                                  saveValues={this.saveValues}
                                  confirmation={this.confirmation} 
                                  jumpToChat={this.jumpToChat}/>
          case 2:
            return <AccountFields nextStep={this.nextStep} 
                                  state = {this.state}
                                  saveValues={this.saveValues}/>
          case 3:
            return <Confirmation  previousStep={this.previousStep}
                                  submitRegistration={this.submitRegistration} 
                                  nextStep={this.nextStep} 
                                  state = {this.state}
                                  saveValues={this.saveValues}
                                  currentState = {this.state}/>
          case 4:
            return <Success       handleChange={this.handleChange}
                                  userClick={this.userClick} 
                                  handleKeyPress={this.handleKeyPress}
                                  sendClick={this.sendClick}
                                  state = {this.state}
                                  saveValues={this.saveValues}
                                  currentState = {this.state}/>
        }

  }
}

export default App;
