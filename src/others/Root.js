import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Redirect, BrowserRouter } from 'react-router-dom';

import {darkWhite, lightWhite, grey400} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LinearProgress from 'material-ui/LinearProgress';

import LoginComponentLoader from '../components/LoginComponentLoader'
import {initSession} from '../store/actions';
import logo from '../others/logo.svg';
import routes from '../routes';
//import Start from '../components/Start';

class Root extends Component {

  constructor(props){
    super(props);
    this.state = {
      mui:getMuiTheme()
    };
  }

  componentWillMount(){
    console.log("Root will mount");
  }

  componentDidMount(){
    this.props.setSess();
  }

  render() {
    console.log("Root not ready",this.props);
    return (this.props.logged === undefined)?<LinearProgress mode="indeterminate"/>:<Paper>
      <AppBar
        showMenuIconButton={false}
        title={this.props.comp}
        style={{position:"fixed", top:0}}
        iconElementRight={<LoginComponentLoader />}
      />
      {console.log("Root")}
        <Paper zDepth={5}
          style={{
            minHeight:"100vh",
            marginTop:"65px",
            backgroundColor:grey400,
            paddingTop:"3%",
            paddingBottom:"5%",
            width:"100%"
          }}
        >
          <BrowserRouter history={this.props.history}>
            {routes}
          </BrowserRouter>
        </Paper>
        <Paper className="App-footer">
          <h3>Powered by React JS</h3>
          {/*<img src={logo} className="React-logo" alt="logo" />*/}
        </Paper>
      </Paper>;
  }
}

const mapStateToProps = (state) => {
  return {
    comp:state.currSession.Comp,
    logged:state.currSession.logged
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSess: () => {
      dispatch(initSession());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
