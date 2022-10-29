import React, { useEffect, useState } from 'react'
import { FormControl, Grid, TextField, Select, InputLabel, MenuItem, FormHelperText } from '@mui/material'
import { useForm, Form } from '../../components/UseForm';
import './style.scss'
import axios from 'axios';
import { baseUrl } from '../../utils/parser/constants';

const SpecialRequest1 = () => {

    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);

    const [results, setResults] = useState([]);

    const initialValues = {
        client: '',
        product: ''
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


    useEffect(() => {

        axios({method: 'GET', url: `${baseUrl}/clients`}).then((response) => {
            if(response.data){
                console.log("Clients: ", response.data)
                setClients(response.data)
            }
        })

    }, [])

    
    useEffect(() => {

        if(values.client !== ''){
            axios({method: 'GET', url: `${baseUrl}/searchClient/${values.client}`}).then((response) => {
                if(response.data){
                    console.log("Productos del client: ", response.data)
                    setProducts(response.data)
                }
            })

        }
    }, [values.client])

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
                <h1 className = "registro">Consulta especial 1</h1>
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
                                                      return <MenuItem key={client.c.id} value={client.c.id}>{client.c.first_name} {client.c.last_name}</MenuItem>
                                                  })
                                              }
                                      </Select>       
                                      {errors.client && <FormHelperText htmlFor="countryBox" error> {errors.client} </FormHelperText>}
                                  </FormControl>
                              </Grid>
                              <Grid item container md={12} justifyContent='center'>
                              <FormControl fullWidth sx={{display:'flex',justifyContent:'center'}}> 
                                      <InputLabel id="products">Productos</InputLabel>               
                                      <Select
                                          label="Productos"
                                          name="product"
                                          id="products"
                                          value={values.product}
                                          onChange={handleInputChange}
                                          sx={{width: '100%' }} 
                                          error={errors.product !== '' && errors.product !== undefined ? true : false}
                                          >
                                              {
                                                  products.map((product) => {
                                                      return <MenuItem key={product.id} value={product.id}>{product.Nombre_Producto}</MenuItem>
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
              <h1 className="titulo">Clientes que tienen el producto en común</h1>
              <table className="tabla">
                <thead className="thead">
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

export default SpecialRequest1
