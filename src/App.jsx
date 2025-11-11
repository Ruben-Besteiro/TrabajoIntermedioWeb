import { useState, useEffect } from 'react'
import Formulario from './Formulario.jsx'
import Serie from './Serie.jsx'
import Modal from './Modal.jsx'

export default function App() {
  // Inicializamos los favoritos desde localStorage
  const [favs, setFavs] = useState(() => {
    const storedFavs = localStorage.getItem('favs');
    return storedFavs ? JSON.parse(storedFavs) : [];
  });
  const [resultados, setResultados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSerie, setSelectedSerie] = useState(null);

  // Cada vez que cambian los favoritos, se guardan en el localStorage
  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favs));
  }, [favs]);


  // Añadir o quitar de favoritos (desde la sección de resultados)
  function handleToggleFav(item) {
    const id = item.show?.id || item.id; // puede venir desde resultados o favoritos (es diferente)

    // Si ya está en favoritos -> eliminar
    if (favs.some(f => f.id === id)) {
      setFavs(prev => prev.filter(f => f.id !== id));
      return;
    }

    // Pero si no está -> añadir
    const show = item.show || item; // soporte para ambas estructuras
    const showConBugArreglado = {     // Esto hay que hacerlo porque las imágenes son objetos pero necesitamos pillar solo el link
      ...show,
      image: show.image ? show.image.medium || show.image.original : null,
    };
    setFavs([...favs, showConBugArreglado]);
  }

  // Quitar de favoritos (desde la lista de favoritos)
  function handleRemoveFromFavs(item) {
    setFavs(prev => prev.filter(f => f.id !== item.id));
  }

  // Muestra el modal cuando le damos
  function handleShowInfo(item) {
    setSelectedSerie(item);
    setShowModal(true);
  }

  return (
    <>
      <h1>Trabajo Intermedio de Rubén Besteiro</h1>

      <Formulario
        onToggleFav={handleToggleFav}
        favs={favs}
        resultados={resultados}
        setResultados={setResultados}
        handleSI={handleShowInfo}
      />

      <h2>Favoritos</h2>
      {favs.map((item) => (
        <Serie
          key={item.id}
          nombre={item.name}
          imagen={item.image}
          onATF={() => handleRemoveFromFavs(item)}
          onInfo={() => handleShowInfo(item)}
          isFav={true}
        />
      ))}

      {/* Esto lo tenemos siempre pero solo lo hacemos visible cuando le demos a algo */}
      <Modal
        serie={selectedSerie}
        show={showModal}
        onClose={() => setShowModal(false)}>
        {selectedSerie && (
          <div>
            <h2>{selectedSerie.name}</h2>
            {selectedSerie.image && (
              <img
                src={
                  typeof selectedSerie.image === "string" ? selectedSerie.image : selectedSerie.image.medium
                }
                alt={selectedSerie.name}
              />
            )}
            <p><b>Géneros:</b> {selectedSerie.genres.join(', ')}</p>
            <p><b>Idioma:</b> {selectedSerie.language}</p>
            <p><b>Sitio oficial:</b><a href={selectedSerie.officialSite}>{selectedSerie.officialSite}</a></p>
            <p><b>Estrenada:</b> {selectedSerie.premiered}</p>
            <p><b>Finalizada:</b> {selectedSerie.ended}</p>
            <p><b>Duración:</b> {selectedSerie.runtime} min</p>
            <p><b>Estado:</b> {selectedSerie.status}</p>
            <p><b>Tipo:</b> {selectedSerie.type}</p>
            <p><b>Resumen:</b> {selectedSerie.summary?.replace(/<[^>]+>/g, '')}</p>
          </div>
        )}
      </Modal>
    </>
  );
}