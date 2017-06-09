import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentsSection from './CommentsSection';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

const renderList = (container) => {
  return container.map(comm =>
    <Paper
      rounded
      key={comm.key}
    >
      <ListItem
        style={{marginBottom:"1vh"}}
        leftAvatar={<Avatar>{comm.key}</Avatar>}
        primaryText={""+comm.name}
        secondaryText={comm.comment}
      >
      </ListItem>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    list:renderList(state.currAPOD.comments.container)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

const CommentsSectionLoader = connect(
  mapStateToProps
)(CommentsSection);

export default CommentsSectionLoader;
