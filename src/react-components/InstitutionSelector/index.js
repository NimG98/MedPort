import React from 'react';

import './styles.css';


class InstitutionSelector extends React.Component {
	
	render() {
		
		const {
			institutionID,
			appComponent,
			handleChange
		} = this.props;
		
		return (
			<div className="InstitutionSelector">
				<h3>Select your institution.</h3>
				<select
					value={institutionID}
					onChange={this.submit}
			    >
					<option name="institionID" value="1">Credit Valley Hospital</option>
					<option name="institionID" value="2">Mississauga Hospital</option>
					<option name="institionID" value="3">Trillium Hospital</option>
				</select>
			</div>
		);
	}
	
	// for testing
	submit(event) {
		console.log('Submission');
		console.log(event.target.value);
	}
}

export default InstitutionSelector;