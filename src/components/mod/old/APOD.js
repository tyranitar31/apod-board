import React, { Component } from 'react';
import Spinner from 'react-spinner';
import queryString from 'query-string';
import ReactPlayer from 'react-player';
import APODBrowseLoader from './APODBrowseLoader';
import './APOD.css';
//import './App.css';z

class APOD extends Component{

  componentWillMount(){
    console.log("APOD will mount");
    console.log(this.props);

    this.handleFetch(this.props.location.search, this.props.today);
  }

  componentWillReceiveProps(nextProps){
    console.log("this props");
    console.log(this.props);
    console.log("next props");
    console.log(nextProps);
    var prevUrl = this.props.location.search;
    var nextUrl = nextProps.location.search;
    console.log(prevUrl);
    console.log(nextUrl);
    console.log(prevUrl != nextUrl);
    if(prevUrl != nextUrl)
      this.handleFetch(nextProps.location.search, nextProps.today);


  }

  getParams = (where) => {
    return queryString.parse(where.location.search);
  }

  // componentWillReceiveProps(nextProps){
    // var curr = this.props.curr;
    // var request = nextProps.curr.requesting;
  //   if(this.props.curr.today===undefined){
  //     console.log("Fetching");
  //     nextProps.fetch(request.reqDate,nextProps.curr.today);
  //   }
  // }

  handleFetch = (search, today) => {

    console.log("Fetching");
    console.log(queryString.parse(search));
    this.props.fetch(queryString.parse(search).date, today);
  }

  handleClick(){
    //console.log("Yeah");
    //this.props.
  }

  handleHover(){

  }

  render() {
    if(this.props.apod !== undefined)
      return (
        <div className="APOD">
          <APODBrowseLoader match={this.props.match} histo={this.props.history}/>
          {console.log("\tAPOD Loaded")}
          {console.log(this.props.apod)}
          {this.props.apod.media_type === "image" &&
            <img src={this.props.apod.url} alt="APOD" onClick={this.handleClick}/>}
          {this.props.apod.media_type === "video" &&
            <ReactPlayer url={this.props.apod.url}/>
          }
          {/**/}
          <p>{this.props.apod.explanation}</p>
        </div>
      );
    else {
      return(
        <div className="APOD">
          {console.log("Loading")}
          <Spinner />
        </div>
      );
    }
  }
}

export default APOD;
