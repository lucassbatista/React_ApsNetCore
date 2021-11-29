import React from 'react'
import AtividadeItem from './AtividadeItem';

export default function AtividadeLista(props) {
    return (
        <div className="mt-3">
        <ul className="list-group">
          {props.atividades.map(ativ => (
              <AtividadeItem
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
