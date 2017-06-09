import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import mainReducer from './reducers';
//import DevTools from '../containers/DevTools';

export default function configStore(){

    return createStore(
      mainReducer,
      applyMiddleware(thunkMiddleware)
    );
}
