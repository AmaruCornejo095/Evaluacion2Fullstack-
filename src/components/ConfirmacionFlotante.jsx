import React from 'react';

/**
 * Card flotante de confirmación (abajo a la derecha).
 * Reemplaza a window.confirm manteniendo al usuario en la misma página.
 */
export const ConfirmacionFlotante = ({
  mensaje,
  titulo = 'Confirmar acción',
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  onConfirmar,
  onCancelar
}) => {
  if (!mensaje) return null;

  return (
    <div className="position-fixed bottom-0 end-0 p-3 d-print-none" style={{ zIndex: 1080 }}>
      <div
        className="card border-0 border-start border-4 border-danger shadow-lg rounded-3"
        style={{ width: '340px', maxWidth: '90vw' }}
        role="dialog"
        aria-labelledby="confirmacion-flotante-titulo"
      >
        <div className="card-body p-3 text-start">
          <div className="d-flex align-items-start gap-2 mb-2">
            <span className="fs-5 lh-1">🗑️</span>
            <h6 className="fw-bold mb-0 flex-grow-1" id="confirmacion-flotante-titulo">
              {titulo}
            </h6>
            <button
              type="button"
              className="btn-close"
              aria-label="Cancelar"
              onClick={onCancelar}
            />
          </div>
          <p className="small text-muted mb-3">{mensaje}</p>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onCancelar}>
              {textoCancelar}
            </button>
            <button type="button" className="btn btn-sm btn-danger" onClick={onConfirmar}>
              {textoConfirmar}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
