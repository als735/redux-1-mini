import React, { Component } from 'react';
import store, {INCREMENT, DECREMENT, REDO, UNDO} from "./store.js";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: store.getState()  // setting up state for the counter, using the getState method to copy the redux state to the store property
    };
  }

componentDidMount() {   // using the Redux subscribe method to update local state// the subscribe method uses getState to update 
  store.subscribe(() => {
    this.setState({
      store: store.getState()
    });
  }); 
}

increment(amount) { // have the parameter amount, is using the dispatch method to send an action back to the reducer // it uses the action type, and the amount from the param // 
  store.dispatch({amount, type: INCREMENT}); 
}
decrement(amount) {
  store.dispatch({amount, type: DECREMENT}); 
}

undo(amount){
  store.dispatch({amount, type: UNDO}); 
}

redo(amount){
  store.dispatch({amount, type: REDO}); 
}

  render() {
    const {
      currentValue, 
      previousValues, 
      futureValues
    } = this.state.store; // destructuring the current value from state in the render method (previous and future values too)

    return (
      <div className="app">
        <section className="counter">
          <h1 className="counter__current-value">{currentValue}</h1>
          <div className="counter__button-wrapper">
            <button   // .counter_button buttons to call increment or decrement with the correct amount in the onclicks below 
              className="counter__button" onClick={() => this.increment(1)}>
              +1
            </button>
            <button
              className="counter__button" onClick={() => this.increment(5)}>
              +5
            </button>
            <button
              className="counter__button" onClick={() => this.decrement(1)}> 
              -1
            </button>
            <button
              className="counter__button" onClick={() => this.decrement(5)}>
              -5
            </button>
            <br />
            <button
              className="counter__button"
              disabled={previousValues.length === 0}
              onClick={this.undo}
            >
              Undo
            </button>
            <button
              className="counter__button"
              disabled={futureValues.length === 0} //updating the disabled attributes to use the previous/future values 
              onClick={this.redo}  // passing in the redo method to onclick 
            >
              Redo
            </button>
          </div>
        </section>
        <section className="state">
          <pre>{JSON.stringify(this.state.store, null, 2)}</pre> 
        </section>
      </div>  // the JSON stringify above was adjusted to show the store property on state. 
    );
  }
}

export default Counter;
