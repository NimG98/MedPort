import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './react-components/Home';
import SignUp from './react-components/SignUp';
import Dashboard from './react-components/Dashboard';
import FileUpload from './react-components/FileUpload';
import Request from './react-components/Request';

import AdminInstitutions from './react-components/AdminInstitutions';
import AdminInstitutionView from './react-components/AdminInstitutionView';
import AdminDoctors from "./react-components/AdminDoctors";
import AdminDoctorView from "./react-components/AdminDoctorView";
import AdminPatients from "./react-components/AdminPatients";
import AdminPatientView from "./react-components/AdminPatientView";
import ResultsOverview from './react-components/ResultsOverview';
import Profile from './react-components/Profile';
import { readCookie, getUserType } from './actions/user';
import { UserType } from './constants/userType';


class App extends React.Component {
    constructor(props) {
        super(props);
        readCookie(this); // sees if a user is logged in.
        this.getLoggedInUserView = this.getLoggedInUserView.bind(this);
        this.getDefaultView = this.getDefaultView.bind(this);
    }

    state = {
        loggedInUser: null
    }

    getLoggedInUserView() {
        if(this.state.userType === UserType.admin) {
            return <AdminInstitutions history={this.history} appComponent={this}/>
        }
        return <Dashboard history={this.history} appComponent={this}/>
    }

    getDefaultView() {
        return <Home history={this.history} appComponent={this}/>
    }

    render(){

        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact path={["/", "/dashboard", "/admin/institutions"] /* any of these URLs are accepted. */ }
                        render={({ history }) => {
                            this.history = history;
                            return(
                                <div className="App">
                                    { !this.state.loggedInUser ? this.getDefaultView() : this.getLoggedInUserView()}
                                </div>
                            )
                        }}
                    />
                    <Route exact path='/signup' render={() =>
                        (<SignUp history={this.history} appComponent={this} />)}/>

                    {(this.state.userType === "patient" || this.state.userType === "doctor") &&
                        <Route exact path='/profile' render={({ history }) =>
                            (<Profile history={this.history} appComponent={this} />)}/>}
                    {(this.state.userType === "patient" || this.state.userType === "doctor") &&
                        <Route exact path='/request' render={({ history }) =>
                            (<Request history={this.history} appComponent={this} />)}/>
                    }
                    {(this.state.userType === "patient" || this.state.userType === "doctor") &&
                        <Route exact path='/upload' render={({ history }) =>
                            (<FileUpload history={this.history} appComponent={this} />)}/>
                    }
                    
                    {/* {this.state.userType === "admin" &&
                        <Route exact path='/admin/institutions' render={({ history }) =>
                        (<AdminInstitutions history={this.history} appComponent={this} />)}/>
                    } */}

                    {this.state.userType === "admin" &&
                    <Route exact path='/admin/institutions/:id' render={({ history }) =>
                      (<AdminInstitutionView history={this.history} appComponent={this} />)}/>
                    }

                    {this.state.userType === "admin" &&
                    <Route exact path='/admin/doctors' render={({ history }) =>
                              (<AdminDoctors history={this.history} appComponent={this} />)}/>
                    }

                    {this.state.userType === "admin" &&
                    <Route exact path='/admin/doctors/:id' render={({ history }) =>
                              (<AdminDoctorView history={this.history} appComponent={this} />)}/>
                    }

                    {this.state.userType === "admin" &&
                    <Route exact path='/admin/patients' render={({ history }) =>
                              (<AdminPatients history={this.history} appComponent={this} />)}/>
                    }

                    {this.state.userType === "admin" &&
                    <Route exact path='/admin/patients/:id' render={({ history }) =>
                              (<AdminPatientView history={this.history} appComponent={this} />)}/>
                    }
					
					<Route exact path='/results' render={() =>
                        (<ResultsOverview history={this.history} appComponent={this} />)}/>
						
                    {/* <Route exact path='/' render={() =>
                        (<Home appComponent={this}/>)}/>
                    <Route exact path='/dashboard' render={() =>
                        (<Dashboard appComponent={this} />)}/>
                    <Route exact path='/upload' render={() =>
                        (<FileUpload appComponent={this} />)}/>
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
                    <Route exact path='/admin/patients' render={() =>
                        (<AdminPatients appComponent={this} />)}/>
                    <Route exact path='/admin/patients/:id' render={() =>
                        (<AdminPatientView appComponent={this} />)}/>
                    <Route exact path='/results' render={() =>
                        (<Result appComponent={this} />)}/> */}
                    { /* 404 if URL isn't expected. */}
                    <Route render={() => <div>404 Not found</div>} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
