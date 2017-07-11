import React, { Component } from 'react';
import Chatbox from './chatbox';
import Topbar from './topbar';
import Bottombar from './bottombar';
import Userlist from './user-list.jsx';
import UserProfile from './user-profile.jsx';


class Success extends Component {
  constructor(props) {
    super(props);
    this.state = { stateForConfirmation: this.props.currentState }
  }

  render() {
      
    const friendsList = this.props.state.friendsList.slice('');
    const list = this.props.state.friendsList.map((friend, i) => (
      <Userlist key = {i} userClick = {()=> this.props.userClick(i)} user = {i} username = {friend.username} name = {friend.name} photo = {friend.photo} />
    ));
    return (

          <div id = "main">
            <div id = "chat">
              <Topbar/>

                <Chatbox messages = {this.props.state.messages}/>


              <Bottombar handleChange = {(event)=>this.props.handleChange(event)} sendClick = {()=> this.props.sendClick()} handleKeyPress={(event)=>this.props.handleKeyPress(event)} value = {this.props.state.text}/>
            </div>

            <div id = "users">
              <UserProfile currentChat = {this.props.state.currentChat} />
              <h3>Friends</h3>
              <div className='user-list'>
                <ul>
                  {this.propslist}
                </ul>
                <ul>
                  {this.state.stateForConfirmation.name}
                </ul>
              </div>
            </div>
          </div>
          )

  }

}

export default Success












