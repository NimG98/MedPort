import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './react-components/Home';
import SignUp from './react-components/SignUp';
import Header from './react-components/Header';

class App extends React.Component {

  state = {
	  doctors: [ 
		{ id: 1, firstName: 'Bob', lastName: 'Builder', MID: 123456,  email: 'b.build@fake.com', password: 'abcdef'}
	  ],
	  institutions: [
		{ id: 1, name: 'Credit Valley Hospital', address: 'xxx Credit Valley Blvd', postalCode: 'B5C 4J6', phoneNumber: '9055558523'}
	  ],
	  // P - patient, S - secretary
	  referrals: {
			// code: doctorID
			'P001': 1,
			// code: institutionID
			'S001': 1,
	  },
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => 
                            (<Home state={this.state}/>)}/>
            <Route exact path='/signup' render={() => 
                            (<SignUp appComponent={this} />)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
