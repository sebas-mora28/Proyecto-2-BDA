import React from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate();

  return (
      <div className="container-home">
          <div className="cards">
            <div className="card" onClick={() => navigate("/upload-files")}> 
              <div className="icon"></div>
              <h2 className="title">Cargar datos de clientes, productos, marcas y compras</h2>  
            </div>
            <div className="card" onClick={() => navigate("/clients-manager")}>
              <div className="icon"></div>
              <h2 className="title">Mantenimiento de clientes</h2>
            </div>
            <div className="card" onClick={() => navigate("/products-manager")}>
              <div className="icon"></div>
              <h2 className="title">Mantenimiento de catálogo</h2>
            </div>
            <div className="card" onClick={() => navigate("/register-purchase")}>
              <div className="icon"></div>
              <h2 className="title">Registro de compras</h2>
            </div>
            <div className="card" onClick={() => navigate("/general-requests")}> 
                <div className="icon"></div>
                <h2 className="title">Consultas generales</h2>
            </div>
            <div className="card" onClick={() => navigate("/especial-requests")}>
                <div className="icon"></div>
                <h2 className="title">Consultas especializadas</h2>
              </div>
          </div>
      </div>
  )
}

export default Home;
