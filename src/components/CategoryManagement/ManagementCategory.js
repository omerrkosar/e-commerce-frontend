import React from "react";
import {Container, Row, Col, Card, Form, Modal,Button }from "react-bootstrap";
import axios from "axios";
import config from "../../util/config";

class ManagementCategory extends React.Component {


  


  render() {
        
        return(
          <Col xs={3} style={{marginTop:"2%",marginLeft:"2%"}}>
          <Card style={{ width: '18rem',cursor: 'pointer' }} >
          <Card.Body onClick={(e)=>this.props.selectCategory(e,this.props.category)}>
            <Card.Title>{this.props.category.name}</Card.Title>
            
          </Card.Body>
          <Button variant="secondary" onClick={(e)=>this.props.removeCategory(e,this.props.category)}>
                    Remove
          </Button>
        </Card>
        </Col>
        )
   
  }

}

export default ManagementCategory;
