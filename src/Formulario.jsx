import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Serie from './Serie.jsx'

export default function Formulario({ onAddToFavs, favs }) {
  const [cosas, setCosas] = useState([]);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${data.busqueda}`);
    const json = await response.json();
    
    // Filtramos los resultados según el género que escogimos en el select
    const filteredResults = json.filter(item => 
      item.show.genres && 
      item.show.genres.includes(data.genero)    // Como hay varios, vale con que incluya solo uno
    );
    
    console.log('Resultados filtrados:', filteredResults);
    setCosas(filteredResults);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("busqueda", { required: true })}
          placeholder="Buscar serie..."
        />
        <select {...register("genero", {required: true})}>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Action">Action</option>
          <option value="Thriller">Thriller</option>
          <option value="Science-Fiction">Science Fiction</option>
        </select>
        <button type="submit">Buscar</button>
      </form>

      <div>
        {cosas.length > 0 && cosas.slice(0, 50).map((item, index) => (
          <Serie
            key={index}
            nombre={item.show.name}
            imagen={item.show.image ? item.show.image.medium : ""}
            onATF={() => onAddToFavs(item)}
            isFav={favs.some(f => f.id === item.show.id)}
          />
        ))}
      </div>
    </>
  );
}