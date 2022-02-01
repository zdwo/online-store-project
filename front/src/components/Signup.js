import Cookies from 'js-cookie'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../utils/Auth'
import { signup } from './auth-api'


function Signup() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const auth = useContext(Auth)

    const handleSubmit = async e => {
        e.preventDefault()
        const result = await signup({email, password})
        if (result.data.auth) {
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
      <h1>SIGN UP</h1>
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
          <button type="submit">Sign up</button>
          <Link className='link link-form' to='/signin' >Already have an account? Sign in.</Link>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Signup;