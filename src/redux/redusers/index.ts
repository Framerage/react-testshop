import filtersReducer from './filters'
import cardsReducer from './cards'
import descripReducer from './descripPage'

import { combineReducers } from 'redux';

const rootReducer=combineReducers({
filters:filtersReducer ,
cards:cardsReducer,
descripPage:descripReducer,
})
export default rootReducer;