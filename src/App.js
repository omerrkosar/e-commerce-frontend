import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.css';
import "./Dashboard.css"
import DemoNavbar from "./components/Navbar/DemoNavbar";
import Home from "./components/Home/Home";
import Products from "./components/ProductManagement/Products";
import Categories from "./components/CategoryManagement/Categories"
import { BrowserRouter, Route, Switch } from "react-router-dom";



import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";





class App extends Component {


  render() {
    return (
        
        <BrowserRouter>
            <DemoNavbar />
            
            <Switch>
            <Route path="/" exact render={props => <Home {...props} />}/>
            <Route path="/product_management" exact render={props => <Products {...props} />}/>
            <Route path="/category_management" exact render={props => <Categories {...props} />}/>
            
            </Switch>
        </BrowserRouter>

    );
  }
}

export default App;
