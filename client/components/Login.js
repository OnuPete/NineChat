import React, { Component } from 'react';

class Login extends Component {

  

    render() {
    return ( 
      <div>  

        <form onSubmit={this.props.confirmation} >
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