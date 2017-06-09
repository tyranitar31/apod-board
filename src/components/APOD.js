import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';

import queryString from 'query-string';
import ReactPlayer from 'react-player';
import Img from 'react-image';
import injectTapEventPlugin from "react-tap-event-plugin";

import APODBrowseLoader from './APODBrowseLoader';
import APODToolbarLoader from './APODToolbarLoader';
import CommentsSectionLoader from './CommentsSectionLoader';
//import '../APOD.css';

injectTapEventPlugin();

class APOD extends Component{

  constructor(props){
    super(props);
    this.state = {
      clickAway:false,
      desc:false,
      openDialog:false,
      showMedia:false
    }
  }

  componentWillReceiveProps(nextProps){
    console.log("@componentWillReceiveProps", this.props);
    var prevUrl = this.props.location.search;
    var nextUrl = nextProps.location.search;
    var dateAbove = queryString.parse(this.props.location.search).date;
    if(prevUrl !== nextUrl){
      this.props.unloadAPOD(this.peekArchive(dateAbove, this.props.archive), this.props.currAPOD, dateAbove);
      this.handleFetch(nextUrl, nextProps.today);

    }
  }

  componentWillUpdate(){
    console.log("APOD will update", this.props);
  }

  componentWillMount(){
    this.props.setTitle("APOD");
    this.handleFetch(this.props.location.search, this.props.today);
  }

  peekArchive = (date, archive) => {
    var obj = [];
    var ind = -1;
    if(archive != undefined){
      obj = archive.filter((obj) => {
        return obj.date === date;
      });
      ind = archive.map((obj) => {
        return obj.date;
      }).indexOf(date);
      console.log("in archive ",obj);
    }
    return {index:ind,APOD:obj};
  }

  peekStash = (date) => {
    console.log("Peeking stash", this.props.stash);
    var obj = -1;
    if(this.props.stash != undefined){
      obj = this.props.stash.map((obj) => {
        return obj.date;
      }).indexOf(date);
      console.log("in stash ",obj);
    }
    return obj;
  }

  handleFetch = (search) => {
    console.log("Fetching");
    console.log(queryString.parse(search).date);
    this.props.fetch(
      queryString.parse(search).date,
      this.peekStash(queryString.parse(search).date),
      this.peekArchive(queryString.parse(search).date, this.props.archive)
    );
  }

  setClickAwayOverlay = () => {
    console.log("Clicked");
    this.setState({
      clickAway:!this.state.clickAway
    });
  }

  toggleCommentsDialog = () => {
    console.log("Comment toggled");
    this.setState({
      openDialog:!this.state.openDialog
    });
  }

  onToggle = () => {
    console.log("Toggled Desc ");
    this.setState({
      desc:!this.state.desc
    });
  }

  getMed = () => {
    switch(this.props.apod.media_type){
      case "image":
        return <Img src={this.props.apod.url} loader={
            <CircularProgress style={{backgroundColor:"black", width:"100%", display:"flex", justifyContent:"center" }} size={200}/>
        } />
      case "video":
        return <ReactPlayer url={this.props.apod.url} onPause={this.setClickAwayOverlay} onEnded={this.setClickAwayOverlay}/>
      default:
        return <img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-error-icon.png" />;
    }
  }

  renderAvatar = () => {
    if(this.props.apod.media_type === "image")
      return <Avatar src={this.props.apod.url} />;
    return <Avatar color="lightGrey">Vid  </Avatar>;
  }

  cardMedia = () => {
    return <CardMedia
      expandable
      onTouchTap={this.props.apod.media_type==="video"?this.setClickAwayOverlay:null}
      overlay={(this.state.clickAway?null:this.cardText())}
    >
      {this.getMed()}
    </CardMedia>;
  }

  cardText = () => {
    return<Paper
      style={{backgroundColor:"transparent"}}
    >
      <CardTitle
        style={{float:"left"}}
        titleStyle={{color:"white"}}
        subtitleStyle={{color:"white"}}
        title={this.props.apod.title}
        subtitle={this.props.apod.url}
        showExpandableButton={true}
      >
      </CardTitle>
      <IconButton
        tooltip="Collapse"
        style={{
          float:"right",
          backgroundColor:"white",
          borderRadius:"50"
        }}
        onTouchTap={this.altExpanded}
      >
        <ExpandLess />
      </IconButton>
    </Paper>;
  }

  renderDateDifference = (date) => {
    var today = new Date(this.props.today);

    var diffMS = today - date;
    console.log(diffMS + ' ms');

    var diffS = diffMS / 1000;
    console.log(diffS + ' seconds');

    var diffM = diffS / 60;
    console.log(diffM + ' minutes');

    var diffH = diffM / 60;
    console.log(diffH + ' hours');

    var diffD = diffH / 24;
    console.log(diffD + ' days');

    var diffW = Math.floor(diffD / 7);
    console.log(diffW + ' weeks');

    var diffMo = Math.floor(diffW / 4);
    console.log(diffMo + ' months');

    if(diffM < 60)
      return diffM + " minute/s";
    else if(diffH < 24)
      return diffH + " hour/s";
    else if(diffD < 7)
      return diffD + " day/s"
    else if(diffW < 4)
      return diffW + " week/s"
    else if(diffMo < 12)
      return diffMo + " month/s"
    else if(diffMo == 12 || today.getFullYear()-1 == date.getFullYear() &&
            today.getMonth() == date.getMonth() &&
            today.getDate() == date.getDate())
      return " a Year"
    else
      return " a while"
  }

  renderSubtitle = () => {
    var req = queryString.parse(this.props.location.search);
    var sess = new Date(req.date);

    var pre = sess.toDateString();
    var mid1 = "( Today"
    var mid2 = "( About " + this.renderDateDifference(sess) + "  ago from ";

    var sub1 = pre+mid1;
    var sub2 = <span>
      {pre+mid2}
      {<Link
        style={{textDecoration:"none"}}
        to={{
          pathname:"./APOD",
          search:"?date="+this.props.today
          }}
        >
        Today
      </Link>})
    </span>;
    return this.props.today === req.date?sub1+" )":sub2;
  }

  renderHeader = () => {
    console.log("Test date, ",this.renderSubtitle());
    return <CardHeader
      title={<APODBrowseLoader search={queryString.parse(this.props.location.search).date} histo={this.props.history} />}
      subtitle={this.renderSubtitle()}
      avatar={this.renderAvatar()}
      showExpandableButton={!this.state.showMedia}
    >
    </CardHeader>
  }

  altExpanded = () => {
    this.expanded(false);
  }

  expanded = (x) => {

    this.setState({
      showMedia:x
    })
  }

  renderCard(){
      return <Paper
        zDepth={0}
        style={{backgroundColor:"transparent"}}
      >
        <Card
          expanded={this.state.showMedia}
          onExpandChange={this.expanded}
          zDepth={5}
          style={{width:screen.availWidth > 720?"70%":"90%", margin:"0 auto"}}
          containerStyle={{ minHeight:"50%", maxHeight:"50%"}}
        >
          {this.renderHeader()}
          {this.cardMedia()}
        </Card>
        <Card
          expanded={this.state.desc}
          zDepth={5}
          style={{width:screen.availWidth > 720?"70%":"90%", margin:"0 auto"}}
          containerStyle={{ minHeight:"50%", maxHeight:"50%"}}
        >
          <CardActions>
            <FlatButton
              fullWidth
              label={this.state.desc?"Hide Description":"Show Description"}
              onTouchTap={this.onToggle}
            />
          </CardActions>
          <CardText expandable>
            {this.props.apod.explanation}
          </CardText>
          <APODToolbarLoader
            toggleComments={this.toggleCommentsDialog}
          />
          <CommentsSectionLoader
            openDialog={this.state.openDialog}
            toggleComments={this.toggleCommentsDialog}
            apod={this.props.apod}
            currAPOD={this.props.currAPOD}
          />
        </Card>
      </Paper>;
  }

  renderInvCard(){
    return <span>Invalid url</span>
  }

  renderApod(){
    if(this.props.currAPOD.APOD_ref == -1)
      return this.renderInvCard();
    else if(this.props.apod == null)
      return <CircularProgress color="green" size={70} />;
    else
      return this.renderCard();
  }

  render() {
    console.log("\tAPOD Render", this.props);
    if(!this.props.currAPOD.loading){
      return this.renderApod();
  }
    else {
      return <LinearProgress mode="indeterminate" />;
    }
  }

}



export default APOD;
