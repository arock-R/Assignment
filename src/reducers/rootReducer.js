import { combineReducers } from 'redux'
import { userState } from './userReducer'
import { profilesState } from './profilesReducer'

export const rootReducer = combineReducers({userState, profilesState})