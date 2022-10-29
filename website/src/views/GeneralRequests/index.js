import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';
import './style.scss'


const GeneralRequests = () => {

  const navigate = useNavigate()
  
  return (
    <div className="container-gr">
      <div className="cards">
        <div className="card" onClick={() => navigate("/top-products")}>
          <div className="icon"><Icon icon="uil-list-ol-alt" /></div>
          <h2 className="title">Top 5 de productos más vendidos</h2>
        </div>
        <div className="card" onClick={() => navigate("/top-brands")}>
          <div className="icon"><Icon icon="uil-list-ol-alt" /></div>
          <h2 className="title">Top 5 de marcas más vendidas</h2>
        </div>
        <div className="card" onClick={() => navigate("/top-clients")}> 
          <div className="icon"><Icon icon="uil-list-ol-alt" /></div>
          <h2 className="title">Top 5 de clientes con más compras</h2>
        </div>
        <div className="card" onClick={() => navigate("/search-client")}> 
            <div className="icon"><Icon icon="uil-search"/></div>
            <h2 className="title">Busqueda de un cliente</h2>
        </div>
      </div>
    </div>
  )
}

export default GeneralRequests