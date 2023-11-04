import React from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const SignUp = () => {

  const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData)
        
        const response = await fetch('http://localhost:8080/api/sessions/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.status === 200) {
            const datos = await response.json()
            console.log(datos)
            navigate('/login')
            
        } else {
            console.log(response)
        }
      }
  return (
    <div className="container">
            <h2>Formulario de Registro</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre: </label>
                    <input type="text" className="form-control" name="name" aria-describedby="nameHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Apellido: </label>
                    <input type="text" className="form-control" name="lastName" aria-describedby="lastNameHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Edad: </label>
                    <input type="number" className="form-control" name="age" aria-describedby="ageHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email: </label>
                    <input type="email" className="form-control" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña: </label>
                    <input type="password" className="form-control" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>
        </div>
  )
}
