import React, { Component } from "react";
import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";
import Home from "./home";
import Stock from "./stock";
import priceHistory from "./priceHistory";
import Quote from "./quote";


class Main extends Component {
   render() {
    return (

        <BrowserRouter>
         <div>
           <h1>Stock Project</h1>
           <ul className="header">
           <li><NavLink exact to="/">Home</NavLink></li>
             <li><NavLink to="/stock">Stock</NavLink></li>
             <li><NavLink to="/priceHistory">Price History</NavLink></li>
             <li><NavLink to="/quote">Quote</NavLink></li>
           </ul>
           <div className="content">
           <Route exact path="/" component={Home}/>
             <Route path="/stock" component={Stock}/>
             <Route path="/priceHistory" component={priceHistory}/>
             <Route path="/quote" component={Quote}/>
           </div>
         </div>
       </BrowserRouter>
    );
  }
}
 
export default Main;