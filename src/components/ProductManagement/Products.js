import axios from "axios";
import React from "react";


import {Container, Row, Col, Card, Form, Button, PopoverBody } from "react-bootstrap";
import config from "../../util/config"

import AddProductModal from "./AddProductModal";
import ProductElement from "../Home/ProductElement";
import ManagementElement from "./ManagementElement";
import UpdateProductModal from "./UpdateProductModal";

function sortByKey(array, key)
{
  return array.sort(function(a, b)
  {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

class Products extends React.Component {
  constructor(props){
    super(props);
    this.state={
      products:[],
      is_open_add:false,
      update_product:{
        name:"",
        category:{name:""},
        price:"",
        categories:[]
      },
      is_open_update:false,
      is_deleted:false,

    }
  }


  toggle = () => {
    this.setState({
      is_open_add: !this.state.is_open_add
    });
  }


  toggleUpdate = () => {
      this.setState({
          is_open_update: !this.state.is_open_update
      })
  }

  updateProduct = (e,product) => {
    this.setState({
      is_open_update: !this.state.is_open_update,
      update_product: product,
    });
  }

  removeProduct = (e,product) => {
    axios.delete(config.product_url+"/" +product.id).then(res=>{
        this.setState({
            is_deleted:!this.state.is_deleted,
        })

    })
  }

  componentDidUpdate(prevProps,prevState){
      if((this.state.is_open_add!==prevState.is_open_add && !this.state.is_open_add) || (this.state.is_open_update!==prevState.is_open_update && !this.state.is_open_update) || this.state.is_deleted!==prevState.is_deleted){
        axios.get(config.product_url).then(res=>{
            let sorted_products = sortByKey(res.data,"name")
            let new_products = [];
            sorted_products.map(product=>{
              new_products.push(
                  <ManagementElement removeProduct={(e)=>this.removeProduct(e,product)} product={product} selectProduct={(e)=>this.updateProduct(e,product)}/>
              )
              
            })
            this.setState({
              products:new_products
            })
          })
      }



  }

  componentDidMount(){
    axios.get(config.product_url).then(res=>{
      let sorted_products = sortByKey(res.data,"name")
      let new_products = [];
      sorted_products.map(product=>{
        new_products.push(
            <ManagementElement removeProduct={(e)=>this.removeProduct(e,product)} product={product} selectProduct={(e)=>this.updateProduct(e,product)}/>
        )
        
      })
      this.setState({
        products:new_products
      })
    })

    axios.get(config.category_url).then(res => {
        let all_categories = [];
        let sorted_categories = sortByKey(res.data,'name')
        sorted_categories.map(category=>{
            all_categories.push(<option value={category.id}>{category.name}</option>)
        })
        this.setState({
          categories: all_categories
        })
      }
        
      )
  }



  render() {
    return (
        <div>
         <Container fluid>
             <Row>
                <Col>
                <Button style={{marginTop:"2%",marginLeft:"2%"}} onClick={this.toggle} variant="primary" type="submit">
                    New Product
                </Button>
                </Col>
             </Row>
                <Row>
                    
                       {this.state.products}
                </Row>

            </Container>
            <AddProductModal categories={this.state.categories} show={this.state.is_open_add} handleClose={this.toggle} />
            <UpdateProductModal product={this.state.update_product} categories={this.state.categories} show={this.state.is_open_update} handleClose={this.toggleUpdate} />
        </div>
    );
  }
}



export default Products;
