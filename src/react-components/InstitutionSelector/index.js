import React from 'react';
import { uid } from 'react-uid';

import './styles.css';

// importing actions/required methods
import { getInstitutions } from "../../actions/app";

// component for selecting a preexisiting institution
class InstitutionSelector extends React.Component {
	
	render() {
		
		const {
			institutionID,
			appComponent,
			handleChange,
			submit
		} = this.props;
		
		const institutions = getInstitutions(appComponent);
		
		return (
			<div className="InstitutionSelector">
				<h3>Select your institution.</h3>
				<select
					name="institutionID"
					value={institutionID}
					defaultValue={"Default"}
					onChange={handleChange}
			    >
				{/* default selector value*/}
					<option value="Default" disabled>Choose Here</option>
				
				{/* iterates over institutions array and displays options */}
				{institutions.map(institution => (
					<option 
						key={uid(institution)} 
						value={institution.id}>
						{institution.name}
					</option>
				))}
				
				</select>
				<button type="submit" onClick={submit}>Submit</button>
			</div>
		);
	}
	
}

export default InstitutionSelector;