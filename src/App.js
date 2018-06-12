import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GraphiQL from 'graphiql'
import fetch from 'isomorphic-fetch'
import 'graphiql/graphiql.css'


function graphQLFetcher(graphQLParams) {
  return fetch(undefined, {
    method: 'post',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json())
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input type="text" className="App-url" name="url" />
          <input type="text" className="App-api-key" name="apiKey" />
          <button type="submit" className="App-apply">Apply</button>
        </header>
        <GraphiQL fetcher={graphQLFetcher} />
      </div>
    );
  }
}

export default App;
