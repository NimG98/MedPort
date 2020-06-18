import React from "react";

import "./styles.css";

/* Component for user registration */
class SignUp extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			status: 'signup',
		};
	}
	
	render() {
		return (
			<div className="SignUp">
				{(() => {
					switch (this.state.status) {
						case 'signup':
							return (
								<div>
									<p>Enter Referral Code.</p>
									<button onClick={ () => this.changeState('doctor') }>Doctor</button>
								</div>);
						case 'doctor':
							return (
								<div>
									<p>Doctor Signup.</p>
									<button onClick={ () => this.changeState('secretary') }>Secretary</button>
								</div>);
						case 'secretary':
							return (	
								<div>
									<p>Secretary Signup</p>
									<button onClick={ () => this.changeState('patient') }>Patient</button>
								</div>);
						case 'patient':
							return (
								<div>
									<p>Patient Signup.</p>
									<button onClick={ () => this.changeState('signup') }>SignUp</button>
								</div>);
					}
				})()}
			</div>
		);
	}
	
	changeState (value) {
		this.setState({ status: value });
	}
}

export default SignUp;