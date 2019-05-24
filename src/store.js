import {createStore} from "redux";  // importing createStore from redux 

const initialState = {
    currentValue: 0,
    futureValues: [], 
    previousValues: []
}; // setting the initial state with the value of the property counter the futureValues, and the previousValues. 

export const INCREMENT = "INCREMENT"; // creating and exporting the action types
export const DECREMENT = "DECREMENT"; 
export const UNDO = "UNDO"; 
export const REDO = "REDO"; 



function counter( state = initialState, action) {   // Update the reducer to process these actions into state changes.INCREMENT should increment currentValue by the given amount. DECREMENT should decrement currentValue by the given amount.
    switch(action.type) {
        case INCREMENT: 
            return {
                currentValue: state.currentValue + action.amount,
                futureValues: [],
                previousValues: [state.currentValue, ...state.previousValues] 
            }; 
        case DECREMENT: 
            return {
                currentValue: state.currentValue - action.amount,
                futureValues: [],
                previousValues: [state.currentValue, ...state.previousValues] // shows the current value and the previous ones 
            };
        case UNDO: 
            return {
                currentValue: state.previousValues[0], // shows the current value which would be the previous Value at an index of 0 
                futureValues: [state.currentValue, ...state.futureValues], // shows the current value and the future ones 
                previousValues: state.previousValues.slice(1) // see slice explanation below 
            }; 
        case REDO:
            return {
                currentValue: state.futureValues[0],  // shows the current value which would be the future value at an index of 0 
                futureValues: state.futureValues.slice(1), // shows the values after the current value as slice will show the element you start on, which is an index of 1, and give all those after if you don't give it a stop point. (same above)
                previousValues: [state.currentValue,...state.previousValues] // shows the current value and the previous ones 
            }; 
        default: 
            return state; 
    }
}



// function counter( state = initialState, action) { // simple reducer set up 
//     return state; 
// }

export default createStore(counter);    // creating and exporting the store 