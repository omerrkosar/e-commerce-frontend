import axios from "axios";
import React from "react";


import {Container, Row, Col, Card, Form, Button, PopoverBody } from "react-bootstrap";
import config from "../../util/config"

import CategoryNavbar from "../Navbar/CategoryNavbar";
import ProductModal from "./ProductModal";
import ProductElement from "./ProductElement";


function sort_by_key(array, key)
{
  return array.sort(function(a, b)
  {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}




class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      products:[],
      is_open:false,
      selected_product:{
        name:"",
        category:{name:""},
        price:""
      },
    }
  }


  toggle = () => {
    this.setState({
      is_open: !this.state.is_open
    });
  }

  selectProduct = (e,product) => {
    this.setState({
      is_open: !this.state.is_open,
      selected_product: product,
    });
  }




  componentDidMount(){
    axios.get(config.product_url).then(res=>{
      let sorted_products = sort_by_key(res.data,"name")
      let new_products = [];
      sorted_products.map((product,index)=>{
        if(index!==0&&index%3===0)new_products.push(<Col xs={2}></Col>)
          new_products.push(<ProductElement product={product} selectProduct={(e)=>this.selectProduct(e,product)}/>)
        
        
      })
      this.setState({
        products:new_products,
      })
    })
  }

  onClick = (e,id) => {
    axios.get(config.product_url+`/${id}`).then(res=>{
      let new_products = [];
      
      res.data.map(category=>{
        category.products.map((product,index)=>{
          let selected_product = {name:product.name,price:product.price,category:{name:category.name},images:product.images}
          if(index!==0&&index%3===0)new_products.push(<Col xs={2}></Col>)
          new_products.push(<ProductElement product={selected_product} selectProduct={(e)=>this.selectProduct(e,selected_product)}/>)
        })
        
        
      })
      this.setState({
        products:new_products
      })
    })
  }

  render() {
    return (
        <div>
         <Container fluid>
                <Row>
                    <Col xs={2}><CategoryNavbar onClick={this.onClick}/></Col>
                    {this.state.products}
                </Row>
                
                

            </Container>
            <ProductModal product={this.state.selected_product} show={this.state.is_open} handleClose={this.toggle} />
        </div>
    );
  }
}



export default Home;
