'use strict';

import React, { Component } from 'react'


const UserList = (props) => {
    return (
      <li onClick={props.userClick}><img src={props.photo} className="user-pic" />
        {props.name}
       </li>
    );
}



export default UserList;
