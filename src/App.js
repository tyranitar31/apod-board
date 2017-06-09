import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {darkWhite, lightWhite, grey200, grey400, grey900} from 'material-ui/styles/colors';

import Root from './others/Root';
import configStore from './store/configStore';

//import './App.css';

// const mui = getMuiTheme({
//   palette: {
//     primary1Color: grey400
//   }
// });

class App extends Component {

  render() {
    return(
      <Provider store={configStore()}>
        <MuiThemeProvider>
          <Root className="App" history={browserHistory}/>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
