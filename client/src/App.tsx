import React, { Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Home from './pages/Home';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import ListUsers from './pages/ListUsers';


class App extends Component<{}, {}> {

  public render(){
    return (
      <BrowserRouter>
          <Route path={'/'} exact component={Home}/>
          <Route path={'/list-users'} exact component={ListUsers}/>
          <Route path={'/add-user'} exact component={AddUser}/>
          <Route path={'/edit-user/:id'} exact component={EditUser}/>
      </BrowserRouter>
    );
  }
  
}

export default App;
