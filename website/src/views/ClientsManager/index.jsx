import React, { useEffect } from 'react'
import { useState } from 'react';
import "./style.scss"
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../utils/constants';

const ClientsManager = () => {

  const [clients, setClients] = useState([])


  const updateClients = () => {
    axios.get(`${baseUrl}/clients`).then((response) => {
      if(response.data) {
        console.log(response.data)
        setClients(response.data)
      }
    }).catch((error) => {
      console.log(error)
    })

  }

 
  useEffect(() => {
    updateClients()
  }, [])

  const deleteClient = (id) => {

    axios({method: 'DELETE', url: `${baseUrl}/client`, data: {id: id}}).then((response) => {
      if(response.data){
        console.log(response.data)
        updateClients()
      }
    }).catch((error) => {
      console.log(error)
    })

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
                  <a className="botonAgregar" href="/register-client">
                    <Icon icon="uil:plus" />
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>

              {
                clients.map((client) => {
                  return (
                    <tr key={client.c.id}>
                    <td>{client.c.id}</td>
                    <td>{client.c.first_name}</td>
                    <td>{client.c.last_name}</td>
                    <td>
                      <Link to={`/edit-client/${client.c.id}`}>
                        <Icon icon="uil:pen"/>
                      </Link>
                    </td>
                    <td>
                      <button style={{background: 'transparent', border: 'transparent'}} onClick={() => deleteClient(client.c.id)}>
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

export default ClientsManager