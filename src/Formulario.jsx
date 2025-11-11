import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Serie from './Serie.jsx'

export default function Formulario({ onToggleFav, favs, handleSI }) {
  const [cosas, setCosas] = useState([]);
  const { register, handleSubmit } = useForm();
  var a;

  // Buscar series
  async function onSubmit(data) {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${data.busqueda}`);
    const json = await response.json();

    // Filtramos por género
    const filteredResults = json.filter(item =>
      item.show.genres.includes(data.genero)
    );
    console.log('Resultados filtrados:', filteredResults);
    setCosas(filteredResults);
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("busqueda", { required: true })}
          placeholder="Buscar serie..."
        />
        <select {...register("genero", { required: true })}>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Action">Action</option>
          <option value="Thriller">Thriller</option>
          <option value="Science-Fiction">Science Fiction</option>
        </select>
        <button type="submit">Buscar</button>
      </form>

      {/* Listado de resultados */}
      {cosas.length > 0 &&
        cosas.map((item, index) => {
          const isFav = favs.some(f => f.id === item.show.id);
          return (
            <Serie
              key={index}
              nombre={item.show.name}
              imagen={item.show.image ? item.show.image.medium : ""}
              onATF={() => onToggleFav(item)}
              onInfo={() => handleSI(item.show)
              }
              isFav={isFav}
            />
          );
        })}
    </>
  );
}
