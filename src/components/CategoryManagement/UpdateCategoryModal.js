import React from "react";
import {Container, Row, Col, Card, Form, Modal,Button }from "react-bootstrap";
import axios from "axios";

import config from "../../util/config"

class UpdateCategoryModal extends React.Component {
  constructor(props){
      super(props);
      this.state={
          name:this.props.category.name,
          id:0,
          check:false,
      }
  }


  

  onClick = () => {
      if(this.state.name!==""){
        let body = {
            name:this.state.name?this.state.name:this.props.category.name
        }
        axios.put(config.category_url+"/"+this.props.category.id,body).then(res=>{
            this.setState({
                id:this.props.category.id
            })
            this.props.handleClose()
        })
      }
      
  }

  componentDidUpdate(prevProps,prevState){
      if(this.props.category.id!==prevProps.category.id){
        this.setState({
            name:this.props.category.name,
            id:0,
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
                <Modal.Title>Update Category</Modal.Title>
                </Modal.Header>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                        <Form.Label column sm="2">
                        Name
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control defaultValue={this.props.category.name} onChange={this.onChangeName} placeholder="Name" />
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



export default UpdateCategoryModal;
