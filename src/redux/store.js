import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./redusers";
import thunk from "redux-thunk";

const composeEnhancers =  compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

window.store = store;
export default store;
