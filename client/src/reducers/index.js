import {combineReducers} from 'redux';
import alert from './alert'
import auth from './auth';
import profile from './profile';
import post from './post';
import { reducer as formReducer } from 'redux-form';
import boardReducer from './boardReducer';


export default combineReducers({
    alert,
    auth,
    profile,
    post,
    form: formReducer,
    board: boardReducer,
});