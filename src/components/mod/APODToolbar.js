import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Comment from 'material-ui/svg-icons/communication/comment';
import Badge from 'material-ui/Badge';

export default class APODToolbar extends Component {

  componentWillReceiveProps(nextProps){
    console.log("Toolbar will receive props");
  }

  onVote = () => {
    this.props.onVote(this.props.votes.total, this.props.votes.voted);
  }

  onCommentClick = () => {
    console.log("Comment clicked");
    this.props.toggleComments();
  }

  renderFavButton = () => {
    if(this.props.votes.voted)
      return <Favorite />
    else
      return <FavoriteBorder />
  }

  render() {
    console.log("Toolbar render:",this.props);
    return  <Toolbar>
              <ToolbarGroup
                lastChild
              >
                <ToolbarTitle text="Options" />
                <ToolbarSeparator />
                <Badge
                  badgeStyle={{top: 12, right: 12}}
                  badgeContent={this.props.votes.total}
                  primary={true}
                >
                  <IconButton
                    touch
                    tooltipPosition="top-center"
                    tooltip={this.props.votes.voted?"Unlike":"Like"}
                    onTouchTap={this.onVote}
                  >
                    {this.renderFavButton()}
                  </IconButton>
                </Badge>
                <Badge
                  badgeStyle={{top: 12, right: 12}}
                  badgeContent={this.props.comments.length}
                  secondary={true}
                >
                  <IconButton
                    touch
                    tooltipPosition="top-center"
                    tooltip="Comment"
                    onTouchTap={this.onCommentClick}
                  >
                    <Comment />
                  </IconButton>
                </Badge>
              </ToolbarGroup>
            </Toolbar>
  }
}
