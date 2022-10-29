import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './style.scss'

const ClientPurchases = () => {

  const [clientPurchases, setClientPurchases] = useState([])

  const params = useParams();

  useEffect(() => {

  }, [])


  return (
    <div className='body-client-purchases'>
        <div className="container-client-purchases">
            <h1 className="titulo">Compras del cliente</h1>
            <table className="tabla">
              <thead className="thead">
                <tr>
                  <th>Nombre del producto</th>
                  <th>Cantidad comprada</th>
                </tr>
              </thead>
              <tbody>
                {
                  clientPurchases.map((purchase) => {
                    return (
                      <tr>
                      <td>{purchase.product}</td>
                      <td>{purchase.amount}</td>
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

export default ClientPurchases