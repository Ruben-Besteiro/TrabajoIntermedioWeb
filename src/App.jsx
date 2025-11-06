import { useState } from 'react'
import Formulario from './Formulario.jsx'
import Serie from './Serie.jsx'
import './App.css'

export default function App() {
  const [favs, setFavs] = useState([]);

  const handleAddToFavs = (item) => {
    // Evitamos duplicados
    if (!favs.some(f => f.show.id === item.show.id)) {
      setFavs([...favs, item]);
    }
  };

  return (
    <>
      <h1>API</h1>
      <Formulario onAddToFavs={handleAddToFavs} />

      <h2>Favoritos</h2>
      {
        favs.map((item, index) => (
          <Serie
            key={index}
            nombre={item.show.name}
            imagen={item.show.image ? item.show.image.medium : ""}
          />
        ))
      }
    </>
  );
}