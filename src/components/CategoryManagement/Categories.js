import axios from "axios";
import React from "react";


import {Container, Row, Col, Card, Form, Button, PopoverBody } from "react-bootstrap";
import config from "../../util/config"

import ManagementCategory from "./ManagementCategory";
import AddCategoryModal from "./AddCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";

function sortByKey(array, key)
{
  return array.sort(function(a, b)
  {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

class Categories extends React.Component {
  constructor(props){
    super(props);
    this.state={
      categories:[],
      is_open_add:false,
      update_category:{
        name:"",
      },
      is_open_update:false,
      change:false,
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

  updateCategory = (e,category) => {
    this.setState({
      is_open_update: !this.state.is_open_update,
      update_category: category,
    });
  }

  removeCategory = (e,category) => {
    axios.delete(config.category_url+"/" +category.id).then(res=>{
        this.setState({
            is_deleted:!this.state.is_deleted
        })
    })
  }

  componentDidUpdate(prevProps,prevState){
      if((this.state.is_open_add!==prevState.is_open_add && !this.state.is_open_add) || (this.state.is_open_update!==prevState.is_open_update && !this.state.is_open_update) || (this.state.is_deleted!==prevState.is_deleted)){
        axios.get(config.category_url).then(res=>{
            let sorted_categories = sortByKey(res.data,"name")
            let new_categories = [];
            sorted_categories.map(category=>{
              new_categories.push(
                  <ManagementCategory removeCategory={(e)=>this.removeCategory(e,category)} category={category} selectCategory={(e)=>this.updateCategory(e,category)}/>
              )
              
            })
            this.setState({
              categories:new_categories
            })
          })
      }
  }

  componentDidMount(){
    axios.get(config.category_url).then(res=>{
        let sorted_categories = sortByKey(res.data,"name")
        let new_categories = [];
        sorted_categories.map(category=>{
          new_categories.push(
              <ManagementCategory removeCategory={(e)=>this.removeCategory(e,category)} category={category} selectCategory={(e)=>this.updateCategory(e,category)}/>
          )
          
        })
        this.setState({
          categories:new_categories
        })
      })
  }



  render() {
    return (
        <div>
         <Container fluid>
             <Row>
                <Col>
                <Button style={{marginTop:"2%",marginLeft:"2%"}} onClick={this.toggle} variant="primary" type="submit">
                    New Category
                </Button>
                </Col>
             </Row>
                <Row>
                    
                       {this.state.categories}
                </Row>

            </Container>
            <AddCategoryModal show={this.state.is_open_add} handleClose={this.toggle} />
            <UpdateCategoryModal category={this.state.update_category} show={this.state.is_open_update} handleClose={this.toggleUpdate} />
        </div>
    );
  }
}



export default Categories;
