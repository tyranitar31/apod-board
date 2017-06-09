import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import DatePicker from 'material-ui/DatePicker';

export default class APODBrowse extends Component {

  // constructor(props){
  //   super(props);
  // }

  componentWillUpdate(){

  }

  componentWillMount(){
    console.log("Browse Will Mount", this.props);
  }

  maxDate = () => {
    return new Date(this.props.currSession.today);
  }

  minDate = () => {
    return new Date("1995-06-16");
  }

  handleSubmit = () => {
    console.log("Submit Request");
    this.props.histo.push({
      pathname: "/APOD",
      search:"?date="+this.props.currSession.requesting
    });
    console.log(this.props.currSession.requesting);

  }

  handleChange = (event, date) => {
    this.props.setRequest(date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate());
    this.handleSubmit();
  }

  render() {
    console.log("Requesting ",this.props.currSession);
    return <DatePicker
      hintText="YYYY-MM-DD"
      value={new Date(this.props.search?this.props.search:this.props.currSession.requesting)}
      maxDate={this.maxDate()}
      minDate={this.minDate()}
      onChange={this.handleChange}
      autoOk={true} />;
  }
}
