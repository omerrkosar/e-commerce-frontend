import React from "react";
import {Container, Row, Col, Card, Form, Modal,Button }from "react-bootstrap";
import axios from "axios";
import config from "../../util/config";


class ProductModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            image_number:0
        }
    }

    onClickImage = (e,product) => {
        if(this.state.image_number<this.props.product.images.length-1){
          this.setState({
            image_number:this.state.image_number+1
          })
        }
        else{
          this.setState({
            image_number:0
          })
        }
      }




  render() {

    if(this.props.product.images&&this.props.product.images.length>0){
        
        return(
            <div>
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <img src={config.images+this.props.product.images[this.state.image_number].name} onClick={(e)=>this.onClickImage(e,this.props.product)} className="img-fluid" /> 
                <Modal.Header closeButton>
                <Modal.Title>{this.props.product.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.product.price} $</Modal.Body>
                <Modal.Body>{this.props.product.category.name}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        )
      }

      else{
        return(
            <div>
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{this.props.product.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.product.price} $</Modal.Body>
                <Modal.Body>{this.props.product.category.name}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        )
      }

  }
}



export default ProductModal;
