import React, { useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import { areFunctionalitiesEnabled } from '../../utils/authotization';
import { Alert } from '@mui/material';

const Home = () => {

    const navigate = useNavigate();
    const [error, setError] = useState(false)

    const showAlert = () => {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
    } 



  return (
    <>
        {
          error ? <Alert severity='warning'>Funcionalidades desactivadas hasta que se cargen los archivos </Alert> : null  
        }
      <div className="container-home">
          <div className="cards">
            <div className="card" onClick={() => navigate("/upload-files")}> 
              <div className="icon"></div>
              <h2 className="title">Cargar datos de clientes, productos, marcas y compras</h2>  
            </div>
            <div className="card" onClick={areFunctionalitiesEnabled() ? () => navigate("/clients-manager") : () => showAlert()}>
              <div className="icon"></div>
              <h2 className="title">Mantenimiento de clientes</h2>
            </div>
            <div className="card" onClick={areFunctionalitiesEnabled() ? () => navigate("/products-manager") :  () => showAlert()}>
              <div className="icon"></div>
              <h2 className="title">Mantenimiento de catálogo</h2>
            </div>
            <div className="card" onClick={areFunctionalitiesEnabled() ? () => navigate("/register-purchase") :  () => showAlert()}>
              <div className="icon"></div>
              <h2 className="title">Registro de compras</h2>
            </div>
            <div className="card" onClick={areFunctionalitiesEnabled() ? () => navigate("/general-requests") :  () => showAlert()}> 
                <div className="icon"></div>
                <h2 className="title">Consultas generales</h2>
            </div>
            <div className="card" onClick={areFunctionalitiesEnabled() ? () => navigate("/special-requests") :  () => showAlert()}>
                <div className="icon"></div>
                <h2 className="title">Consultas especializadas</h2>
              </div>
          </div>
      </div>
    </>
  )
}

export default Home;
