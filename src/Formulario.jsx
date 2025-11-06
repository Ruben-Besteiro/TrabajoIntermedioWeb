import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Serie from './Serie.jsx'

export default function Formulario({ onAddToFavs }) {
  const [cosas, setCosas] = useState([]);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${data.busqueda}`);
    const json = await response.json();
    setCosas(json);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("busqueda", { required: true })}
          placeholder="Buscar serie..."
        />
        <button type="submit">Buscar</button>
      </form>

      <div>
        {cosas.length > 0 && cosas.slice(0, 50).map((item, index) => (
          <Serie
            key={index}
            nombre={item.show.name}
            imagen={item.show.image ? item.show.image.medium : ""}
            onATF={() => onAddToFavs(item)}
          />
        ))}
      </div>
    </>
  );
}
