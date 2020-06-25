import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import "./styles.css";

// importing actions/required methods
import { addSecretary, createSecretaryID} from "../../actions/app";
import { redirect } from "../../actions/router";

class SecretarySignUpForm extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		}
		
		// binding functions
		this.handleInputChange = this.handleInputChange.bind(this);
		this.createSecretary = this.createSecretary.bind(this);
		this.submit = this.submit.bind(this);
	}
	
	render() {
		return (
			<div className="SecretarySignUpForm">
				<div className="title">
					<h2><b>Secretary Sign Up</b></h2>
				</div>
			
				<div className="container">
					<label>First Name</label>
					<input 
						type='text' 
						name='firstName' 
						placeholder='First Name'
						value={this.state.firstName}
						onChange={this.handleInputChange} />
							
					<label>Last Name</label>
					<input 
						type='text' 
						name='lastName' 
						placeholder='Last Name'
						value={this.state.lastName}
						onChange={this.handleInputChange} />
							
					<label>Email</label>
					<input 
						type='email' 
						name='email' 
						placeholder='Email'
						value={this.state.email}
						onChange={this.handleInputChange} />
							
					<label>Password</label>
					<input 
						type='password' 
						name='password' 
						placeholder='Password'
						value={this.state.password}
						onChange={this.handleInputChange} />
				</div>
					
				<Link to="/">
					<button className="login">Login</button>
				</Link>	
				
				<button className="submit" onClick={this.submit}>Submit</button>
				
			</div>
		);
	}
	
	/* handles text input changes */
	handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		
		this.setState({
			[name]: value
		});
	}
	
	createSecretary = () => {
		return({
			id: createSecretaryID(this.props.appComponent),
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			password: this.state.password,
			institutionID: this.props.referrerID,
		});
	}
	
	submit() {
		const secretary = this.createSecretary();
		
		addSecretary(this.props.appComponent, secretary);
		
		this.props.deleteCode();
		
		redirect(this, "/");
	}
}

export default withRouter(SecretarySignUpForm);