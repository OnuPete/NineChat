'use strict';

import React, { Component } from 'react'

const UserProfile = (props) => {
    return (
        <div id="user-profile">
            <img className="user-pic" src={props.currentChat.photo}></img>
            <div id="user-name">Name: {props.currentChat.name}</div>
            <div id="user-age">Age: {props.currentChat.age}</div>
            <div id="user-gender">Gender: {props.currentChat.gender}</div>
            <div id="user-location">Location: {props.currentChat.location}</div>
        </div>
    );
}

export default UserProfile;
