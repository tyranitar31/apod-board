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

export default class CommentTextfield extends Component {

  constructor(props){
    super(props);
    this.state = {
      errorHint:""
    }
  }

  actions = () => {
    return [
      <FlatButton label="Cancel" onTouchTap={this.handleOpening}/>,
      <FlatButton label="Confirm" onTouchTap={this.onSubmit} disabled={this.props.comm_buffer === ""}/>
    ];
  }

  onSubmit = () => {
    this.props.submit(this.props.currUser, this.props.comm_buffer);
    console.log("Submitted");
  }

  onKeypress = (evt) => {
    if(evt.charCode == 13){
      evt.preventDefault();
      if(this.props.comm_buffer !== "")
        this.onSubmit();
      else
        this.setState({
          errorHint:"Can't be blank"
        });

    }
  }

  onChange = (evt, val) => {
    console.log("Changed to ",val+"s");
      this.props.buffer(val);
    if(this.state.errorHint !== "")
      this.setState({
        errorHint:""
      });
  }

  focusInput = (input) => {
    input.focus();
  }

  renderTextfield = () => {
    console.log("buffer ",this.props.comm_buffer);
    return <TextField
      fullWidth
      multiLine
      rowsMax={4}
      errorText={this.state.errorHint}
      hintText="Add Comment"
      value={this.props.comm_buffer}
      onChange={this.onChange}
      onKeyPress={this.onKeypress}
    />;
  }

  render(){
    return <ListItem
      leftAvatar={<Avatar>{this.props.currUser}</Avatar>}
    >
      <span style={{fontWeight:"bold"}}>Haha</span>
      {this.renderTextfield()}
    </ListItem>
  }

  // rendera(){
  //   return <ListItem
  //     primaryText="Add Comment"
  //     onTouchTap={this.handleOpening}
  //   >
  //     <Dialog
  //       open={this.state.openDialog}
  //       actions={this.actions()}
  //       title={this.props.title}
  //       onRequestClose={this.handleOpening}
  //     >
  //       <TextField
  //         fullWidth
  //         multiLine
  //         rowsMax={4}
  //         value={this.props.comm_buffer}
  //         onChange={this.onChange}
  //       />
  //     </Dialog>
  //   </ListItem>;
  // }
}
