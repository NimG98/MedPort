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
			submit,
			next,
			back
		} = this.props;
		
		const institutions = getInstitutions(appComponent);
		
		return (
			<div className="InstitutionSelector">
				<div className="main_form">
					<div className="title">
						<h2><b>Select Your Institution</b></h2>
					</div>
				
					<div className="container">
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
					</div>
					
					<button className="back" onClick={back}>Back</button>
					<button className="submit" onClick={submit}>Submit</button>
				</div>
				
				<div className="secondary_form">
					<h3>Can't find your institution? </h3>
					<button className="create" onClick={next}>Create</button>
				</div>
			</div>
		);
	}
	
}

export default InstitutionSelector;