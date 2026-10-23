import React, { useEffect } from 'react';

const ESTILOS = {
  success: { borde: 'border-success', icono: '✅' },
  warning: { borde: 'border-warning', icono: '⚠️' },
  danger: { borde: 'border-danger', icono: '❌' },
  info: { borde: 'border-info', icono: 'ℹ️' }
};

/**
 * Card flotante de notificación (abajo a la derecha).
 * Se cierra sola después de `duracion` ms o con el botón ×.
 */
export const AvisoFlotante = ({ mensaje, titulo, tipo = 'success', onClose, duracion = 4000 }) => {
  useEffect(() => {
    if (!mensaje) return undefined;

    const id = setTimeout(() => {
      if (onClose) onClose();
    }, duracion);

    return () => clearTimeout(id);
  }, [mensaje, tipo, titulo, duracion, onClose]);

  if (!mensaje) return null;

  const estilo = ESTILOS[tipo] || ESTILOS.success;

  return (
    <div
      className="position-fixed bottom-0 end-0 p-3 d-print-none"
      style={{ zIndex: 1080 }}
      role="status"
      aria-live="polite"
    >
      <div
        className={`card border-0 border-start border-4 ${estilo.borde} shadow-lg rounded-3`}
        style={{ width: '340px', maxWidth: '90vw' }}
      >
        <div className="card-body d-flex align-items-start gap-3 p-3 text-start">
          <span className="fs-4 lh-1">{estilo.icono}</span>
          <div className="flex-grow-1">
            {titulo && <h6 className="fw-bold mb-1">{titulo}</h6>}
            <p className="mb-0 small text-muted">{mensaje}</p>
          </div>
          <button
            type="button"
            className="btn-close"
            aria-label="Cerrar aviso"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};
