import { createStore } from "redux";
import rootReducer from "./redusers";


const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.store=store;
export default store;