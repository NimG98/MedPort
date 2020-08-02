import React from "react";
import { withRouter } from "react-router";

import "./styles.css";
import 'antd/dist/antd.css';

import Header from './../Header';
import NavBar from './../NavBar';

import { getUserType} from "../../actions/app";
import { UserType } from "../../constants/userType";

import { Card, Button }  from "antd";

class Result extends React.Component {

    constructor(props) {
        super(props);

        console.log(this.props.appComponent);
        console.log(`logged in user = [${this.props.appComponent.state.loggedInUser}]`);
        //const x = this.props.appComponent.state.loggedInUser;
        
       

        this.state = {
            userType: getUserType(this.props.appComponent.state.loggedInUser),
            value:'',
            list: ["Please come to the Doctors office tomorrow to discuss your results"],
            pList:["Okay, I will schedule an appointment"]
        };
        
        this.updateValue = this.updateValue.bind(this);
        this.AddItemOnClick = this.AddItemOnClick.bind(this);
    }
//robinwieruch.de
    AddItemOnClick = () => {
        this.setState(state => {
    
            const list = state.list.concat(state.value);

                
            
            return {
                list,
                value: "",
            };
        });
    };
    AddItemOnClickP = () => {
        this.setState(state => {
    
            const pList = state.pList.concat(state.value);

                
            
            return {
                pList,
                value: "",
            };
        });
    };

    updateValue(event){
        this.setState({
            
            value: event.target.value
        })
    }
    

    render(){
        // To make sure no one just visits http://localhost:3000/request
        // without logging in first
        if (this.state.userType === "") {
            window.location.href = "/";
        }
        return(
        
        <div>

            <Header appComponent={this.props.appComponent}/>
            <NavBar appComponent={this.props.appComponent}/>
            <div className="container2">
                <Card className="ant-card1">
                    <h3>File</h3>
                </Card>
               
                <div>
                <Card className="ant-card1"> <h2 className="RH2">Doctors Notes</h2>
                    <ul className="specialList">
                        <Card className="ant-card1">
                    {this.state.list.map(item=>(
                        <li key={item}>{item}</li>
                    ))}
                    </Card>
                    </ul>
                        
                </Card>
                <Card className="ant-card1">
                    {this.state.userType === UserType.doctor &&
                    <div>
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.updateValue}
                    /> 
                    
                    <Button onClick={this.AddItemOnClick} >Comment</Button>
                    </div>
                    }
                    </Card>
                </div>
                
                <Card className="ant-card1"><h2 className="RH2">Patients Notes</h2>
                    <ul className="specialList">
                        <Card className="ant-card1"> 
                    {this.state.pList.map(item=>(
                        <li key={item}>{item}</li>
                    ))}
                    </Card>
                    </ul>
                        
                </Card>
                <Card className="ant-card1">
                    {this.state.userType === UserType.patient &&
                    <div>
                    <input 
                        type="text"
                        value={this.state.value}
                        onChange={this.updateValue}
                    /> 
                    
                    <Button onClick={this.AddItemOnClickP} >Comment</Button>
                    </div>
                    }
                </Card>
                    
            </div>
            </div>
        )
    };
    




}
export default withRouter(Result);