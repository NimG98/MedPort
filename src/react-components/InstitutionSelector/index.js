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
			<form className="InstitutionSelector" onSubmit={submit}>
				<div className="main_form">
					<div className="title">
						<h2><b>Select Your Institution</b></h2>
					</div>
				
					<div className="container">
						<select
							name="institutionID"
							value={institutionID}
							defaultValue={""}
							onChange={handleChange}
							required
						>
							{/* default selector value*/}
							<option value="" disabled>Choose Here</option>
							
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
					<button type="submit" className="submit">Submit</button>
				</div>
				
				<div className="secondary_form">
					<h3>Can't find your institution? </h3>
					<button className="create" onClick={next}>Create</button>
				</div>
			</form>
		);
	}
	
}

export default InstitutionSelector;