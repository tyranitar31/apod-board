import React, { Component } from 'react';
import { connect } from 'react-redux';
import {constructComment, writeComment} from '../../store/actions'
import PopupTextField from './PopupTextField';


const mapStateToProps = (state) => {
  return {
    currUser:state.currSession.acc_ref,
    comm_buffer:state.currAPOD.comments.comm_buff
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit:(name, comment) => {
      dispatch(constructComment(name, comment));
    },
    buffer:(buffer) => {
      dispatch(writeComment(buffer));
    }
  };
}

const PopupTextFieldLoader = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupTextField);

export default PopupTextFieldLoader;
