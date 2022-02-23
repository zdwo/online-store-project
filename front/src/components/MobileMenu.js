import { faEnvelopeOpenText, faBars, faShoppingBasket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";

function MobileMenu({users}) {

    const [open, setOpen] = useState(false)

    const openMenu = () => {
        setOpen(!open)
    }


    return (
        <div>
            <button className="burger-menu" onClick={openMenu}><FontAwesomeIcon icon={faBars} /></button>
            {open ? 
                <div className="animate__animated animate__slideInRight nav-mobile">
                    <button onClick={openMenu}>X</button>
                    <ul className='menu-list'>
                        <li><Link onClick={openMenu} className='link' to='/beauty'>BEAUTY</Link></li>
                        <li><Link onClick={openMenu} className='link' to='/jewelery'>JEWELERY</Link></li>
                        <li><Link onClick={openMenu}className='link' to='/clothing'>CLOTHING</Link></li>
                    </ul>
                    <div className='cart-icon-mobile'>
                    {users.map(u => u.email === Cookies.get()['user'] && u.role==='admin' ? <Link onClick={openMenu} className='link' to='/newsletter'><FontAwesomeIcon icon={faEnvelopeOpenText}/></Link> : null)}
                    <Link onClick={openMenu} className='link' to='/user'><FontAwesomeIcon icon={faUser} /></Link>
                    <Link onClick={openMenu} className='link' to='/cart'><FontAwesomeIcon icon={faShoppingBasket} /></Link>
                    </div>
                </div>
            : null}
        </div>
    )
}

export default MobileMenu;