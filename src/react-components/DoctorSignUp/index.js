import React from "react";

import "./styles.css";

// importing actions/required methods
// import { addDoctor } from "../../actions/app";

class DoctorSignUp extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			MID: null,
			institutionID: null,
		}
	}
	
	render() {
		
		const { appComponent } = this.props;
		
		return (
			<div className="DoctorSignUp">
				<p>Doctor Signup.</p>
				{/* for testing */}
				{/* <button onClick={() => addDoctor(appComponent, this.doctor)}>Add Doctor</button>*/}
			</div>
		);
	}
	
	// handles text input changes 
	handleInputChange = event => {
		const target = event.target;
		const name = event.name;
		const value = event.value;
		
		this.setState({
			[name]: value
		});
	}
	
}

export default DoctorSignUp;