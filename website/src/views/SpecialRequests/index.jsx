import React from 'react'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const SpecialRequests = () => {

    const navigate = useNavigate();

    return (
          <div className="container">
              <div className="cards">
                  <div className="card productoCom" onClick={() => navigate("/special-request-1")}> 
                    <div className="icon"><Icon icon="uil-exchange-alt" /></div>
                    <h2 className="title">Clientes y producto en común</h2>
                  </div>
                  <div className="card comprasCom" onClick={() => navigate("/special-request-2")}>  
                    <div className="icon"><Icon icon="uil-exchange" /></div>
                    <h2 className="title">Clientes compras en común</h2>
                  </div>
              </div>
        </div>
    )
}

export default SpecialRequests;