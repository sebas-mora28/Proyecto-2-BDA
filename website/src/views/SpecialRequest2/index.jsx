import React, { useState } from 'react'
import { FormControl, Grid, TextField, Select, InputLabel, MenuItem, FormHelperText } from '@mui/material'
import { useForm, Form } from '../../components/UseForm';
import './style.scss'

const SpecialRequest2 = () => {

    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);

    const [results, setResults] = useState([]);

    const initialValues = {
        client: '',
        product: 0
    }


    const validate = (fieldValues = values) => {
        let temp = {...errors}
        temp.client = fieldValues.client === "" ? "Este espacio es requerido" : ""
        temp.product = fieldValues.product === "" ? "Este espacio es requerido" : ""  

        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialValues, true, validate);


    const submit = (e) => {

        e.preventDefault();
        if(validate()){

            console.log("Se crea un juegador")
            

        }
    }

    return (
        <Form onSubmit={submit}>
        <div className='body-special-request-1'>
          <div className="container-special-request-1">
                <h1 className = "registro">Consulta especial 2</h1>
                <div className="form">
                    <div className="input-field">
                        <div className="input">
                          <Grid container spacing={6} justifyContent={'center'} paddingTop={4} paddingBottom={4}>
                              <Grid item container md={12} justifyContent='center'>
                                  <FormControl fullWidth sx={{display:'flex',justifyContent:'center'}}> 
                                      <InputLabel id="clients">Clientes</InputLabel>               
                                      <Select
                                          label="Clientes"
                                          name="clients"
                                          id="clients"
                                          value={values.clients}
                                          onChange={handleInputChange}
                                          sx={{width: '100%' }} 
                                          error={errors.clients !== '' && errors.clients !== undefined ? true : false}
                                          >
                                              {
                                                  clients.map((product) => {
                                                      return <MenuItem value={clients.id}>{clients.name}</MenuItem>
                                                  })
                                              }
                                      </Select>       
                                      {errors.product && <FormHelperText htmlFor="countryBox" error> {errors.product} </FormHelperText>}
                                  </FormControl>
                              </Grid> 
                          </Grid>   
                        </div>
                        <div className = "input-field button">
                            <button type="submit" className="registerbtn">Buscar</button>
                        </div>
                    </div>
                </div>
          </div>
          <div className='container-result-special-request-1'>
              <h1 class="titulo">Clientes que tienen al menos dos productos en común</h1>
              <table class="tabla">
                <thead class="thead">
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      results.map((client) => {
                          return (
                              <tr>
                              <td>{client.name}</td>
                              <td>{client.lastName}</td>
                            </tr>
                          )
                      })

                  }
                </tbody>
              </table>

          </div>
        </div>
        </Form>
  )
}

export default SpecialRequest2
