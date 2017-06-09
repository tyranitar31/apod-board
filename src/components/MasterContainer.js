import React, {Component} from 'react';
//import PropTypes from 'prop-types';
//import Title from 'react-title-component';

import StartLoader from '../StartLoader';
import APODLoader from '../APODLoader';
import { Route, Redirect, Switch } from 'react-router-dom';

//import AppNavDrawer from './AppNavDrawer';
//import FullWidthSection from './FullWidthSection';
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';

class MasterContainer extends Component {
  render() {
    return(
      <div>
        <AppBar
            style={{}}
            title="Test"
            zDepth={1}

            showMenuIconButton={true}
          />
          {routes}
      </div>
    );
  }
}

export default MasterContainer;
