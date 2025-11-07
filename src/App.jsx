import { useState } from 'react'
import Formulario from './Formulario.jsx'
import Serie from './Serie.jsx'
import './App.css'

export default function App() {
  const [favs, setFavs] = useState([]);

  const handleAddToFavs = (item) => {
    // Normalizamos la estructura al añadir
    const normalizedItem = {
      id: item.show.id,
      name: item.show.name,
      image: item.show.image ? item.show.image.medium : null
    };
    
    if (!favs.some(f => f.id === normalizedItem.id)) {
      setFavs([...favs, normalizedItem]);
    }
  };

  const handleRemoveFromFavs = (item) => {
    setFavs(favs.filter(f => f.id !== item.id));
  };

  return (
    <>
      <h1>API</h1>
      <Formulario onAddToFavs={handleAddToFavs} favs={favs} />

      <h2>Favoritos</h2>
      {favs.map((item, index) => (
        <Serie
          key={index}
          nombre={item.name}
          imagen={item.image}
          onATF={() => handleRemoveFromFavs(item)}
          isFav={true}
        />
      ))}
    </>
  );
}