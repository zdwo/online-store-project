import axios from 'axios'
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'
import uuid from 'react-uuid'

// export const createCookie = () => {
//     if (document.cookie) {
//         return document.cookie
//     } else {
//         const id = `userUUID=${uuid()}`

//         const date = new Date()
//         date.setTime(date.getTime()+30*60*1000)
//         const exp = `expires=${date.toUTCString()}`

//         document.cookie = `${id};${exp};SameSite=Lax`
//         return document.cookie
//     }
// }


function Cart() {



    return (
      <div>
        {Cookies.get()['cart'] ? JSON.parse(Cookies.get()['cart']).map(p => <p>{p}</p>) : <p></p>}
      </div>
    );
}

export default Cart;




