import React, { useEffect, useState } from 'react'
import { FormControl, Grid, TextField, Select, InputLabel, MenuItem, FormHelperText } from '@mui/material'
import { useForm, Form } from '../../components/UseForm';
import './style.scss'
import axios from 'axios';
import { baseUrl } from '../../utils/parser/constants';

const SearchClients = () => {

    const [clients, setClients] = useState([]);
    const [results, setResults] = useState([]);

    const initialValues = {
        client: 0,
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

    const submit = (e) => {

        e.preventDefault();
        if(validate()){
            console.log(`${baseUrl}/searchClient/${values.client}`)
            axios.get(`${baseUrl}/searchClient/${values.client}`).then((response) => {
                if(response.data){
                    console.log("Products: ", response.data)
                    setResults(response.data)
                }
            })
        }
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialValues, true, validate);


    useEffect(() => {
        axios.get(`${baseUrl}/clients`).then((response) => {
            if(response.data){
                console.log("Clients: ", response.data)
                setClients(response.data)
            }
        })


    }, [])


    return (
        <Form onSubmit={submit}>
        <div className='body-special-request-1'>
          <div className="container-special-request-1">
                <h1 className = "registro">Buscar cliente</h1>
                <div className="form">
                    <div className="input-field">
                        <div className="input">
                          <Grid container spacing={6} justifyContent={'center'} paddingTop={4} paddingBottom={4}>
                              <Grid item container md={12} justifyContent='center'>
                                  <FormControl fullWidth sx={{display:'flex',justifyContent:'center'}}> 
                                      <InputLabel id="clients">Clientes</InputLabel>               
                                      <Select
                                          label="Clientes"
                                          name="client"
                                          id="clients"
                                          value={values.client}
                                          onChange={handleInputChange}
                                          sx={{width: '100%' }} 
                                          error={errors.client !== '' && errors.client !== undefined ? true : false}
                                          >
                                              {
                                                  clients.map((client) => {
                                                      return <MenuItem value={client.c.id}>{client.c.first_name} {client.c.last_name}</MenuItem>
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
              <h1 className="titulo">Productos del cliente</h1>
              <table className="tabla">
                <thead className="thead">
                  <tr>
                    <th>Nombre del producto</th>
                    <th>Cantidad comprada</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      results.map((product) => {
                          return (
                              <tr key={product.Nombre_Producto}>
                              <td>{product.Nombre_Producto}</td>
                              <td>{product.Cantidad_Comprada}</td>
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

export default SearchClients
