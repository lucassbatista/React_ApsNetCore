import { useState, useEffect } from 'react';
import './App.css';
import { Button, Modal} from 'react-bootstrap'
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';
import api from './api/atividade'

function App() {
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, setShowConfirmModal] = useState(false);
  const [atividades, setAtividades] = useState([])
  const [atividade, setAtividade] = useState({ id: 0})

  const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);
  const handleConfirmModal = (id) => {
    if(id !== 0 && id !== undefined){
      const atividade = atividades.filter(atividade => atividade.id === id)
      setAtividade(atividade[0])
    }else{
      setAtividade({id: 0})
    }
    setShowConfirmModal(!smShowConfirmModal)
  }

  const pegaTodasAtividades = async () => {
    const response = await api.get('Atividade');
    return response.data;
  }

  useEffect(() =>{
      const getAtividades = async () => {
          const todasAtividades = await pegaTodasAtividades();
          if(todasAtividades) setAtividades(todasAtividades);
      }
      getAtividades();
  }, [])

  const addAtividade = async (ativ) => {
    handleAtividadeModal();
    const response = await api.post('atividade', ativ)
    setAtividades([ ...atividades, response.data])
  }

  const atualizarAtividade = async (ativ) =>{
    handleAtividadeModal();
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } =  response.data;
    setAtividades(atividades.map(item => item.id === id ? response.data : item))
    setAtividade({id: 0})
  }

  function cancelarAtividade(){
    setAtividade({id: 0})
    handleAtividadeModal();
  }

  const deletarAtividade = async (id) => {
    handleConfirmModal(0);
    if(await api.delete(`atividade/${id}`)){
      const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id)
      setAtividades([...atividadesFiltradas])
    }
  }

  function pegarAtividade(id){
    const atividade = atividades.filter(atividade => atividade.id === id)
    setAtividade(atividade[0])
    handleAtividadeModal();
  }

  const NovaAtividade = () => {
    setAtividade({id: 0})
    handleAtividadeModal()
  }

  return (
    <>          
    <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-dark">
      <h1 className="m-0 p-0"> Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
      <Button variant="outline-secondary" onClick={NovaAtividade}>
          <i className="fas fa-plus"></i>
      </Button>
    </div>
      <AtividadeLista
          atividades={atividades}
          pegarAtividade={pegarAtividade}
          handleConfirmModal={handleConfirmModal}
      />

      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
          <Modal.Header closeButton>
            <Modal.Title> 
              <h1 className="m-0 p-0"> Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <AtividadeForm
            addAtividade={addAtividade}
            cancelarAtividade={cancelarAtividade}
            atualizarAtividade={atualizarAtividade}
            atividades={atividades}
            ativSelecionada={atividade}
          />
          </Modal.Body>
      </Modal>
      <Modal size="sm" show={smShowConfirmModal} onHide={handleConfirmModal}>
          <Modal.Header closeButton>
            <Modal.Title> 
              Excluindo Atividade {atividade.id !== 0 ? atividade.id : ''}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que deseja excluir a Atividade  {atividade.id}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <button className="btn btn-outline-success ms-2 mb-1" onClick={() => deletarAtividade(atividade.id)}>
            <i className="fas fas-check me-2"></i>
              Sim
            </button>
            <button className="btn btn-outline-danger me-2 mb-1" onClick={() => handleConfirmModal(0)}>
            <i className="fas fas-times me-2"></i>
              Não
            </button>
          </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
