import Cookies from "js-cookie"
import React, { useContext } from "react"
import Auth from "../utils/Auth"
import { signout } from "./auth-api"

function UserPage() {

    const auth = useContext(Auth)
    const handleLogout = async () => {
        const res = await signout()
        auth.setAuth(res.data.auth)
        Cookies.remove('user')
    }

    return (
        <div>
            <h1>Uszanowanko</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default UserPage