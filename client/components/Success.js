//import things here
import React, { Component } from 'react';
import Chatbox from './chatbox';
import Topbar from './topbar';
import Bottombar from './bottombar';
import Userlist from './user-list.jsx';
import UserProfile from './user-profile.jsx';

// const socket = new WebSocket('ws://ec2-34-212-61-95.us-west-2.compute.amazonaws.com:3000/');

class Success extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState()
  }

  getInitialState() {
    //return data from socket.onconnect here, with the return statement below inside the callback for that. this will hold off on populating ANYTHING until that data comes through.
    //connect ajax to this?
    console.log(this.props.currentState);
    return {
      messages: [],
      friendsList: [],
      currentChat: {
        name:this.props.currentState.name,
        age:this.props.currentState.age,
        gender: this.props.currentState.gender,
        location: this.props.currentState.location,
        photo: this.props.currentState.photo
      },
      text: '',
      me: {name:this.props.currentState.name, photo: this.props.currentState.photo},
      stateForConfirmation: this.props.currentState
    }
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
      this.sendStart();
    }
  }

  sendStart() {
    this.ws.send(JSON.stringify({
      event: 'start'
    }))
  }

  updateMessages() {
    this.ws.onmessage = (event) =>{
      console.log(event);
      let msgs = JSON.parse(event.data);
      msgs = Array.isArray(msgs) ? msgs.reverse() : msgs;
      const oldmsgs = this.state.messages.slice();
      msgs = oldmsgs.concat(msgs);
      this.setState({
        messages: msgs
      });
    }
  }

  getUsers() {
    this.ws.sendmessage
  }

  sendClick(event) {
      // message is sent to server via web socket,
      // message comes back as confirmed to client
      // client pushes it to messages array (SETS STATE)
      // react rerenders
      //textbox value is reset to null
      let aMessage = {
        src: this.state.stateForConfirmation.name,
        content: this.state.text,
      }
      this.ws.send(JSON.stringify(aMessage));
      this.setState({text: ''});
  }

  handleKeyPress(event) {
    if (event.key === 'Enter'){
      event.preventDefault();
      let aMessage = {
        src: this.state.stateForConfirmation.name,
        content: this.state.text,
      }
      this.ws.send(JSON.stringify(aMessage));
      this.setState({text: ''});
    }
  }


  handleChange(event){
    this.setState({text: event.target.value});
  }

  render() {
    const friendsList = this.state.friendsList.slice('');
    const list = this.state.friendsList.map((friend, i) => (
      <Userlist key = {i} userClick = {()=> this.userClick(i)} user = {i} username = {friend.username} name = {friend.name} photo = {friend.photo} />
    ));
    return (
          <div id = "main">
            <div id = "chat">
              <Topbar />

              <Chatbox messages={this.state.messages}/>

              <Bottombar handleChange={(event) => this.handleChange(event)}
                         sendClick={() => this.sendClick()}
                         handleKeyPress={(event) => this.handleKeyPress(event)}
                         value={this.state.text} />
            </div>

            <div id = "users">
              <UserProfile currentChat={this.state.currentChat} />
              <h3>Friends</h3>
              <div className='user-list'>
                <ul>
                  {list}
                </ul>
              </div>
            </div>
          </div>
          )
  }
}

export default Success;
