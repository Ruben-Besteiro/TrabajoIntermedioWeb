import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Serie from './Serie.jsx'

export default function Formulario() {
  const [cosas, setCosas] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [ formData, setFormData ] = useState({
    busqueda: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data) => {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${data.busqueda}`);
    const json = await response.json();
    setCosas(json);

    const nombres = json.map(item => item.show.name);
      
    console.log(nombres.join('\n'));
    alert(`Se encontró: ${nombres.join('\n')}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text"
        {...register("busqueda", { required: true })}
        placeholder="Busqueda">
        </input>
        <button></button>
      </form>
      <div>
        {cosas.length > 0 && cosas.slice(0, 10).map((item, index) => (
          <Serie
            key={index}
            nombre={item.show.name}
            imagen={item.show.image ? item.show.image.medium : ""}
          />
        ))}
      </div>
    </>
  )
}