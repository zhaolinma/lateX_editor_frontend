import React, {Component} from 'react';
import { Button,Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Registration from './registration';
import "./css/auth_bar.css";

const address = "http://127.0.0.1:8000/"
export default class Auth_bar extends Component{
    state={
        username:"",
        password:"",
        is_authenticated:false,
        regis:false,
        token:"",
        error:null,
    };
    validator=() => this.state.username.length>0 && this.state.password.length>0;
    change_handler=event => {this.setState({[event.target.id]:event.target.value})}
    submit_handler=(postfix,event) =>{
        event.preventDefault();
        var auth_payload={
            username:this.state.username,
            password:this.state.password,
        }
        var header={"Content-Type": "application/json",}
        if (postfix==='logout/') {
            header.Authorization = "Token "+window.localStorage.getItem('Auth-bar-token')
        }
        fetch(address+"rest-auth/"+postfix, {
        method: "POST",
        headers:header,
        body:  JSON.stringify(auth_payload)})
        .then(res => res.json())
        .then(
    (result) => {
        if (postfix === 'login/') {
      this.setState({
        is_authenticated: true,
        token: result.key,
        error: result.non_field_errors
      }
      );
      window.localStorage.setItem('Auth-bar-token',this.state.token)
    }
      else if (postfix === 'logout/') {
        this.setState({
            username:"",
            password:"",
            is_authenticated:false,
            token:"",
            error:null,
            regis:false,
          }
          ); }
    },
  )
    }
    submit_handler_login=event=> this.submit_handler('login/',event)
    submit_handler_logout=event=> this.submit_handler('logout/',event)
    regis_handler=()=> this.setState({regis:true})
    render(){
        const {error,is_authenticated,regis} = this.state;
        if (error){return <div>Error: {error[0]}</div>}
        else if (is_authenticated){return (<div>
            <Button onClick={this.submit_handler_logout}>
            Logout
          </Button>
            </div>)}
        else if (regis){return <Registration />}
        else{
        return(
        <div className="login">
        <Form inline onSubmit={this.submit_handler_login}>
        <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.change_handler}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.change_handler}
              type="password"
            />
          </FormGroup>
          <Button
            bsSize="large"
            disabled={!this.validator()}
            type="submit"
          >
            Login
          </Button>
        <Button
        bsSize="large"
        type="button"
        onClick={() =>this.regis_handler()}
        >
        Registration
        </Button>
        </Form>
        </div>
            )
        }
    }
}


