import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../utils/Auth'
import { signup } from './auth-api'


export default function Signup() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const auth = useContext(Auth)

    const handleSubmit = async e => {
        e.preventDefault()
        const result = await signup({email, password})
        if (result.data.auth) {
            auth.setAuth(true)
        }
    }

  return(
    <div className="login-wrapper">
      <h1>Sign up</h1>
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
          <Link to='/signin' >Already have an account? Sign in.</Link>
        </div>
      </form>
    </div>
  )
}

