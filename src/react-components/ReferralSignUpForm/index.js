import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

class ReferralSignUpForm extends React.Component {
	
	render() {
		
		const {
			error,
			errorCode,
			code,
			handleChange,
			doctorSignUp,
			submit,
		} = this.props;
		
		return (
			<div className="ReferralSignUpForm">
				{error ? <h2>{errorCode}</h2> : null}
				
				<div className="main_form">
					<div className="title">
						<h2><b>Enter Referral Code</b></h2>
					</div>
					
					<div className="container">
						<input 
							type='text' 
							name='code' 
							placeholder='Referral Code'
							value={code}
							onChange={handleChange} />
					</div>
						
					<Link to="/">	
						<button className="login" >Login</button>
					</Link>
						
					<button className="next" onClick={submit} >Next</button>
				</div>
				
				<div className="secondary_form">
					<h3>Are you a Doctor? </h3>
					<button className="signup" onClick={doctorSignUp}>Sign Up</button>
				</div>
			</div>
		)
	}
	
}



export default ReferralSignUpForm;