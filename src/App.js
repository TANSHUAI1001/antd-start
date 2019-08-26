import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./App.css";
import FixedSider from "./containers/layout/FixedSider";
import WrappedNormalLoginForm from "./containers/login/Login";
import WrappedDemo from "./containers/form/FormDemo";
import {FundManagement,Dashboard,AboutCompany} from "./containers/page/Content"
import { NotFound } from "./components/ErrorPage";
import { connect } from 'react-redux';


// router if electorn user hash or memory
class App extends React.Component{

  render(){
    
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={WrappedNormalLoginForm} />
          <FixedSider>
            <Route path="/" exact component={WrappedDemo} />
            <Route path="/fund"  component={FundManagement} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={AboutCompany} />
          </FixedSider>
          <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
    )
  }
}



export default App;
