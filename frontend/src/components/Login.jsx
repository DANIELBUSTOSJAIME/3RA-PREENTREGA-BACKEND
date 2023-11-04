import React from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData)
        
        const response = await fetch('http://localhost:8080/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.status === 200) {
            const datos = await response.json()
            document.cookie = `jwtCookie=${datos.token}; expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()}; path=/;`
            navigate('/products')
            console.log(response)
        } else {
            console.log(response)
        }
    }

    return (
        <div className="container">
            <h2>Formulario de Login</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email: </label>
                    <input type="email" className="form-control" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña: </label>
                    <input type="password" className="form-control" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </form>
        </div>
    )
}
