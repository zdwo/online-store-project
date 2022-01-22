import './App.scss';
import { Link, Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import Home from './components/Home';
import Cart from './components/Cart';
import Signup from './components/Signup';
import logo from './logos/cool-logos.jpeg'; 
import 'animate.css'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingBasket, faUser } from "@fortawesome/free-solid-svg-icons";
import UserPage from './components/UserPage';
import Auth from './utils/Auth'
import { isSignedIn } from './components/auth-api';
import Signin from './components/Signin'

library.add(faShoppingBasket);


const RouteReg = ({component: Component, ...rest}) => {
  const auth = React.useContext(Auth)
  return <Route {...rest} render={props => !auth.auth ? <Component {...props} /> : <Redirect to='/user' />} />
}

const RouteProtected = ({component: Component, ...rest}) => {
  const auth = React.useContext(Auth)
  return <Route {...rest} render={props => auth.auth ? <Component {...props} /> : <Redirect to='/signin' />} />
}

function App() {

  const [auth, setAuth] = useState(false)

  const readSession = async () => {
    const res = await isSignedIn()
    if (res.data.auth) {
      setAuth(true)
    }
  }
  
  useEffect(() => {
    readSession()
  }, [])

  return (
    <div>
      <Auth.Provider value={{auth, setAuth}}>
        <Router>
          <Navbar />
          <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/cart' component={Cart} />
                <RouteProtected path='/user' component={UserPage} />
                <RouteReg path='/signin' component={Signin} />
                <RouteReg path='/signup' component={Signup} />
          </Switch>
        </Router>
      </Auth.Provider>
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
        <Link className='link' to='/user'><FontAwesomeIcon icon={faUser} /></Link>
        <Link className='link' to='/cart'><FontAwesomeIcon icon={faShoppingBasket} /></Link>
      </div>
    </div>
  );
}

export default App;
