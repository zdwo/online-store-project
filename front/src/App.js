import './App.scss';
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from './components/Home';
import Cart from './components/Cart';
import logo from './logos/cool-logos.jpeg'; 
import 'animate.css'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFilter, faShoppingBasket, faShoppingCart, faSort, faUser } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';

library.add(faShoppingBasket);


function App() {


  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/cart' component={Cart} />
              <Route path='/login' />
        </Switch>
      </Router>
    </div>
  );
}

function Navbar() {

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false)
    }, 5000);
    return () => clearTimeout(timer)
  })

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className="nav">
      <img src={logo} alt="img"/>
      <Link className='link' to="/">HOME</Link>
      <div className="menu" onClick={handleClick}>MENU</div>
      {open ? <div>
        <ul className='menu-list'>
          <li className="animate__animated animate__slideInLeft">ELECTRONICS</li>
          <li className="animate__animated animate__slideInLeft">JEWELERY</li>
          <li className="animate__animated animate__slideInLeft">CLOTHING</li>
        </ul>
      </div> : null}
      <div className='cart-icon'>
        <Link className='link' to='/login'><FontAwesomeIcon icon={faUser} /></Link>
        <Link className='link' to='/cart'><FontAwesomeIcon icon={faShoppingBasket} /></Link>
      </div>
    </div>
  );
}

export default App;
