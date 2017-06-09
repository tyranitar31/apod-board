import React from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
//import Start from './components/Start';
//import APOD from './components/APOD';
import StartLoader from './components/StartLoader';
import APODLoader from './components/APODLoader';
//import mainContainer from './components/mainContainer';

export default (
		<Switch>
			<Route exact path="/" render={() => (
						<Redirect to={{pathname:'/start'}} />
				)} />
			<Route path="/start" component={StartLoader} />
			<Route path="/APOD" component={APODLoader} />
			<Route path="*" render={() => (
				<div>
					{console.log("Errored")}
					<p> Error 404: Page not found </p>
					<span>Go back to </span><Link to="/start">Home</Link>
				</div>
			)} />
		</Switch>
);
