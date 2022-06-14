import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className='menu-area'>
        <nav className="menu">
            {/* Refatorar em casa*/}
            <Link to="/"> {/* Link to é uma navegação para determinado elemento. Antes estava a tag a */}
                <i className="fa fa-home"></i>
                Início
            </Link>
            <Link to="/users">
                <i clLinkssName="fa fa-users"></i>
                Usuários
            </Link>
        </nav>
    </aside>
