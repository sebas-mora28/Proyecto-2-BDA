import React, { useEffect, useState } from 'react'
import './style.scss'
import { useForm, Form } from '../../components/UseForm';
import { Grid, Select, TextField, FormControl, MenuItem, InputLabel, FormHelperText, Alert} from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../utils/constants';
import { validateJson } from 'convert-csv-to-json/src/util/jsonUtils';

const RegisterPurchase = () => {

    const [products, setProducts] = useState([]);
    const [clients, setClients] = useState([]);
    const [alert, setAlert] = useState(false)

    const showAlert = () => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 15000);
    }


    useEffect(() => {

        axios({method: 'GET' ,url:`${baseUrl}/clients`}).then((response) => {
            if(response.data){
                console.log("Clients: ", response.data)
                setClients(response.data)
            }
        })
    }, [])


    useEffect(() => {
        axios({method: 'GET' , url:`${baseUrl}/products`}).then((response) => {
            if(response.data){
                console.log("Products: ", response.data)
                setProducts(response.data)
            }
        })

    }, [clients])

    const initialValues = {
        client: 0,
        product: 0,
        amount: 0
    }


    const validate = (fieldValues = values) => {
        let temp = {...errors}
        temp.product = fieldValues.product === "" ? "Este espacio es requerido" : ""
        temp.amount = fieldValues.amount === "" ? "Este espacio es requerido" : ""  

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

            console.log("Se registra una compra")
            const body = {IdCliente: values.client, IdProducto: values.product, Cantidad: values.amount }
            axios({method: 'POST' ,url:`${baseUrl}/buy`, data: body}).then((response) => { 
                setValues(initialValues)
                showAlert()
                console.log("Se realizo la compra exitosamente")
            })
            

        }
    }

    return (
        <Form onSubmit={submit}>
            {
                alert ? <Alert severity='success'>Comprea agregada con éxito</Alert> : null

            }
            <div className='body-register-purchase'>
                <div className="container-register-purchase">
                    <h1 className = "registro">Registrar compra</h1>
                      <div className="form">
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
                                                <InputLabel id="category">Producto</InputLabel>               
                                                <Select
                                                    label="Producto"
                                                    name="product"
                                                    id="product"
                                                    value={values.product}
                                                    onChange={handleInputChange}
                                                    sx={{width: '70%' }} 
                                                    error={errors.product !== '' && errors.product !== undefined ? true : false}
                                                    >
                                                        {
                                                            products.map((product) => {
                                                                return <MenuItem key={product.p.id} value={product.p.id}>{product.p.Nombre}</MenuItem>
                                                            })
                                                        }
                                                </Select>       
                                                {errors.product && <FormHelperText htmlFor="countryBox" error> {errors.product} </FormHelperText>}
                                            </FormControl>
                                        </Grid>
                                        <Grid item container md={12} justifyContent='center'>
                                              <TextField 
                                                  label="Cantidad"
                                                  name="amount"
                                                  placeholder=""
                                                  value={values.amount}
                                                  onChange={handleInputChange}
                                                  InputLabelProps={{
                                                      shrink: true,
                                                  }}
                                                  sx={{width: '100%'}} 
                                                  {...(errors.amount && {error:true, helperText:errors.amount})}
                                            />
                                        </Grid>
                                    </Grid>           
                              <div className= "input-field button">
                                  <button type="submit" className="registerbtn">Registrar</button>
                          </div>
                    </div>
                </div>
            </div>
        </Form>
  )
}

export default RegisterPurchase
