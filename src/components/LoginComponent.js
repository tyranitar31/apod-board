import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar';

import {auth} from '../database';

export default class LoginComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      openDialog:false,
      card:0,
      logemail:"",
      logpass:"",
      fname:"",
      lname:"",
      email:"",
      pass:"",
      verif:"",
      logemail_err:"",
      logpass_err:"",
      fname_err:"",
      lname_err:"",
      email_err:"",
      pass_err:"",
      verif_err:""
    };
  }

  handleChangeLogEmail = (evt,val) => {this.setState({logemail:val,logemail_err:""});}

  handleChangeLogPass = (evt,val) => {this.setState({logpass:val,logpass_err:""});}

  handleChangeFname = (evt,val) => {this.setState({fname:val,fname_err:""});}

  handleChangeLname = (evt,val) => {this.setState({lname:val,lname_err:""});}

  handleChangeEmail = (evt,val) => {this.setState({email:val,email_err:""});}

  handleChangePass = (evt,val) => {this.setState({pass:val,pass_err:"",verif:"",verif_err:""});}

  handleChangeVerif = (evt,val) => {this.setState({verif:val,pass_err:"",verif_err:""});}

  handleDrawerState = (x) => {
    this.setState({
      openDialog:x,
      card:0
    });
    this.resetSignupForm();
    this.resetLoginForm();
  }

  resetLoginForm = () => {
    this.setState({
      logemail:"",
      logpass:""
    });
  }

  resetSignupForm = () => {
    this.setState({
      fname:"",
      lname:"",
      email:""
    });
  }

  resetSignupPass= () => {
    this.setState({
      pass:"",
      verif:""
    });
  }

  verifySignup = () => {
    this.setState({
      fname_err:this.state.fname?"":"This can't be blank",
      lname_err:this.state.lname?"":"This can't be blank",
      email_err:this.state.email?"":"This can't be blank",
      pass_err:this.state.pass?(this.state.pass.length < 8?"Must be more than 8 characters":(this.state.verif !== this.state.pass?"Please verify your password":"")):"This can't be blank",
      verif_err:this.state.verif?"":"This can't be blank"
    });
    console.log("Done verif ");
    console.log(this.state.fname_err !== "");
    if(this.state.fname_err !== "" || this.state.lname_err !== "" || this.state.email_err !== "" || this.state.pass_err !== "" || this.state.verif_err !== ""){
      console.log("Don't submit");
      this.resetSignupPass();
    } else {
      console.log(this.state.email + this.state.pass);
      this.props.submitSignup(this.state.email,this.state.pass,this.state.fname,this.state.lname);
      this.resetSignupForm();
      this.resetSignupPass();
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if(user){
        console.log("Logged in");
      }
    });
  }

  render(){
    console.log("Login");
    return <Paper
      zDepth={0}
    >
      <FlatButton
        label={this.props.logged?"none":"Login/Signup"}
        onTouchTap={this.handleDrawerState.bind(this,!this.state.openDialog)}
      />
      <Drawer
        open={this.state.openDialog}
        docked={false}
        width="20%"
        onRequestChange={this.handleDrawerState.bind(this,false)}
        openSecondary
      >
        <Card
          expanded={this.state.card == 2}
          onExpandChange={(x) => {
            this.resetLoginForm();
            this.resetLoginPass();
            this.setState({card:x?2:0});
          }}
        >
          <CardTitle
            actAsExpander
            title="Login"
            subtitle="If you already have an account."
          />
          <CardText
            expandable
          >
            <TextField
              value={this.state.logemail}
              errorText={this.state.logemail_err}
              onChange={this.handleChangeLogEmail}
              hintText="Email"
              style={{marginLeft:"20px"}}
            />
            <TextField
              errorText={this.state.logpass_err}
              value={this.state.logpass}
              onChange={this.handleChangeLogPass}
              hintText="Password"
              type="password"
              style={{marginLeft:"20px"}}
            />
          </CardText>
          <CardActions
            expandable
          >
            <FlatButton
              primary
              label="Login"
            />
          </CardActions>
        </Card>

        <br /><br />
        <Subheader>Or</Subheader>
        <br /><br />

        <Card
          expanded={this.state.card == 1}
          onExpandChange={(x) => {
            this.resetSignupForm();
            this.setState({card:x?1:0});
          }}
        >
          <CardTitle
            actAsExpander
            title="Signup"
            subtitle="If you're new here."
          />
          <CardText
            expandable
          >
            <TextField
              errorText={this.state.fname_err}
              value={this.state.fname}
              onChange={this.handleChangeFname}
              hintText="First Name"
              style={{marginLeft:"20px"}}
            />
            <TextField
              errorText={this.state.lname_err}
              value={this.state.lname}
              onChange={this.handleChangeLname}
              hintText="Last Name"
              style={{marginLeft:"20px"}}
            />
            <TextField
              errorText={this.state.email_err}
              value={this.state.email}
              onChange={this.handleChangeEmail}
              hintText="Email"
              style={{marginLeft:"20px"}}
            />
            <TextField
              errorText={this.state.pass_err}
              value={this.state.pass}
              onChange={this.handleChangePass}
              hintText="Password"
              type="password"
              style={{marginLeft:"20px"}}
            />
            <TextField
              errorText={this.state.verif_err}
              value={this.state.verif}
              onChange={this.handleChangeVerif}
              hintText="Verify Password"
              type="password"
              style={{marginLeft:"20px"}}
            />
          </CardText>
          <CardActions
            expandable
          >
            <FlatButton
              secondary
              label="Signup"
              onTouchTap={this.verifySignup}
            />
          </CardActions>
        </Card>
      </Drawer>
    </Paper>;
  }
}
