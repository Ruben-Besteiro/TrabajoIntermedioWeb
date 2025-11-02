import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
    // No sé XD
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
    </>
  )
}