import React, { useEffect, useState } from 'react'
import './style.scss'

const TopProducts = () => {

    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {

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
                                <tr>
                                    <td>{product.name}</td>
                                    <td>{product.units}</td>
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