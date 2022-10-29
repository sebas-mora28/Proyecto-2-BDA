import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../utils/parser/constants';
import './style.scss'
import axios from 'axios';
const TopClients = () => {

    const [topClients, setTopClients] = useState([]);

    useEffect(() => {

      axios({method: 'GET', url: `${baseUrl}/top5Consumers`}).then((response) => {
        if(response.data){
          console.log("Top clients: ", response.data)
          setTopClients(response.data)
        }
      })

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
                                <tr key={client.Nombre_Cliente}>
                                <td>{client.Nombre_Cliente}</td>
                                <td>{client.Unidades_Adquiridas}</td>
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