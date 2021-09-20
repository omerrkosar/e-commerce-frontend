import React from "react";
import {Container, Row, Col, Card, Form, Modal,Button }from "react-bootstrap";
import axios from "axios";

import config from "../../util/config"

class UpdateProductModal extends React.Component {
  constructor(props){
      super(props);
      this.state={
          price:0,
          name:this.props.product.name,
          files:{},
          category:0,
          id:0,
          check:false,
      }
  }


  

  onClick = () => {
      if(this.state.name!==""&&this.state.price!==0){
        let body = {
            categoryid:this.state.category?this.state.category:this.props.product.category.id,
            price:this.state.price?this.state.price:this.props.product.price,
            name:this.state.name?this.state.name:this.props.product.name
        }
        axios.put(config.product_url+"/"+this.props.product.id,body).then(res=>{
            this.setState({
                id:this.props.product.id
            })
        })
      }
      
  }

  componentDidUpdate(prevProps,prevState){
      if(prevState.id!==this.state.id && this.state.id!==0 ){
            let post_data = this.state.files;
            post_data.append('productid',this.state.id)
            axios.put(config.image_url + "/" +this.state.id,post_data).then(res=>{
                this.setState({
                    id:0
                })
                this.props.handleClose();
            })
        
      }
      if(this.props.product.id!==prevProps.product.id){
        let form_data = new FormData();
        this.setState({
            price:this.props.product.price,
            name:this.props.product.name,
            files:form_data,
            category:this.props.product.category.id,
            id:0,
        })
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
                <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                        <Form.Label column sm="2">
                        Name
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control defaultValue={this.props.product.name} onChange={this.onChangeName} placeholder="Name" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPrice">
                        <Form.Label column sm="2">
                        Price
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="number" defaultValue={this.props.product.price} onChange={this.onChangePrice} placeholder="Price as $" />
                        </Col>
                    </Form.Group>
                    <Form.Group  as={Row} className="mb-3" controlId="formPlaintextPrice">
                    <Form.Label column sm="2">
                        Category
                    </Form.Label>
                    <Col sm="10">
                    <Form.Select defaultValue={this.props.product.category.id} onChange={this.onChangeCategory} aria-label="Default select example">
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



export default UpdateProductModal;
