import React, { Component } from 'react';
import plinks from './profileLinks';


class AccountFields extends Component {

  saveAndContinue (e) {
    e.preventDefault();
    const link = Math.floor(Math.random() * plinks.length);

    const data = {
      'name': this.name.value,
      'password': this.password.value,
      'email': this.email.value,
      'age': this.age.value,
      'gender': this.gender.value,
      'location': this.location.value,
      'photo': plinks[link]
    };

    this.props.saveValues(data);

    this.props.nextStep();
  }

    render() {
    return (

      <div>

        <form onSubmit={this.saveAndContinue.bind(this)} >
          <label>Name: <input type="text" ref={node => this.name = node}/></label>
          <label>Password: <input type="text" ref={node => this.password = node}/></label>
          <label>Email: <input type="text" ref={node => this.email = node}/></label>
          <label>Age: <input type="text" ref={node => this.age = node}/></label>
          <label>Gender: <input type="text" ref={node => this.gender = node}/></label>
          <label>Location: <input type="text" ref={node => this.location = node}/></label>
          <input type="submit" value="Submit" />
        </form>

      </div>
    );
  }

}


export default AccountFields
