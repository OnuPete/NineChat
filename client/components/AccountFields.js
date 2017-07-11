import React, { Component } from 'react';


class AccountFields extends Component {
//   nextSteps (e) {
//     e.preventDefault()
// let self = this;
//     // Get values via this.refs
//     const data = {
//       name     : self.refs.name.getDOMNode().value,
//       password : self.refs.password.getDOMNode().value,
//       email    : self.refs.email.getDOMNode().value,
//     }

//     console.log(data.name)

//     this.props.nextStep()
//   }

//  render () {
//     return (
//       <div>
//         <h2>Account Details</h2>
//         <ul>
//           <li>
//             <label>Name</label>
//             <input type="text" ref="name"  />
//           </li>
//           <li>
//             <label>Password</label>
//             <input type="password" ref="password"  />
//           </li>
//           <li>
//             <label>Email</label>
//             <input type="email" ref="email"  />
//           </li>
//           <li >
//             <button  onClick={this.nextSteps}>Save and Continue</button>
//           </li>
//         </ul>
//       </div>
//     )
//   }



  saveAndContinue (e) {
    e.preventDefault()

    
    const data = {
      'name': this.name.value,
      'password': this.password.value,
      'email': this.email.value,
    }




    // this.setState({
    //   'name': this.name.value,
    //   'password': this.password.value
    // })
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