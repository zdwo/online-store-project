import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


function Cart() {

  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])
  const history = useHistory()

  useEffect(() => {
    axios.get('http://localhost:5000/products')
    .then(response => setProducts(response.data))
    .catch(error => console.log(error))
  })

  useEffect(() => {
    if (Cookies.get()['cart']) {
      setCart(JSON.parse(Cookies.get()['cart']))
    } else {}
  }, [])


    return (
      <div className='cart-page'>
        <div className='cart'>
          {!Cookies.get()['cart'] ? <div>Your cart is empty.</div> : cart.map(p => products.map(pr => pr.name===p ? 
          <div className='product'>
            <img className="cart-pic" src={pr.picture} alt="img"/>
            <p className="cart-name" onClick={() => history.push(`/${pr._id}`)}>{pr.name}</p>
          </div> : null
          ))}
          {/* {Cookies.get()['cart'] ? JSON.parse(Cookies.get()['cart']).map(p => <p>{p}</p>) : <p></p>} */}
        </div>
        <button>Place an order <FontAwesomeIcon icon={faShoppingBag}/></button>
      </div>
    );
}

export default Cart;




