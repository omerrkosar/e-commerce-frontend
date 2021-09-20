import React from "react";
import {Nav,Navbar,Container,NavItem} from "react-bootstrap";
import axios from "axios";

import config from "../../util/config"

function sortByKey(array, key)
{
  return array.sort(function(a, b)
  {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

class CategoryNavbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categories:[],
    }
  }

  


  componentDidMount(){
      axios.get(config.category_url).then(res => {
        let all_categories = [];
        let sorted_categories = sortByKey(res.data,'name')
        sorted_categories.map(category=>{
          all_categories.push(<NavItem style={{cursor: 'pointer'}} onClick={(e) => this.props.onClick(e, category.id)}>{category.name}</NavItem>)
        })
        this.setState({
          categories: all_categories
        })
      }
        
      )
  }


  render() {
    return (
        <Navbar bg="light" expand="lg" >
        <Container>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="col-md-2 d-none d-md-block bg-light sidebar" activeKey="/">
                {this.state.categories}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        


    );
  }
}



export default CategoryNavbar;
