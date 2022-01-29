import Cookies from 'js-cookie'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../utils/Auth'
import { signin } from './auth-api'


export default function Signin() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const auth = useContext(Auth)
    const handleSubmit = async e => {
        e.preventDefault()
        const res = await signin({email, password})
        if (res.data.auth) {
          auth.setAuth(true)
          createCookie()
        }
    }

    const createCookie = () => {
      Cookies.set('user', email, {expires: new Date(new Date().getTime() + 60*60*1000)})
  }

  return(
    <div className='login-bg'>
    <div className="login-wrapper">
      <h1>PLEASE LOG IN</h1>
      <form onSubmit={handleSubmit}>
        <label className="form__label">
          <p>Email</p>
          <input className='form__field' type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label className="form__label">
          <p>Password</p>
          <input className='form__field' type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div className='login-d'>
          <button type="submit">Log in</button>
          <Link className='link link-form' to='/signup'>Don't have an account? Sign up.</Link>
        </div>
      </form>
    </div>
    </div>
  )
}


