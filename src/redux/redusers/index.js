import filtersReducer from './filters'
import cardsReducer from './cards'
import cartReducer from './cart'
import { combineReducers } from 'redux';

const rootReducer=combineReducers({
filters:filtersReducer ,
cards:cardsReducer,
cartItems:cartReducer,
})
export default rootReducer;