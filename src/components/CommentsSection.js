import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {List, ListItem} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import Divider from 'material-ui/Divider';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Favorite from 'material-ui/svg-icons/action/favorite';
//import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import CommenTextfieldLoader from './CommentTextfieldLoader';

export default class CommentsSection extends Component {

  renderAvatar = () => {
    if(this.props.apod.media_type === "image")
      return <Avatar src={this.props.apod.url} />;
    return <Avatar color="lightGrey">Vid</Avatar>;
  }

  onCloseClick = () => {
    this.props.toggleComments();
  }

  renderTitleCard = () => {
    return <Toolbar
      style={{height:"65px"}}
    >
      <ToolbarGroup
        firstChild
      >
        <CardHeader
          title={this.props.apod.title}
          avatar={this.renderAvatar()}
          subtitle={this.props.apod.date}
        />
      </ToolbarGroup>
      <ToolbarGroup
        lastChild={true}
      >
        <Badge
          badgeContent={this.props.currAPOD.votes.total}
          primary={true}
        >
          <Favorite color="pink" />
        </Badge>
        <ToolbarSeparator />
        <IconButton
          touch
          tooltipPosition="top-center"
          tooltip="Close"
          onTouchTap={this.onCloseClick}
        >
          <Close />
        </IconButton>
      </ToolbarGroup>
    </Toolbar>;
  }

  render(){
    console.log("Comment render");
    return <Dialog
      title={this.renderTitleCard()}
      titleStyle={{lineHeight:"20px"}}
      open={this.props.openDialog}
      autoScrollBodyContent
      autoDetectWindowHeight
    >
      <List>
        {console.log("list",this.props.list)}
        {this.props.list}
        <Divider
          style={{marginTop:"5vh", marginBottom:"2vh"}}
        />
        <CommenTextfieldLoader title="Write Comment" />
      </List>
    </Dialog>;
  }
}
