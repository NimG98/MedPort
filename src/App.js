import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './react-components/Home';
import SignUp from './react-components/SignUp';
import Dashboard from './react-components/Dashboard';
import Upload from './react-components/Upload';
import Request from './react-components/Request';
import Profile from './react-components/Profile';
// import Header from './react-components/Header';

class App extends React.Component {

  state = {
	  loggedInUser: null
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => 
                            (<Home appComponent={this}/>)}/>
            <Route exact path='/signup' render={() => 
                            (<SignUp appComponent={this} />)}/>
            <Route exact path='/dashboard' render={() => 
                            (<Dashboard appComponent={this} />)}/>
            <Route exact path='/upload' render={() => 
                            (<Upload appComponent={this} />)}/>
            <Route exact path='/request' render={() => 
                            (<Request appComponent={this} />)}/>
            <Route exact path='/profile' render={() => 
                            (<Profile appComponent={this} />)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
