import React, { Component } from 'react';
import { connect } from 'react-redux';

import {signupReq,saveUserInfo} from '../store/actions'
import LoginComponent from './LoginComponent';

const mapStateToProps = state => {
  return {
    logged:state.currSession.logged
  };
}

const mapDispatchToProps = dispatch => {
  return {
    submitSignup:(email,pass,fname,lname) => {
      dispatch(signupReq(email,pass,fname,lname));
    },
    submitUserInfo:(uid,fname,lname) => {
      dispatch(saveUserInfo(uid,fname,lname));
    }
  };
}

const LoginComponentLoader = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export default LoginComponentLoader;
