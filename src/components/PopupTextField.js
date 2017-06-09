import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Send from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

export default class PopupTextField extends Component {

  constructor(props){
    super(props);
    this.state = {
      openDialog : false
    }
  }

  handleOpening = () => {
    this.setState({
      openDialog:!this.state.openDialog
    });
  }

  actions = () => {
    return [
      <FlatButton label="Cancel" onTouchTap={this.handleOpening}/>,
      <FlatButton label="Confirm" onTouchTap={this.onSubmit} disabled={this.props.comm_buffer === ""}/>
    ];
  }

  onSubmit = () => {
    this.handleOpening();
    this.props.submit(this.props.currUser, this.props.comm_buffer);

  }

  onChange = (evt, val) => {
    console.log("Changed to ",val);
    this.props.buffer(val);
  }

  render(){
    return <ListItem
      primaryText="Add Comment"
      onTouchTap={this.handleOpening}
    >
      <Dialog
        open={this.state.openDialog}
        actions={this.actions()}
        title={this.props.title}
        onRequestClose={this.handleOpening}
      >
        <TextField
          fullWidth
          multiLine
          rowsMax={4}
          value={this.props.comm_buffer}
          onChange={this.onChange}
        />
      </Dialog>
    </ListItem>;
  }
}
