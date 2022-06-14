import './Header.css'
import React from 'react'

export default props =>
    <header className='header d-nome d-sm-flex flex-column'>
        <h1 className="mt-3">
            <i className={`fa fa-${props.icon}`}></i> {props.title}
        </h1>
        <p className="lead text-muted">{props.subtitle}</p>
    </header>

    //  className='header d-nome d-sm-flex' Significado: aqui está um pouco de responsividade:
    // d-nome = para dispositivos celulares o header não vai aparecer
    // d-sm-flex = se dispositivo por do tipo sm então ele vai usar o display flex, no caso para dispositivos pquenos, médios, grandes e extragrandes
    //  fa = font awsome 
    // props.icone é a propriedade icon que está lá em app.jsx, definida como home
    // props.title é o Início
