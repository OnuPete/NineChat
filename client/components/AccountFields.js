import React, { Component } from 'react';


class AccountFields extends Component {

  saveAndContinue (e) {
    e.preventDefault()

    
    const data = {
      'name': this.name.value,
      'password': this.password.value,
      'email': this.email.value,
    }

    this.props.saveValues(data)

    this.props.nextStep()
  }

    render() {
    return ( 
    
      <div>  

        <form onSubmit={this.saveAndContinue.bind(this)} >
          <label>
            Name:
          <input type="text" ref = {node => this.name = node}/>
          </label>
          <br />
          <br />
          <label>
            Password:
          <input type="text" ref = {node => this.password = node}/>
          </label>
          <br />
          <br />
          <label>
          Email:
          <input type="text" ref = {node => this.email = node}/>
          </label>
          <br />
          <br />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>

      </div>
    
    )
  }

}


export default AccountFields