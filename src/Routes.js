import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PointUsingSDk from './component/PointUsingSDk';
import PointWithoutSDk from './component/PointWithoutSDK';
import TableList from './component/TableList';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/map1' component={()=><PointUsingSDk/>}/>
        <Route path='/map2' component={()=><PointWithoutSDk />}/>
        <Route path='/popup_table' component={()=><TableList/>}/>
      </Switch>
    );
  }
}

export default Routes;