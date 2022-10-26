import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import "./style.scss"


const ProductsManager = () => {

    const [products, setProducts] = useState([])


    useEffect(() => {

    }, []) 

    const deleteProduct = () => {

    }

    return (
      <div className='body'>
          <div className="container-products">
              <h1 className="titulo">Mantenimiento del catálogo</h1>
              <table className="tabla">
                  <thead className="thead">
                    <tr>
                      <th>Id</th>
                      <th>Nombre</th>
                      <th>Marca</th>
                      <th>Precio</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                      <th>
                        <a className="botonAgregar" href="/views/productos-form.html">
                          <Icon icon="uil:plus" />
                        </a>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <td>1</td>
                        <td>Oranges</td>
                        <td>Yata</td>
                        <td>305</td>
                        <td>
                          <Icon icon="uil:pen" />
                        </td>
                        <td>
                          <Icon icon="uil:trash" />
                        </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  )
}

export default ProductsManager