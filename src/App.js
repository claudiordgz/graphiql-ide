import React, { Component } from 'react'
import './App.css'
import GraphiQL from 'graphiql'
import fetch from 'isomorphic-fetch'
import 'graphiql/graphiql.css'

function getFetcher(url, apiKey) {
  function graphQLFetcher(graphQLParams) {
    return fetch(url, {
      method: 'post',
      headers: { 
        'x-api-key': apiKey,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json())
  }
  return graphQLFetcher
}

const GraphiQLEnv = (props) => {
  if (!props.url || !props.apiKey) {
    return <div class="warn-msg">No URL and API Key set</div>
  }
  return <GraphiQL fetcher={getFetcher(props.url, props.apiKey)} />
}

class App extends Component {
  constructor (props) {
    super(props)
    this.url = ''
    this.apiKey = ''
    this.state = {
      url: '',
      apiKey: ''
    }
  }
  
  handleUrl (ev) {
    this.url = ev.target.value
  }

  handleApiKey (ev) {
    this.apiKey = ev.target.value
  }

  submitButton () {
    this.setState({
      url: this.url,
      apiKey: this.apiKey
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div class="header-item">
            <label className="App-url-label" for="url">GraphQL URL</label>
            <input type="text" className="App-url" name="url" onChange={this.handleUrl.bind(this)} />
          </div>
          <div class="header-item">
            <label className="App-api-key-label" for="apiKey">API KEY</label>
            <input type="text" className="App-api-key" name="apiKey" onChange={this.handleApiKey.bind(this)} />
          </div>
          <button type="submit" className="App-apply" onClick={this.submitButton.bind(this)}>Apply</button>
        </header>
        {GraphiQLEnv(this.state)}
      </div>
    );
  }
}

export default App;
