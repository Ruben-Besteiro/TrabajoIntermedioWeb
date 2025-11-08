import { useState, useEffect } from 'react'
import Formulario from './Formulario.jsx'
import Serie from './Serie.jsx'

export default function App() {
  // Inicializamos los favoritos desde localStorage
  const [favs, setFavs] = useState(() => {
    const storedFavs = localStorage.getItem('favs');
    return storedFavs ? JSON.parse(storedFavs) : [];
  });
  const [resultados, setResultados] = useState([]);

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
    const normalizedItem = {
      id: show.id,
      name: show.name,
      image: show.image ? show.image.medium : null,
      genres: show.genres,
      language: show.language,
      officialSite: show.officialSite,
      premiered: show.premiered,
      ended: show.ended,
      runtime: show.runtime,
      summary: show.summary,
      status: show.status,
      type: show.type,
    };
    setFavs([...favs, normalizedItem]);
  }

  // Quitar de favoritos (desde la lista de favoritos)
  function handleRemoveFromFavs(item) {
    setFavs(prev => prev.filter(f => f.id !== item.id));
  }

  return (
    <>
      <h1>Trabajo Intermedio de Rubén Besteiro</h1>

      <Formulario
        onToggleFav={handleToggleFav}
        favs={favs}
        resultados={resultados}
        setResultados={setResultados}
      />

      <h2>Favoritos</h2>
      {favs.map((item) => (
        <Serie
          key={item.id}
          nombre={item.name}
          imagen={item.image}
          onATF={() => handleRemoveFromFavs(item)}
          onInfo={() =>
            alert(`Serie: ${item.name}
Géneros: ${item.genres.join(', ')}
Idioma: ${item.language}
Sitio oficial: ${item.officialSite}
Estrenada: ${item.premiered}
Finalizada: ${item.ended}
Duración: ${item.runtime} minutos
Resumen: ${item.summary.replace(/<[^>]+>/g, '')}
Estado: ${item.status}
Tipo: ${item.type}
`)}
          isFav={true}
        />
      ))}
    </>
  );
}
