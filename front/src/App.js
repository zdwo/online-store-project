import './App.scss';
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from './components/Home';
import logo from './logos/cool-logos.jpeg'; 
import 'animate.css'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFilter, faShoppingBasket, faShoppingCart, faSort } from "@fortawesome/free-solid-svg-icons";

library.add(faShoppingBasket);


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
              <Route exact path='/' component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

function Navbar() {

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className="nav">
      <img src={logo} alt="img"/>
      <Link className='link' to="/">HOME</Link>
      {/* <Link to="/:id/cart">KOSZYK</Link> */}
      <div className="menu" onClick={handleClick}>MENU</div>
      {open ? <div>
        <ul className='menu-list'>
          <li className="animate__animated animate__slideInLeft">ELECTRONICS</li>
          <li className="animate__animated animate__slideInLeft">JEWELERY</li>
          <li className="animate__animated animate__slideInLeft">CLOTHING</li>
        </ul>
      </div> : null}
      <FontAwesomeIcon className='cart-icon' icon={faShoppingBasket} />
    </div>
  );
}

export default App;
