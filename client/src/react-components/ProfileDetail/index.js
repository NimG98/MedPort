import React from 'react';

import "./styles.css";
import 'antd/dist/antd.css';

import { Button, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

class ProfileDetail extends React.Component {

    constructor(props){
        super(props)

        // this.detailName = this.props.detailName;
        // this.detailValue = this.props.detailValue;

        this.state = {
            inEditMode: false,
            isEditable: this.props.isEditable,
            detailName: this.props.detailName,
            detailValue: this.props.detailValue,
            displayInvalid: false
        }

        this.displayEdit = this.displayEdit.bind(this);
        this.displayView = this.displayView.bind(this);
        this.displayInvalidinput = this.displayInvalidinput.bind(this);
        this.onPressEnter = this.onPressEnter.bind(this);
    }

    displayEdit() {
        this.setState({ inEditMode: true });
    }

    displayInvalidinput(displayInvalid) {
        this.setState({ displayInvalid });
    }

    onPressEnter(e){
        this.props.profileComponent.updateUserProfileDetail(this.props.detail, e.target.value, this);
        //this.state.detailValue = e.target.value;

        this.setState({ inEditMode: false });
    }

    displayView() {
        if(this.state.inEditMode) {
            return(
                <div className="profileDetail">
                    <h5>{this.state.detailName}:</h5>
                    <Input placeholder={this.state.detailName} defaultValue={this.state.detailValue} onPressEnter={this.onPressEnter} />
                </div>
            );
        } else {
            return(
                <div className="profileDetail">
                    <h5>{this.state.detailName}:</h5><span className="profileDetailValue">{this.state.detailValue}</span>
                </div>
            );
        }
    }

    render() {

        return(
            <li>
                {this.displayView()}
                {this.state.isEditable && 
                    <Button className="editProfileDetailButton" onClick={this.displayEdit}>
                        <EditOutlined />
                    </Button>
                }
                {this.state.displayInvalid &&
                    <span className="invalidInputMessage">Invalid input for {this.state.detailName}</span>
                }
            </li>
        );
    }
}
export default ProfileDetail;