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
            <Card title="View your medical test reports online" bordered={false} className="roundedCardLeft">
              After a patient gets a medical test done, their test report will be uploaded online 
              in one convenient place for them and their family doctor to review.
              This removes the need for you to have to go into the doctor’s office to receive your test results.
              You can also upload your previously received test results from other doctors or specialists for further analysis.
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Receive feedback along with test reports" bordered={false}>
              A family doctor can upload test results with attached notes to discuss with you.
              By commenting on a thread under the test result, a doctor and patient can easily discuss test results with each other.
              You can reply to the doctor's feedback, ask any questions, and raise any concerns.
              In case you forget what your doctor recommended; no worries!
              You can easily refer back to the documented record of the discussion.
              This keeps conversations organized as they are attached to the specific test result in discussion.
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Doctor-Patient communication made easy" bordered={false} className="roundedCardRight">
              Further discussion between the doctor and the patient can be facilitated on
              the website by requesting an in-person or over-the-phone appointment. You or your doctor can submit a request
              to set a time to call each other or visit the doctor's office. After a doctor looks at a test result and thinks
              you need a new follow-up test conducted, they can easily send you a request to get the test done and provide more information
              inside the request itself!
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Home);
