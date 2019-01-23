import Auth_bar from "./auth_bar";
import Editor from "./editor";
import React, {Component} from 'react';
//<Editor/>
export default class Wrapper extends Component{
    render(){
        return (<div className = "wrapper">
        <Auth_bar/>
        <Editor/>
        </div>
        )
    };
}