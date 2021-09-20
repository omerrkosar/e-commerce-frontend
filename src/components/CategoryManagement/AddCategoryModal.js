import React from "react";
import {Container, Row, Col, Card, Form, Modal,Button }from "react-bootstrap";
import axios from "axios";

import config from "../../util/config"

class AddCategoryModal extends React.Component {
  constructor(props){
      super(props);
      this.state={
          name:"",
          id:0,
          check:false
      }
  }


  onClick = () => {
      if(this.state.name!==""){
        let body = {
            name:this.state.name
        }
        axios.post(config.category_url,body).then(res=>{
            this.props.handleClose()
        })
      }
      
  }




  onChangeName = (e) => {
    this.setState({
        name:e.target.value
    })
  }



  render() {
    return (
        <div>
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                        <Form.Label column sm="2">
                        Name
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control onChange={this.onChangeName} placeholder="Name" />
                        </Col>
                    </Form.Group>
                    </Form>
                <Modal.Footer>
                <Button onClick={this.onClick} variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="secondary" onClick={this.props.handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        


    );
  }
}



export default AddCategoryModal;
