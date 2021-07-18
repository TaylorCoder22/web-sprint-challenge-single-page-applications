import React from "react";
import Form from './Form'
import Home from './Home'
import { Route, Switch } from 'react-router-dom'


const App = () => {
  return(
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/Pizza' component={Form} />
    </Switch>
  )
};
export default App;
