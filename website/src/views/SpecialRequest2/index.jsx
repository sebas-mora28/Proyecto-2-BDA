import React, { useEffect, useState } from 'react'
import { FormControl, Grid, TextField, Select, InputLabel, MenuItem, FormHelperText } from '@mui/material'
import { useForm, Form } from '../../components/UseForm';
import './style.scss'
import axios from 'axios';
import { baseUrl } from '../../utils/parser/constants';
const SpecialRequest2 = () => {

    const [clients, setClients] = useState([]);

    const [results, setResults] = useState([]);

    const initialValues = {
        client: '',
    }

    useEffect(() => {
        axios({method: 'GET', url: `${baseUrl}/clients`}).then((response) => {
            if(response.data){
                setClients(response.data)
            }
        })
    }, [])


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

            axios({method: 'GET', url: `${baseUrl}/commonPurchases/${values.client}`}).then((response) => {
                if(response.data){
                    console.log("Response: ", response.data)
                    setResults(response.data)
                }
            })
            

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
                                      {errors.client && <FormHelperText htmlFor="countryBox" error> {errors.client} </FormHelperText>}
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
              <h1 className="titulo">Clientes que tienen al menos dos productos en común</h1>
              <table className="tabla">
                <thead className="thead">
                  <tr>
                    <th>Nombre</th>
                    <th>Producto en comun</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      results.map((res) => {
                          return (
                                <tr>
                                <td>{res.Nombre}</td>
                                <td>
                                  <table style={{display: 'flex', justifyContent:'center'}}>
                                        <tbody> 
                                                {res.Productos.map((product) => {
                                                    return <tr><td>{product}</td></tr>
                                                })}     
                                        </tbody>
                                  </table>
                                 </td>
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
