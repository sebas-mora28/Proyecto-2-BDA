import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import "./style.scss"
import axios from 'axios';
import { baseUrl } from '../../utils/parser/constants';
import { Link } from 'react-router-dom';


const ProductsManager = () => {

    const [products, setProducts] = useState([])

    const updateProducts = () => {
      axios.get(`${baseUrl}/products`).then((response) => {
        if(response.data){
          console.log("products: ", response.data)
          setProducts(response.data)
        }
      }).catch((error) => {
        console.log(error)
      })
    }


    useEffect(() => {

      updateProducts()

    }, []) 

    const deleteProduct = (id) => {

      axios.delete(`${baseUrl}/product`, {data: {id: id}}).then((response) => {
        if(response.data){
          updateProducts()
        }
      })



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
                        <Link to="/register-product">
                          <Icon icon="uil:plus" />
                        </Link>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products.map((product) => {
                        return (
                          <tr key={product.p.id}>
                          <td>{product.p.id}</td>
                          <td>{product.p.Nombre}</td>
                          <td>{product.p.Marca}</td>
                          <td>{product.p.Precio}</td>
                          <td>
                            <Link to={`/edit-product/${product.p.id}`}>
                              <Icon icon="uil:pen" />
                            </Link>
                          </td>
                          <td>
                            <button style={{background: 'transparent', border: 'transparent'}} onClick={() => deleteProduct(product.p.id)}>
                            <Icon icon="uil:trash" />
                            </button>
                          </td>
                        </tr>
                        )
                      })
                    }
                  </tbody>
              </table>
          </div>
      </div>
  )
}

export default ProductsManager