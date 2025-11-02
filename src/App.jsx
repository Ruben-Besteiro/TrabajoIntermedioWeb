import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Formulario from './Formulario.jsx'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)
  const [busqueda, setBusqueda] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <>
      <h1>API</h1>
      <Formulario/>
    </>
  )
}