import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initAPOD, initReqBuffer, setTitle, saveToArchive, setVote } from '../store/actions';
//import Start from './Start';
import APOD from './APOD';
//import '../App.css';

// class APODLoader extends Component {
//
//   // revTime(evt){
//   //   console.log("change");
//   //   var val = evt.target.value;
//   //   if(this.state.picDate !== val)
//   //   this.setState({
//   //     picDate:val
//   //   });
//   // }
//
//   // setPicDate(evt){
//   //   evt.preventDefault();
//   //   this.getAPOD();
//   // }
// }

const mapStateToProps = (state) => {
  var APOD = getAPOD(state);
  return {
    stash:state.jsonStash,
    today:state.currSession.today,
    currAPOD:state.currAPOD,
    apod:APOD,
    archive:state.archives,
    

  };
}

const getAPOD = (state) => {
  // console.log(state.jsonStash);
  return state.jsonStash[state.currAPOD.APOD_ref];
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch:(date,today,instash,inArchive) => {
      dispatch(initAPOD(date,today,instash,inArchive));
    },
    setTitle:(title) => {
      dispatch(setTitle(title));
    },
    unloadAPOD:(archive, APOD, date) => {
      dispatch(saveToArchive(date, APOD, archive));
    }
  };
}

const APODLoader =  connect(
  mapStateToProps,
  mapDispatchToProps
)(APOD);

export default APODLoader;
