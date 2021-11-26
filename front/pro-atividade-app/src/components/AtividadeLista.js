import React from 'react'
import Atividade from './Atividade';

export default function AtividadeLista(props) {
    return (
        <div className="mt-3">
        <ul className="list-group">
          {props.atividades.map(ativ => (
              <Atividade
                  key={ativ.id}
                  ativ={ativ}
                  pegarAtividade={props.pegarAtividade}
                  handleConfirmModal={props.handleConfirmModal}
              />
          ))}
        </ul>
      </div>
    )
}
