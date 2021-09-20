import React from "react";
import {Container, Row, Col, Card, Form, Modal,Button }from "react-bootstrap";
import axios from "axios";

import config from "../../util/config"

class AddProductModal extends React.Component {
  constructor(props){
      super(props);
      this.state={
          price:0,
          name:"",
          files:[],
          category:1,
          id:0,
          check:false
      }
  }


  onClick = () => {
      if(this.state.name!==""&&this.state.price!==0){
        let body = {
            categoryid:this.state.category,
            price:this.state.price,
            name:this.state.name
        }
        axios.post(config.product_url,body).then(res=>{
            this.setState({
                id:res.data.id
            })
        })
      }
      
  }

  componentDidUpdate(prevProps,prevState){
      if(prevState.id!==this.state.id ){
          if(this.state.files && this.state.files.length !== 0){
            let post_data = this.state.files;
            post_data.append('productid',this.state.id)
            axios.post(config.image_url,post_data).then(res=>{
                this.props.handleClose();
            })
        }
      }
  }

  onChangeFile = (e) => {
        let form_data = new FormData()
        for (var i = 0; i < e.target.files.length; i++) {
            form_data.append("imageFiles", e.target.files[i]);
        }
        this.setState({
            check:true,
            files:form_data
        })


    
  }

  onChangeName = (e) => {
    this.setState({
        name:e.target.value
    })
  }

  onChangePrice = (e) => {
    this.setState({
        price:e.target.value
    })
  }

  onChangeCategory = (e) => {
    this.setState({
        category:e.target.value
    })
  }

  render() {
    return (
        <div>
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add New Product</Modal.Title>
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
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
                        <Form.Label column sm="2">
                        Price
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="number" onChange={this.onChangePrice} placeholder="Price as $" />
                        </Col>
                    </Form.Group>
                    <Form.Group  as={Row} className="mb-3" controlId="formPlaintextPrice">
                    <Form.Label column sm="2">
                        Category
                    </Form.Label>
                    <Col sm="10">
                    <Form.Select onChange={this.onChangeCategory} aria-label="Default select example">
                        {this.props.categories}
                    </Form.Select>
                    </Col>
                    </Form.Group>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Images</Form.Label>
                        <Form.Control onChange={this.onChangeFile} type="file" multiple />
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



export default AddProductModal;
