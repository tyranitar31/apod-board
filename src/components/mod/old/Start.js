import React, { Component } from 'react';
import APODLoader from '../components/APODLoader.js';
import { Link } from 'react-router-dom';
import APODBrowseLoader from './APODBrowseLoader';

var today_link = "today's";

class Start extends Component {

  render() {
    return (
      <div className="Start">
        {console.log("Start load")}
        <div className="header">
          <h1> <strong>A</strong>stronomy <strong>P</strong>icture <strong>O</strong>f the <strong>D</strong>ay <br /> Appreciation Board </h1>
          <br />
        </div>
        <div className="datePicker">
          <h3>
          View <Link to={{
            pathname:"/APOD",
            search:"?date="+this.props.currSession.today
          }}
          title={this.props.currSession.today}>{today_link}</Link> APOD? <br />
            or <br />
            Travel back through time with our text-based time machine below: <br />
          </h3>
          <APODBrowseLoader match={this.props.match} histo={this.props.history}/>
        </div>
      </div>
    );
  }
}

export default Start;
