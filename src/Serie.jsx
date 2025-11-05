export default function Serie({ nombre, imagen }) {
  return (
    <button
      /*style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        margin: "10px",
        width: "200px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}*/
    >
      <h3 /*style={{ fontSize: "1.1rem", color: "#333" }}*/>{nombre}</h3>
      {imagen ? (
        <img
          src={imagen}
          alt={nombre}
          style={{ width: "100%", borderRadius: "8px", marginTop: "5px" }}
        />
      ) : (
        <p style={{ fontStyle: "italic", color: "#666" }}>Sin imagen disponible</p>
      )}
    </button>
  );
}