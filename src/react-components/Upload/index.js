import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Card, Col, Row} from 'react-bootstrap'
import Header from './../Header';
import NavBar from './../NavBar';

import "./styles.css";
class Upload extends React.Component {
    constructor(props) {
        super(props)
      }


    render() {
        return(
        <div>
            <Header />
            
            <Container >
                
                <Row>
                    <NavBar />
                </Row>
                
                
                <Col>
                    <Card className="card1">

                        <Form>
                            <div className="mb-3">
                                <Form.File id="formcheck-api-custom" custom>
                                <Form.File.Input isValid />
                                <Form.File.Label data-browse="Upload">
                                    Upload Medical File
                                </Form.File.Label>
                                </Form.File>
                            </div>
                            <div className="mb-3">
                                <Form.File id="formcheck-api-regular">
                    
                                <Form.File.Input />
                                </Form.File>
                            </div>
                        </Form>
                    </Card>
                    <Card className="card2">
                        File1
                    </Card>
                    <Card className="card2">
                        File2
                    </Card>
                    <Card className="card2">
                        File3
                    </Card>
                </Col>
            </Container>
        </div>



        )


    }



}
export default Upload;