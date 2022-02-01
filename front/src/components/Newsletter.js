import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import { useState } from 'react'


function Newsletter() {

    const [email, setEmail] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()
        const result = await axios.post('http://localhost:5000/newsletter', {email})
        document.getElementById('myform').reset();
        alert('Thank you for joining our newsletter!')
        return result
    }


  return(
    <div className="newsletter">
      <h1>SIGN UP FOR A NEWSLETTER</h1>
      <form onSubmit={handleSubmit} id='myform'>
          <h3>Type in your email to receive weekly promos and updates!</h3>
          <div className="form__group field">
            <input type="text" onChange={e => setEmail(e.target.value)} className="form__field" placeholder="Email" name="email" id='email' />
            <label className="form__label">Email</label>
            <button type="submit"><FontAwesomeIcon icon={faChevronRight} /></button>
          </div>
      </form>
    </div>
  )
}

export default Newsletter;
