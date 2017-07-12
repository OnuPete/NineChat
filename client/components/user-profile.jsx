'use strict';

import React, { Component } from 'react'

const UserProfile = (props) => {
    return (
        <div id="user-profile">
            <img className="user-pic" src={props.currentChat.photo}></img>
            <div id="user-name">{props.currentChat.name}</div>
            <div id="user-age">{props.currentChat.age}</div>
            <div id="user-gender">{props.currentChat.gender}</div>
            <div id="user-location">{props.currentChat.location}</div>
        </div>
    );
}

export default UserProfile;
