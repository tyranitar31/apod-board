import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../store/actions';
import Start from './Start';

const mapStateToProps = (state) => {
  return {
    currSession:state.currSession
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTitle:(title) => {
      dispatch(setTitle(title));
    }
  };
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetch:(date,today) => {
//       dispatch(requestData(date,today));
//     }
//   };
// }

const StartLoader =  connect(
  mapStateToProps,
  mapDispatchToProps
)(Start);

export default StartLoader;
