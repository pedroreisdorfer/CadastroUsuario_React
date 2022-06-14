import './Logo.css'
import logo from '../../assets/imgs/logo.png'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className='logo'>
        <Link to="/" className="logo"> {/* agora se eu apertar no logo vai para o Início também */}
            <img src={logo} alt="logo" />
        </Link>
    </aside>
