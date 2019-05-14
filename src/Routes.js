import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PointUsingSDk from './PointUsingSDk';
import PointWithoutSDk from './PointWithoutSDK';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/map1' component={PointUsingSDk}/>
        <Route path='/map2' component={PointWithoutSDk}/>
      </Switch>
    );
  }
}

export default Routes;