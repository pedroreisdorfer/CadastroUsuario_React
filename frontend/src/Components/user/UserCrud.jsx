import React, { Component } from "react"
import Main from "../template/Main"
import axios from 'axios'

const headerProps = { // criação de objeto com propriedades do cabeçalho
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/users' // para ser falado com backend correto é preciso colocar o localhost dele corretamente
const initialState = {
    user: { name: '', email: '' },
    list: []
}

export default class UserCrud extends Component { // criação de componente de classe, pois vai ser trabalhado método de ciclo de vida e testá-lo

    state = { ...initialState } // iniciando meu estado

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }// função que será chamada quando o componente for exibido na tela // faço uma chamada no meu backend para obter a lista do que já esá cadastrado

    clear() { // limpa o formulário quando depois de ter digitado o formulário for clicado em cancelar. Ou seja, limpa  user
        this.setState({ user: initialState.user })
    }

    save() { // função que servir tanto para inserir novo usuário como para alterar usuário existente // interssante ressaltar. Quando se quer incluir (post de requisição), o usuário ainda não tem id. Já quando se quer alterar (PUT de requisição) o usuário já tem id
        const user = this.state.user
        const method = user.id ? 'put' : 'post' // se o user.id estiver setado, então vou aletrar/atualizar. Caso contrário eu vou inserir
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl // se o user.id estiver setado, então depois de http://localhost:3001/users vai ser colocado o id. Caso contrário só o baseUrl
        axios[method](url, user) // axios chamando a função method que está passando como parâmetro de entrada (url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data) // rest.data Retorna exatamente os dados retornados pelo json server. Ou seja, usuário obtido do backend
                this.setState({ user: initialState.user, list }) // estado então alterado do user e lista atualizada
            })
    } // o que estou fazendo: um post ou put para a url http://localhost:3001/users o json server vai persistir esse usuário no meu db.json e o próprio jsonserver retorna para mim o usuário já com id preenchido, e se tiver já com nome e email já retorna o objeto atualizado

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)// filter gera lista com id diferente do que foi passado
        if (add) list.unshift(user) // unshift coloca elemento na primeira posição do array
        return list
    } // foi gerada uma lista sem o usuário que passei como parâmetro e depois adicionei o usuário na primeira posição desta lista. Retorna list que vai para a função save que atualiza estado do meu componente

    updateField(event) { // para atualizar campos nome e email
        const user = { ...this.state.user } // clonando meu usuário. Assim não altero a referÊncia diretamente
        user[event.target.name] = event.target.value // vou usar o nome do input para procurar a propriedade dentro de user. Recebo então o valor que está dentro do meu campo input
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)} // recebendo o event
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end"> {/* para todos os dispositivos ocupe as 12 colunas */}
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) { // para carregar usuário quando eu for alterar
        this.setState({ user })
    }

    remove(user) { // remove usuário tanto do backend como da lista local
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }


    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() { // função responsável por renderizar as linhas
        return this.state.list.map(user => { // vou mapear neste caso a lista de usuários que estão dentro do usuário do meu objeto para trechos de jsx
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}

// método de ciclo dew vida:
// componentWillMount():  antes do componente ser exibido ele vai executar essa função,
// que vai servir para obter do backend a lista de usuários para que possa ser renderizado a tabela por exemplo que vai ser exibida nesse componente