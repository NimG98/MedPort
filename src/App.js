import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './react-components/Home';
import SignUp from './react-components/SignUp';

class App extends React.Component {

  state = {}

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => 
                            (<Home state={this.state}/>)}/>
            <Route exact path='/signup' render={() => 
                            (<SignUp state={this.state}/>)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
