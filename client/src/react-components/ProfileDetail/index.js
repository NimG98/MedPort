import React from 'react';

import "./styles.css";
import 'antd/dist/antd.css';

import { Button, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

class ProfileDetail extends React.Component {

    constructor(props){
        super(props)

        this.detailName = this.props.detailName;
        this.detailValue = this.props.detailValue;

        this.state = {
            inEditMode: false,
            isEditable: this.props.isEditable
        }

        this.displayEdit = this.displayEdit.bind(this);
        this.displayView = this.displayView.bind(this);
        this.onPressEnter = this.onPressEnter.bind(this);
    }

    displayEdit() {
        this.setState({ inEditMode: true });
    }

    onPressEnter(e){
        this.props.profileComponent.updateUserProfileDetail(this.props.detail, this.detailValue);
        this.detailValue = e.target.value;

        this.setState({ inEditMode: false });
    }

    displayView() {
        if(this.state.inEditMode) {
            return(
                <div className="profileDetail">
                    <h5>{this.detailName}:</h5>
                    <Input placeholder={this.detailName} defaultValue={this.detailValue} onPressEnter={this.onPressEnter} />
                </div>
            );
        } else {
            return(
                <div className="profileDetail">
                    <h5>{this.detailName}:</h5><span className="profileDetailValue">{this.detailValue}</span>
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
            </li>
        );
    }
}
export default ProfileDetail;