import React from 'react'

const SearchClients = () => {
  return (
    <div>
        <div class="container">
            <h1 class = "registro">Buscar cliente</h1>
            <div class="form">
                <div class="input-field">
                    <div class="input">
                        <label>Nombre</label>
                        <input type="text" name ="nombre" id="nombre" required />
                        </div>
                    <div class="input">
                        <label>Apellido</label>
                        <input type="text" name ="apellido" id="apellido" required />
                    </div>
                    <div class = "input-field button">
                        <button type="submit" class="searchbtn">Buscar</button> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchClients;