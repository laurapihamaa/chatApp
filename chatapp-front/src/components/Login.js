import React from "react";
import { Redirect } from "react-router";
import './style.css'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        authenticate: false,
        wsocket:null
    };
  }

  addUser = e => {
      if(this.state.username === ""){
         alert("Please insert a username")
          
      } else{
      this.setState({
          authenticate: true
      })}

  }

  handleInputChange = e =>{
    this.setState({
        username: e.target.value
      });
  }
  render() {
      if(this.state.authenticate){
        console.log(this.state.username)
        return(
        <Redirect
        to={{
            pathname: "/chat",
            state:{username: this.state.username}
        }}
        />
        
        )
      }
    return ( 
      <div className="login">
        <h1 className="login-header">Login</h1>
        <p>Insert your name and press submit</p>
        <form onSubmit={this.addUser}>
            <p className = "form">
            <input className="input-field" onChange={this.handleInputChange}
                    value = {this.state.username}/>
            <button className="button" type="submit">Submit</button>
            </p>
        </form>
      </div>
    );
  }
}
export default Login;