import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


function Cart() {

  const [cart, setCart] = useState({})
  const [products, setProducts] = useState([])
  const [user, setUser] = useState('')
  const [order, setOrder] = useState([])
  const history = useHistory()

  useEffect(() => {
    axios.get('http://localhost:5000/products')
    .then(response => setProducts(response.data))
    .catch(error => console.log(error))
  }, [])

  const findDupes = (arr) => {
    const res = {}
    arr.map(el => res[el] ? res[el]+=1 : res[el]=1)
    return res
  }

  useEffect(() => {
    if (Cookies.get()['user']) {
      setUser(Cookies.get()['user'])
    } else {
      setUser('guest')
    }
  }, [])

  useEffect(() => {
    if (Cookies.get()['cart']) {
      const c = findDupes(JSON.parse(Cookies.get()['cart']))
      setCart(c)
    } else {}
  }, [])

  const handleSubmit = () => {
    Object.keys(cart).map(k => products.map(pr => pr.name===k ? order.push(`${k} (${cart[k]})`) : null))
    axios.post('http://localhost:5000/orders', {user: user, products: order})
    .then(() => Cookies.remove('cart'))
    .then(() => setCart({}))
    .then(() => alert('Thank you for placing an order! You will soon receive a confimation email.'))
    .catch(error => console.log(error))
  }

  const removeItems = () => {
    const c = window.confirm('Are you sure you want to empty your basket?')
    if (c) {
      Cookies.remove('cart')
      setCart({})
    } else {}
  }

  // const removeItem = (toDel) => {
  //   const index = JSON.parse(Cookies.get()['cart']).indexOf(toDel)
  //   if (index > -1) {
  //     const n = JSON.parse(Cookies.get()['cart'])
  //     n.splice(index, 1)
  //     Cookies.set('cart', JSON.stringify(n), {expires: new Date(new Date().getTime() + 60*60*1000)})
  //     if (n.length === 0) {
  //       Cookies.remove('cart')
  //     }
  //   }
  //   Object.keys(cart).map(k => k===toDel ? cart[k]===1 ? delete cart[k] : cart[k]-=1 : null)
  // }


    return (
      <div className='cart-page'>
        <div className='cart'>
          {!Cookies.get()['cart'] ? <div>Your cart is empty.</div> : Object.keys(cart).map(k => products.map(pr => pr.name===k ? 
          <div className='product'>
            <img className="cart-pic" src={pr.picture} alt="img"/>
            <p className="cart-name" onClick={() => history.push(`/${pr._id}`)}>{pr.name}</p>
            <p>{cart[k]}</p>
            {/* <button><FontAwesomeIcon icon={faMinus}/></button> */}
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




