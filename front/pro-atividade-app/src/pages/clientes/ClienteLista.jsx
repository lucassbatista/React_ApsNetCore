import { useState } from 'react';
import TitlePage from './../../components/TitlePage';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'


const clientes = [
    { id: 1, nome: 'Microsoft', responsavel: 'Otto', telefone: '10665544', situacao: 'Ativo' },
    { id: 2, nome: 'Amazon', responsavel: 'Dilan', telefone: '10665544', situacao: 'Ativo' },
    { id: 3, nome: 'Apple', responsavel: 'Porta', telefone: '10665544', situacao: 'Ativo' },
    { id: 4, nome: 'Google', responsavel: 'Alabama', telefone: '10665544', situacao: 'Ativo' },
    { id: 5, nome: 'Facebook', responsavel: 'Daniels', telefone: '10665544', situacao: 'Ativo' },
    { id: 6, nome: 'Instagram', responsavel: 'Jack', telefone: '10665544', situacao: 'Ativo' }
]

export default function ClienteLista() {
    const navegate = useNavigate();
    const [termoBusca, setTermoBusca] = useState('');

    const handleInputChange = (e) => {
        setTermoBusca(e.target.value);
    };

    const clienteFiltrado = clientes.filter((cliente) => {
        return (
            //cliente.nome.toLocaleLowerCase().indexOf(termoBusca.toLocaleLowerCase()) !== -1 
            Object.values(cliente).join(' ').toLocaleLowerCase().includes(termoBusca.toLocaleLowerCase())
        )
    });

    const novoCliente = () => {
        navegate('/cliente/detalhe')
    }

    return (
        <>
        <TitlePage title="Cliente Lista">
            <Button variant="outline-secondary" onClick={novoCliente}>
                <i className="fas fa-plus me-2"></i>
                Novo Cliente
            </Button>
        </TitlePage>
        <InputGroup className="mt-3 mb-3">
            <InputGroup.Text>Buscar</InputGroup.Text>
            <FormControl
                onChange={handleInputChange}
                placeholder="Buscar por nome do cliente"
            />
        </InputGroup>
        <table className="table table-striped table-hover">
            <thead className="table-dark mt-3">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Responsavel</th>
                <th scope="col">Telefone</th>
                <th scope="col">Situacao</th>
                <th scope="col">Opções</th>
                </tr>
            </thead>
            <tbody>
                {clienteFiltrado.map(cliente=> (
                    <tr key={cliente.id}>
                        <th scope="row">{cliente.id}</th>
                        <td>{cliente.nome}</td>
                        <td>{cliente.responsavel}</td>
                        <td>{cliente.telefone}</td>
                        <td>{cliente.situacao}</td>
                        <td>
                            <div>
                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => navegate(`/cliente/detalhe/${cliente.id}`)}>
                                    <i className="fas fa-user-edit me-2"></i>
                                    Editar
                                </button>
                                <button className="btn btn-sm btn-outline-danger me-2">
                                <i className="fas fa-user-times me-2"></i>
                                    Desativar
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
