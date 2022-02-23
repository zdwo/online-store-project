import './App.scss';
import { Link, Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import Home from './components/Home';
import Cart from './components/Cart';
import Signup from './components/Signup';
import logo from './logos/cool-logos.jpeg'; 
import 'animate.css'
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingBasket, faUser, faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import UserPage from './components/UserPage';
import Auth from './utils/Auth'
import { isSignedIn } from './components/auth-api';
import Signin from './components/Signin'
import Clothing from './components/Clothing'
import Makeup from './components/Makeup';
import Jewelery from './components/Jewelery';
import Details from './components/ProductDetails'
import Promos from './components/Promos';
import Cookies from 'js-cookie';
import axios from 'axios';
import NewsletterAdmin from './components/Newsletter-admin';
import AddProduct from './components/AddProduct'
import Chat from './components/Chat';
import MobileMenu from './components/MobileMenu';

library.add(faShoppingBasket);


const RouteReg = ({component: Component, ...rest}) => {
  const auth = useContext(Auth)
  return <Route {...rest} render={props => !auth.auth ? <Component {...props} /> : <Redirect to='/user' />} />
}

const RouteProtected = ({component: Component, ...rest}) => {
  const auth = useContext(Auth)
  return <Route {...rest} render={props => auth.auth ? <Component {...props} /> : <Redirect to='/signin' />} />
}




function App() {

  const [auth, setAuth] = useState(false);


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
                <Route path='/clothing' component={Clothing}/>
                <Route path='/jewelery' component={Jewelery}/>
                <Route path='/beauty' component={Makeup}/>
                <Route exact path='/promos' component={Promos}/>
                <Route path='/chat'>
                  <Chat/>
                </Route>
                <Route path='/cart' component={Cart} />
                <Route path='/newsletter' component={NewsletterAdmin}/>
                <RouteProtected path='/user' component={UserPage} />
                <RouteReg path='/signin' component={Signin} />
                <RouteReg path='/signup' component={Signup} />
                <Route path='/add' component={AddProduct} />
                {/* <Route path='/clothing' component={Clothing}/>
                <Route path='/jewelery' component={Jewelery}/>
                <Route path='/beauty' component={Makeup}/> */}
                <Route path='/:id' component={Details}/>         
          </Switch>
        </Router>
      </Auth.Provider>
    </div>
  );
}

function Navbar() {

  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false)
    }, 10000);
    return () => clearTimeout(timer)
  })

  useEffect(() => {
    axios.get('http://localhost:5000/user')
    .then(response => setUsers(response.data))
    .catch (error => console.log(error))
  }, [users])

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className="nav">
      <Link className='link logo' to="/"><img src={logo} alt="img"/></Link>
      <Link className='link home' to="/">HOME</Link>
        <div className="menu" onClick={handleClick}>MENU</div>
        {open ? <div>
          <ul className='menu-list'>
            <li className="animate__animated animate__slideInLeft"><Link className='link' to='/beauty'>BEAUTY</Link></li>
            <li className="animate__animated animate__slideInLeft"><Link className='link' to='/jewelery'>JEWELERY</Link></li>
            <li className="animate__animated animate__slideInLeft"><Link className='link' to='/clothing'>CLOTHING</Link></li>
          </ul>
        </div> : null}
        <div className='cart-icon'>
          {users.map(u => u.email === Cookies.get()['user'] && u.role==='admin' ? <Link className='link' to='/newsletter'><FontAwesomeIcon icon={faEnvelopeOpenText}/></Link> : null)}
          <Link className='link' to='/user'><FontAwesomeIcon icon={faUser} /></Link>
          <Link className='link' to='/cart'><FontAwesomeIcon icon={faShoppingBasket} /></Link>
        </div>
      <div className='mobile-menu'>
        <MobileMenu users={users}/>
      </div>
    </div>
  );
}

export default App;
