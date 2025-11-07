export default function Serie({ nombre, imagen, onATF, isFav }) {
  return (
    <button className={`serie ${isFav ? 'fav' : ''}`} onClick={onATF}>
      <h3>{nombre}</h3>
      {imagen ? (
        <img
          src={imagen}
          alt={nombre}
          style={{ width: "100%", borderRadius: "8px", marginTop: "5px" }}
        />
      ) : (
        <img
          src="https://pngimg.com/uploads/question_mark/question_mark_PNG22.png"
          alt={nombre}
          style={{ width: "155px", borderRadius: "8px", marginTop: "5px" }}
        />
      )}
    </button>
  );
}