import React, { Component } from 'react';
import marked from 'marked';
import {button} from 'react-bootstrap'
const token = ''

export default class Editor extends Component {
    state = { 
        default_text : "Hello, input some *markdown*!\n"+
        "~~cross out~~ \n"+
        "# Header\n"+  
        "a list \n"+
        "- item1 \n"+
        "- item2  \n\n"+
        "[This is a link](www.google.com)\n",
        articles:[],
        error:null,
        isLoaded:false,
     }
     handle_change = (e) => this.setState({default_text:e.target.value})
     output_text=() =>({__html: marked(this.state.default_text)})    
     componentDidMount() {
        fetch('http://127.0.0.1:8000/articles/',{
            method:'GET',
            headers:{
                'Authorization': 'Token '+token
            },
        })
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                articles: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    render() { 
        const { error, isLoaded, articles } = this.state;
        const STYLE={
          inlineBlock:{display: "inline-block"},
        }
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
        return (
        <div>
        <h3>Input</h3>
        <textarea
          id="markdown-content"
          onChange={this.handle_change}
          defaultValue={this.state.default_text}
          rows="22"
          cols="50"
        />
        <h3>Output</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.output_text()}
        /> 
                 <h3>API data</h3>
        <ul>
          {articles.map(article => (
            <li key={article.id}>
              <a href=""> {article.title} </a> by {article.author}
            </li>
          ))}
        </ul>
        </div>
        
        )
    }
}
}