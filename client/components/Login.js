import React, { Component } from 'react';

class Login extends Component {

  confirmation (e) {
    e.preventDefault()

    const data = {
      'name': this.loginName.value,
      'password': this.loginPassword.value,
    }

    this.props.saveValues(data)
    // $.ajax({
    //   type: 'GET',
    //   url: 'http://localhost:3000/confirmUser',
    //   data: data
    // })
    // .done()
    // .fail(function(err) {
    //   console.log('failed to register');
    // });
    
    this.props.jumpToChat()
  }

    render() {
    return ( 
      <div>  

        <form onSubmit={this.confirmation.bind(this)} >
          <label>
            Name:
          <input type="text" ref = {node => this.loginName = node}/>
          </label>
          <br />
          <br />
          <label>
            Password:
          <input type="text" ref = {node => this.loginPassword = node}/>
          </label>
          <br />
          <br />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
        
        <button onClick={ this.props.nextStep }>Create New User</button>

      </div>
    )

  }

}

export default Login