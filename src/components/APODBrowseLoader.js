import React, { Component } from 'react';
import { connect } from 'react-redux';
import APODBrowse from './APODBrowse';
import {setReq, setRef} from '../store/actions';

const mapStateToProps = (state) => {
  console.log("currSession from browse", state.currSession);
  return {
    currSession:state.currSession
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRequest:(val) => {
      dispatch(setReq(val));
    }
  };
}

const APODBrowseLoader = connect(
  mapStateToProps,
  mapDispatchToProps
)(APODBrowse);

export default APODBrowseLoader;
