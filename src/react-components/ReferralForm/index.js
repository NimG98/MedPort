import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

// importing actions/required methods
import { submitReferralCode } from "../../actions/app";

class ReferralForm extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			code: '',
			error: false,
			errorCode: '',
		}
		
		// binding functions
		this.handleInputChange = this.handleInputChange.bind(this);
		this.submit = this.submit.bind(this);
		this.setError = this.setError.bind(this);
		
	}
	
	render() {
		
		const {
			setStatus,
		} = this.props;
		
		return (
			<div className="ReferralForm">
				{this.state.error ? <h2>{this.state.errorCode}</h2> : null}
				
				<div className="container">
					<label>Enter Referral Code</label>
					<input 
						type='text' 
						name='code' 
						placeholder='Referral Code'
						value={this.state.code}
						onChange={this.handleInputChange} />
				</div>
					
				<Link to="/">	
					<button className="back" >Back</button>
				</Link>
					
				<button className="next" onClick={this.submit} >Next</button>
			</div>
		)
	}
	
	/* handles text input changes
	   Note: converts to uppercase */
	handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		const formattedValue = value.toUpperCase();
		
		this.setState({
			[name]: formattedValue
		});
	}
	
	/* 
		retrieves referrerID based on referral code and redirects to appropriate signup page
		
		TODO: pass referral code to next signup component 
	*/
	submit() {
		const referrerID = submitReferralCode(this.props.appComponent, this.state.code);
		
		if (referrerID) {
			
			if (this.state.code.startsWith('S')) {
				// secretary referral code
				this.props.setStatus(2);
			} else if (this.state.code.startsWith('P')) {
				// patient referral code
				this.props.setStatus(3);
			} else {
				// invalid referral code
				this.setError(true, 'An Error Occurred');
			}
		} else {
			// wrong referral code
			this.setError(true, 'Invalid Referral Code')
		}
	}
	
	// general error code handler
	setError(value, code) {
		this.setState({
			error: value,
			errorCode: code
		});
	}
	
}



export default ReferralForm;