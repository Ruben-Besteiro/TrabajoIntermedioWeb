// Serie.jsx
export default function Serie({ nombre, imagen, onATF, isFav, onInfo }) {
  // Las series tienen 2 botones, el de la información y el de favoritos
  
  return (
    <>
      <button className={`serie ${isFav ? 'fav' : ''}`} onClick={onInfo}>
          <h2>{nombre}</h2>
          {imagen ? (
            <img
              src={imagen}
              alt={nombre}
            />
          ) : (
            <img src="https://pngimg.com/uploads/question_mark/question_mark_PNG22.png" alt={nombre} />
          )}
        </button>
      <button onClick={onATF}>
        {isFav ? "💔" : "❤️"}
      </button>
    </>
  );
}