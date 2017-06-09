import React, { Component } from 'react';
import { connect } from 'react-redux';
import {constructComment, writeComment} from './../store/actions'
import CommentTextfield from './CommentTextfield';
import Img from 'react-image';
import Portrait from 'material-ui/svg-icons/image/portrait';

const getFromDB = (user_id) => {
  return "placeholder"
}

const getUserAvatar = (acc_ref) => {
  if(acc_ref != 0)
    return getFromDB(acc_ref)
  else
    return <Portrait />
}

const mapStateToProps = (state) => {
  return {
    currUser:getUserAvatar(state.currSession.acc_ref),
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

const CommentTextfieldLoader = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentTextfield);

export default CommentTextfieldLoader;
