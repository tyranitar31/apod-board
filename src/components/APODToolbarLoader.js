import React, { Component } from 'react';
import { connect } from 'react-redux';
import APODToolbar from './APODToolbar';
import {onVote} from './../store/actions';

const mapStateToProps = (state) => {
  console.log("Map state Toolbar ",state);
  return {
    votes:state.currAPOD.votes,
    comments:state.currAPOD.comments.container
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onVote:(curr,voted) => {
      console.log("Up voting from curr",curr);
      dispatch(onVote(curr,voted));
    }
  };
}

const APODToolbarLoader = connect(
  mapStateToProps,
  mapDispatchToProps
)(APODToolbar);

export default APODToolbarLoader;
