import filtersReducer from './filters'
import cardsReducer from './cards'

import { combineReducers } from 'redux';

const rootReducer=combineReducers({
filters:filtersReducer ,
cards:cardsReducer
})
export default rootReducer;