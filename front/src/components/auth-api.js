import axios from 'axios'

const signin = async (user) => {
    const result = await axios.post('/user/signin', user)
    return result
}

const signup = async (user) => {
    const result = await axios.post('/user/signup', user)
    return result
}

const isSignedIn = async () => {
    const res = await axios.get('/user/signedin')
    return res
}

const signout = async () => {
    const res = await axios.get('/user/signout')
    return res
}

export {
    signin,
    signup,
    isSignedIn,
    signout
}