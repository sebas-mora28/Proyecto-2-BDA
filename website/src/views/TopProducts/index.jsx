import React, { useEffect, useState } from 'react'
import './style.scss'
import axios from 'axios';
import { baseUrl } from '../../utils/parser/constants';

const TopProducts = () => {

    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {

      axios({method: 'GET', url: `${baseUrl}/top5Products`}).then((response) => {
        if(response.data){
          console.log("Top products: ", response.data)
          setTopProducts(response.data)
        }
      })

    }, [])

    return (
      <div className='body-top-products'>
          <div className="container-top-products">
            <h1 className="titulo">Top 5 productos con más compras</h1>
              <table className="tabla">
                <thead className="thead">
                  <tr>
                    <th>Nombre del producto</th>
                    <th>Unidades totales adquiridas</th>
                  </tr>
                </thead>
                <tbody>
                    {
                        topProducts.map((product) => {
                            return (
                                <tr key={product.Nombre_Producto}>
                                    <td>{product.Nombre_Producto}</td>
                                    <td>{product.Unidades_Vendidas}</td>
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

export default TopProducts