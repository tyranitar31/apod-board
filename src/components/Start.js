import React, { Component } from 'react';

import transitions from 'material-ui/styles/transitions';
import { Link, Prompt } from 'react-router-dom';
import {grey300, grey800, grey400, pink300} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TouchApp from 'material-ui/svg-icons/action/touch-app';
import Stars from 'material-ui/svg-icons/action/stars';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog'

import APODBrowseLoader from './APODBrowseLoader';

var today_link = "today's";

class Start extends Component {

  constructor(props){
    super(props);
    this.state = {
      expanded:false
    };
  }

  componentWillMount(){
    console.log("Start");
    console.log(this.props);
    this.props.setTitle("Start");
  }

  componentWillUnmount(){
    console.log("Unmount start");
  }

  handleStart = () => {
    this.setState({
      expanded:!this.state.expanded,

    });
  }

  touchButton = () => {
    if(this.state.expanded)
      return <Stars color={grey400} />
    else
      return <TouchApp color={grey800} />
  }

  render(){

    var styles = {
      card: {
        backgroundColor:grey300
      },
      cardHeader: {
        margin:"0 auto",
        textAlign:"center",
        width:"40vw"
      },

      cardTitle: {
        color:grey800,
        fontSize:"5em",
        fontFamily:"Poiret One, cursive"
      },
      retract: {
        margin:"0 auto",
        textAlign:"center",
        fontSize:"2em",
        fontFamily:"Poiret One, cursive",
        transition: transitions.create('max-height', '1000ms', '150ms', 'ease-in-out'),
        overflow:this.state.expanded?"hidden":"visible",
        maxHeight:this.state.expanded?"1400px":"0px",
        visibility:this.state.expanded?"visible":"hidden"
      },
      ico: {
        display:"block",
        padding:0,
        margin:"0 auto"
      }
    }

    return (
        <Card
          zDepth={1}
          style={{maxWidth:"50%", minWidth:"20%"}}
          expanded={this.state.expanded}
          style={styles.card}
        >
            )}
          />
          <CardText
            style={styles.cardHeader}
          >
            <span style={styles.cardTitle}>
              Astronomy Picture<br />Of the Day
            </span>
          </CardText>
          <IconButton
            touch
            disabled={this.state.expanded}
            onTouchTap={this.handleStart}
            tooltipPosition="top-center"
            iconStyle={{height:"50", width:"50"}}
            style={styles.ico} tooltip="Start Appreciating"
          >
            {this.touchButton()}
          </IconButton>
          <CardText style={styles.retract}>
            View <Link title={this.props.currSession.today} style={{ textDecoration:"none"}} to={{
              pathname: "/APOD",
              search:"?date="+this.props.currSession.today
            }}>todays</Link> APOD?<br /><br />~~or~~<br /><br />Travel back through time<br />with our<br />text-based time machine below:<br />
          </CardText>
          <Paper
            style={Object.assign({}, styles.retract, {maxWidth:"20%", margin:"0 auto"})}
          >
            <CardHeader
              avatar={<Avatar>?</Avatar>}
              title={<APODBrowseLoader histo={this.props.history}/>}
              subtitle="Tap above to navigate"
              subtitleStyle={{fontSize:"0.9em"}}
            >
            </CardHeader>
          </Paper>
          <CardText
            style={styles.cardHeader}
          >
            <span
              style={styles.cardTitle}
            >
            Appreciation Board
            </span>
          </CardText>
        </Card>
    );
  }
}

export default Start;
