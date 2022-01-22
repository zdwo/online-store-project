import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../utils/Auth'
import { signin } from './auth-api'


export default function Signin() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const auth = React.useContext(Auth)
    const handleSubmit = async e => {
        e.preventDefault()
        const res = await signin({email, password})
        if (res.data.auth) {
          auth.setAuth(true)
        }
    }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
          <Link to='/signup'>Don't have an account? Sign up.</Link>
        </div>
      </form>
    </div>
  )
}


