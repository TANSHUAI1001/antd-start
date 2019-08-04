import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import "./App.css";
import WrappedNormalLoginForm from "./login/Login";
import WrappedDemo from "./form/FormDemo";
import {SiderContent,Dashboard,About} from "./layout/ContentDemo";
import { NotFound } from "./common/ErrorPage";

class CheckLoginRoute extends React.Component{

  render(){
    const user = JSON.parse(sessionStorage.getItem("user"));
    const menus = JSON.parse(sessionStorage.getItem("menus"));
    const isLogin =  user && menus;
    return isLogin? <Route {...this.props} />:<Redirect to="/login" />
  }
}

// router
class App extends React.Component{
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route path="/login" component={WrappedNormalLoginForm} />
          <CheckLoginRoute path="/" exact component={SiderContent} />
          <CheckLoginRoute path="/forms"  component={WrappedDemo} />
          <CheckLoginRoute path="/dashboard" component={Dashboard} />
          <CheckLoginRoute path="/about" component={About} />
          <CheckLoginRoute component={NotFound} />
        </Switch>
    </HashRouter>
    )
  }
}
export default App;
