import React from "react";
import {Container, Row, Col, Card, Form, Modal,Button }from "react-bootstrap";
import axios from "axios";
import config from "../../util/config";

class ProductElement extends React.Component {
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
          <Col xs={3} style={{marginTop:"2%",marginLeft:"2%"}}>
          <Card style={{ width: '18rem',cursor: 'pointer' }} >
          <Card.Img variant="top" src={config.images+this.props.product.images[this.state.image_number].name} onClick={(e)=>this.onClickImage(e,this.props.product)}/>
          <Card.Body onClick={(e)=>this.props.selectProduct(e,this.props.product)}>
            <Card.Title>{this.props.product.name}</Card.Title>
            <Card.Text>
              {this.props.product.price} $
              </Card.Text>
              <Card.Text>
              {this.props.product.category.name}
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        )
      }

      else{
        return(
          <Col xs={3} style={{marginTop:"2%",marginLeft:"2%"}}>
          <Card style={{ width: '18rem',cursor: 'pointer' }} onClick={(e)=>this.props.selectProduct(e,this.props.product)}>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>{this.props.product.name}</Card.Title>
            <Card.Text>
              {this.props.product.price} $
              </Card.Text>
              <Card.Text>
              {this.props.product.category.name}
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        )
      }
  }
}



export default ProductElement;
