import React from 'react';
import { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import Menu from './components/MenuComponent';
import {DISHES} from './shared/dishes';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES // lifted dishes to app.js file,so it can made available to menuComponent through props
    };
  }
  render(){
    return (
      <div className="App">
        <Navbar dark color = "primary">
          <div className = "container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes = {this.state.dishes} />   {/* dishes passed as parameter to menuComponent */}
      </div>
    );
  }
}

export default App;
