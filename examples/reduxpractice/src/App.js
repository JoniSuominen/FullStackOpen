import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
  }
  return state
}
const store = createStore(counterReducer)


class App extends Component {
  render() {
    return (
      <div>
        <div>
          {store.getState()}
      </div>
      <button onClick={e => store.dispatch({type: 'INCREMENT'})}>
        plus
      </button>
      <button onClick={e => store.dispatch({type: 'DECREMENT'})}>
        minus
      </button>
      <button onClick={e => store.dispatch({ type: 'ZERO' })}>
        zero
      </button>
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

export default App;