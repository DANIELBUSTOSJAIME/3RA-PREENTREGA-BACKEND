import React from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookieByName } from '../utils/formsUtils.jsx'

export const NewProducts = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData)
        const token = getCookieByName('jwtCookie')
        console.log(token)
        const response = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.status === 200) {
            const datos = await response.json()
            console.log(datos)
            
        } else {
            const datos = await response.json()
            console.log(datos)
        }
      }
  return (
    <div className="container">
            <h2>Creación de Nuevo Producto</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre: </label>
                    <input type="text" className="form-control" name="title" aria-describedby="titleHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción: </label>
                    <input type="text" className="form-control" name="description" aria-describedby="descriptionHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Categoria: </label>
                    <input type="text" className="form-control" name="category" aria-describedby="categoryHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="code" className="form-label">Código: </label>
                    <input type="text" className="form-control" name="code" aria-describedby="codeHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Precio: </label>
                    <input type="number" className="form-control" name="price" />
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock: </label>
                    <input type="number" className="form-control" name="stock" />
                </div>
                <button type="submit" className="btn btn-primary">Crear Producto</button>
            </form>
        </div>
  )
}
