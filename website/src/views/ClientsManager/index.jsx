import React, { useEffect } from 'react'
import { useState } from 'react';
import "./style.scss"
import { Icon } from '@iconify/react';

const ClientsManager = () => {

  const [clients, setClients] = useState([{
    id: 1,
    name: "sebastian",
    lastNames: "mora"
  }])


  useEffect(() => {

  }, [])

  const deleteClient = () => {

  }

  return (
    <div className='container'>
      <div className="container-crud">
        <h1 className="titulo">Mantenimiento de clientes</h1>
          <table className="tabla">
            <thead className="thead">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Editar</th>
                <th>Eliminar</th>
                <th>
                  <a className="botonAgregar" href="./">
                    <Icon icon="uil:plus" />
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>

              {
                clients.map((client) => {
                  return (
                    <tr>
                    <td>{client.id}</td>
                    <td>{client.name}</td>
                    <td>{client.lastNames}</td>
                    <td>
                      <Icon icon="uil:pen" />
                    </td>
                    <td>
                      <Icon icon="uil:trash" />
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

export default ClientsManager