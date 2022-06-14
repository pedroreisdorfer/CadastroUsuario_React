import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from '../Components/home/Home'
import UserCrud from "../Components/user/UserCrud";

export default props => ( // aqui houve mudança do projeto atual, devido atualização do react-router-dom
    <Routes>
        <Route exact path="/" element={<Home />} /> {/* sempre que o usuário navegar por barra ele vai renderizar o componente Home. Foi colocado exact, pois só vou renderizar Home se for colocado só a barra, já que logo depois vem a opção de  /users */}
        <Route path="/users" element={<UserCrud />} />
        <Route path="*" element={<Home />} />
    </Routes>
);
