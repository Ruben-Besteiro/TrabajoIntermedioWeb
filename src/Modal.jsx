// Modal.jsx
export default function Modal({ serie, show, onClose, children }) {
  if (!show) return null; // si no debe mostrarse, no renderiza nada

  return (
    <div className="modal" onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()} // evita que el clic interior cierre el modal
      >
        <button
          onClick={onClose}
          className="x"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
