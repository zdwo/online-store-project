import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


function Cart() {

  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])
  const [user, setUser] = useState('')
  const history = useHistory()

  useEffect(() => {
    axios.get('http://localhost:5000/products')
    .then(response => setProducts(response.data))
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (Cookies.get()['cart']) {
      setCart(JSON.parse(Cookies.get()['cart']))
    } else {}
    if (Cookies.get()['user']) {
      setUser(Cookies.get()['user'])
    } else {
      setUser('guest')
    }
  }, [])

  const handleSubmit = () => {
    console.log(cart)
    axios.post('http://localhost:5000/orders', {user: user, products: cart})
    .then(() => Cookies.remove('cart'))
    .then(() => setCart([]))
    .then(() => alert('Thank you for placing an order! You will soon receive a confimation email.'))
    .catch(error => console.log(error))
  }

  const removeItems = () => {
    const c = window.confirm('Are you sure you want to empty your basket?')
    if (c) {
      Cookies.remove('cart')
      .then(() => setCart([]))
    } else {}
  }


    return (
      <div className='cart-page'>
        <div className='cart'>
          {!Cookies.get()['cart'] ? <div>Your cart is empty.</div> : cart.map(p => products.map(pr => pr.name===p ? 
          <div className='product'>
            <img className="cart-pic" src={pr.picture} alt="img"/>
            <p className="cart-name" onClick={() => history.push(`/${pr._id}`)}>{pr.name}</p>
          </div> : null
          ))}
        </div>
        <div className='btns'>
          <button onClick={handleSubmit} disabled={!Cookies.get()['cart'] ? true : false}>Place an order <FontAwesomeIcon icon={faShoppingBag}/></button>
          <button onClick={removeItems} disabled={!Cookies.get()['cart'] ? true : false}>Remove items</button>
        </div>
      </div>
    );
}

export default Cart;




