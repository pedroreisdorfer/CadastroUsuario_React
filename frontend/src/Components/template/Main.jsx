import './Main.css'
import React from 'react'
import Header from './Header'

export default props => // componente funcional, pois não tem estado. Uso de React.Fragment para retornar mais de um elemento. Assim consigo retornar no Main o HEADER E O CONTEÚDO DA PÁGINA. Irá retornar tag header e main sem precisar envolver eles em uma div
    <React.Fragment>
        <Header {...props} />
        <main className='content container-fluid'> {/* container-fluid é uma classe do bootstrap. Já dando certo espaçamento em Conteúdo */}
            <div className="p-3 mt-3"> {/* vai ter margin-Top 3 e padding 3 */}
                {props.children} {/* aqui vão estar as tags filhas */}
            </div>
        </main>
    </React.Fragment>

// com {...props} as props que recebi no Main estão sendo propagadas para o Header. Definidas em App.jsx
{/* */ }