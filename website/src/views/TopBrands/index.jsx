import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../utils/constants';
import './style.scss'

const TopBrands = () => {

    const [topBrands, setTopBrands] = useState([]);
    const [alert, setAlert] = useState(false)

    const showAlert = () => {
      setAlert(false)
      setTimeout(() => {
        setAlert(true)
      }, 1500)

    }

    useEffect(() => {

      axios({method: 'GET', url: `${baseUrl}/top5Brands`}).then((response) => {
        if(response.data){
          console.log("Marcas mas vendidas: ", response.data)
          setTopBrands(response.data)
        }
      })
    }, [])

    return (
      <>
      <div className='body-top-brands'>
          <div className="container-top-brands">
            <h1 className="titulo">Top 5 marcas más vendidas</h1>
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
                                <td>{brand.Nombre_Marca}</td>
                                <td>{brand.Pais_Origen}</td>
                                <td>{brand.Unidades_Vendidas}</td>
                              </tr>
                            )
                        })
                    }
                </tbody>
              </table>
          </div>
      </div>
      </>
  )
}

export default TopBrands;