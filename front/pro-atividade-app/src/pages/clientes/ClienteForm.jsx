import React from 'react'
import TitlePage from './../../components/TitlePage';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function ClienteForm() {
    const navegate = useNavigate();
    const { id } = useParams();

    return (
        <>
        <TitlePage title={"Cliente Detalhe " + (id !== undefined ? id : '')}>            
            <Button variant="outline-secondary" onClick={() => navegate("/cliente/lista")}>
                <i className="fas fa-chevron-left me-2"></i>
                Voltar
            </Button>
        </TitlePage>
        </>
    )
}
