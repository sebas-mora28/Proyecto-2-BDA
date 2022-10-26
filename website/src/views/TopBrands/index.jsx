import React, { useEffect, useState } from 'react'
import './style.scss'

const TopBrands = () => {

    const [topBrands, setTopBrands] = useState([]);

    useEffect(() => {

    }, [])

    return (
      <div className='body-top-brands'>
          <div className="container-top-brands">
            <h1 className="titulo">Top 5 marcas con más compras</h1>
              <table className="tabla">
                <thead className="thead">
                <tr>
                    <th>Nombre</th>
                    <th>País de origen</th>
                    <th>Cantidad de unidades vendidas</th>
                </tr>
                </thead>
                <tbody>
                    {
                        topBrands.map((brand) => {
                            return (
                                <tr>
                                <td>{brand.name}</td>
                                <td>{brand.country}</td>
                                <td>{brand.units}</td>
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

export default TopBrands;