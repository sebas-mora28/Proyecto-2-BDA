import React, { useEffect, useState } from 'react'
import './style.scss'

const TopClients = () => {

    const [topClients, setTopClients] = useState([]);

    useEffect(() => {

    }, [])

    return (
      <div className='body-top-clients'>
          <div className="container-top-clients">
            <h1 className="titulo">Top 5 clientes con más compras</h1>
              <table className="tabla">
                <thead className="thead">
                  <tr>
                    <th>Nombre del cliente</th>
                    <th>Unidades totales adquiridas</th>
                  </tr>
                </thead>
                <tbody>
                    {
                        topClients.map((client) => {
                            return (
                                <tr>
                                <td>{client.name}</td>
                                <td>{client.units}</td>
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

export default TopClients