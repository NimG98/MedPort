import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './react-components/Home';
import SignUp from './react-components/SignUp';
import Dashboard from './react-components/Dashboard';
import Upload from './react-components/Upload';
import Request from './react-components/Request';
import AdminInstitutions from './react-components/AdminInstitutions';
import AdminInstitutionView from './react-components/AdminInstitutionView';
import AdminDoctors from "./react-components/AdminDoctors";
import AdminDoctorView from "./react-components/AdminDoctorView";

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
			<Route exact path='/admin/institutions' render={() =>
							(<AdminInstitutions appComponent={this} />)}/>
			<Route exact path='/admin/institutions/:id' render={() =>
							(<AdminInstitutionView appComponent={this} />)}/>
			<Route exact path='/admin/doctors' render={() =>
							(<AdminDoctors appComponent={this} />)}/>
			<Route exact path='/admin/doctors/:id' render={() =>
							(<AdminDoctorView appComponent={this} />)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
