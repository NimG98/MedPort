import React from 'react';
import { uid } from 'react-uid';

import './styles.css';

// importing actions/required methods
import { getInstitutions } from "../../actions/app";

// component for selecting a preexisiting institution
class InstitutionSelector extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			institutions: []
		}
		
		// binding functions
		this.submit = this.submit.bind(this);
	}
	
	componentDidMount() {
		const data = getInstitutions();
		
		this.setState({
			institutions: data
		});
	}
	
	render() {
		
		const {
			institutionID,
			handleChange,
			submit,
			next,
			back
		} = this.props;
		
		return (
			<div className="InstitutionSelector">
				<form className="main_form" onSubmit={this.submit}>
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
							{this.state.institutions.map(institution => (
								<option 
									key={uid(institution)} 
									value={institution.id}>
									{institution.name}
								</option>
							))}
						</select>
					</div>
					
					<button type="button" className="back" onClick={back}>Back</button>
					<button type="submit" className="submit">Submit</button>
				</form>
				
				<div className="secondary_form">
					<h3>Can't find your institution? </h3>
					<button type="button" className="create" onClick={next}>Create</button>
				</div>
			</div>
		);
	}
	
	// onSubmit event handler
	submit(event) {
		// prevents page reload
		event.preventDefault();
		
		this.props.submit();
	}
	
}

export default InstitutionSelector;