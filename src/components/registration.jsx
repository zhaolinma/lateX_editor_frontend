import React, {Component} from 'react';
import { Button,Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const address = "http://127.0.0.1:8000/"
export default class Registration extends Component{
    state={
        username:"",
        token:"",
        password1:"",
        password2:"",
        error_password:null,
        error_username:null,
    };
    validator=()=> this.state.password1 === this.state.password2 &&
     this.state.username.length>0 && this.state.password1.length>0
    change_handler=event => {this.setState({
        [event.target.id]:event.target.value})}
    submit_handler=(event) =>{
        event.preventDefault();
        var auth_payload={
            username:this.state.username,
            password1:this.state.password1,
            password2:this.state.password2,
        }
        var header={"Content-Type": "application/json",}
        fetch(address+"rest-auth/registration/", {
        method: "POST",
        headers:header,
        body:  JSON.stringify(auth_payload)})
        .then(res => res.json())
        .then((result) => {
            this.setState({
            token: result.key,
            error_password: result.password1,
            error_username:result.username,
        }
        );
        window.localStorage.setItem('Auth-bar-token',this.state.token)    
        },
        )
    }
    render(){
        const {error_password,error_username,token,username} = this.state;
        if (error_password) {return <div>Error: {error_password}</div>}
        else if (error_username) {return <div>Error: {error_username}</div>}
        else if (token.length>0) {return <div> {username} successfully registered!</div> }
        return(
            <div className="regis">
            <Form inline  onSubmit={this.submit_handler}>
            <FormGroup controlId="username" bsSize="small">
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  autoFocus
                  type="username"
                  value={this.state.username}
                  onChange={this.change_handler}
                />
              </FormGroup>
              <FormGroup controlId="password1" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  value={this.state.password1}
                  onChange={this.change_handler}
                  type="password"
                />
              </FormGroup>
              <FormGroup controlId="password2" bsSize="large">
                <ControlLabel>Repeat Password</ControlLabel>
                <FormControl
                  value={this.state.password2}
                  onChange={this.change_handler}
                  type="password"
                />
              </FormGroup>
              <Button
                bsSize="large"
                disabled={!this.validator()}
                type="submit"
              >
                Register
              </Button>
            </Form>
            </div>
                )
    }
}
