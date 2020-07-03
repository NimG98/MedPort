import React from "react";
import { withRouter } from "react-router";

import "./styles.css";
import 'antd/dist/antd.css';

import Header from './../Header';
import LoginForm from './../LoginForm';
import bgImage from "./static/home-bg-doctor-patient-online.png";
import { Card, Row, Col } from "antd";

/* Component for the Home page */
class Home extends React.Component {

  render() {
    return (
      <div className="home__bg">
        <Header appComponent={this.props.appComponent}/>
        <Row className="login-background">
          <img alt={"bgImagelogo"} src={bgImage} className="home__bg-image"/>
          <LoginForm
            appComponent={this.props.appComponent}
          />
        </Row>
        <Row className="featureDisplay">
          <Col span={8}>
            <Card title="Feature 1" bordered={false} className="roundedCardLeft">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Feature 2" bordered={false}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
            veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut 
            fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Feature 3" bordered={false} className="roundedCardRight">
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam 
            nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Home);
