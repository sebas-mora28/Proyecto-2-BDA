import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm, Form } from '../../components/UseForm';
import {Grid} from '@mui/material';
import './style.scss'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../utils/constants';

const RegisterProduct = ({edit}) => {

    const [brands, setBrands] = useState([])

    const initialValues = {
        id: 0,
        Nombre: '',
        Marca: '',
        Precio: ''
    }


    const params = useParams();
    const navigate = useNavigate();

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        temp.Nombre = fieldValues.Nombre === "" ? "Este espacio es requerido" : ""
        temp.Marca = fieldValues.Marca === "" ? "Este espacio es requerido" : ""  
        temp.Precio = fieldValues.Precio === "" ? "Este espacio es requerido" : ""  

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

        axios({method: 'GET', url: `${baseUrl}/brands`}).then((response) => {
            if(response.data){
                console.log(response.data)
                setBrands(response.data)
            }
        })

    
        if(edit){
            axios({method: 'GET', url: `${baseUrl}/product/${params.productId}`}).then((response) => {
                if(response.data?.[0]){
                    console.log(response.data)
                    setValues(response.data[0].p)
                }
            })
        }
    }, [])


    const submit = (e) => {

        e.preventDefault();
        if(validate()){
            if(!edit){
                console.log("values: ", values)
                axios({method: 'POST' ,url:`${baseUrl}/product`, data : values}).then((response) => {
                    if(response){
                        console.log("Se crea el producto")
                        navigate('/products-manager')

                    }
                })
            } else {
                axios({method: 'PUT', url:`${baseUrl}/product`, data: values}).then((response) => {
                    if(response){
                        console.log("Se edita un producto")
                        navigate('/products-manager')

                    }
                })
                
            }
    
        }
    }

    
    return (
        <Form onSubmit={submit}>
            <div className='body'>
                <div className="container-register-product">
                <h1 className = "registro">{edit ? "Editar producto" : "Registrar producto"}</h1>
                <div className="form">
                          <Grid container spacing={6} justifyContent={'center'} paddingTop={4} paddingBottom={4}>
                              <Grid item container md={12} justifyContent='center'>
                                  <TextField 
                                      label="Nombre"
                                      name="Nombre"
                                      placeholder=""
                                      value={values.Nombre}
                                      onChange={handleInputChange}
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                      sx={{width: '100%'}} 
                                      {...(errors.Nombre && {error:true, helperText:errors.Nombre})}
                                  />
                              </Grid>
                              <Grid item container md={12} justifyContent='center'>
                              <FormControl fullWidth sx={{display:'flex',justifyContent:'center'}}> 
                                        <InputLabel id="brands">Marcas</InputLabel>               
                                        <Select
                                            label="Marcas"
                                            name="Marca"
                                            id="brands"
                                            value={values.Marca}
                                            onChange={handleInputChange}
                                            sx={{width: '100%' }} 
                                            error={errors.brand !== '' && errors.brand !== undefined ? true : false}
                                            >
                                                {
                                                    brands.map((brand) => {
                                                        console.log(brand.b.Nombre)
                                                        return <MenuItem key={brand.b.id} value={brand.b.Nombre}>{brand.b.Nombre}</MenuItem>
                                                    })
                                                }
                                        </Select>       
                                        {errors.brand && <FormHelperText htmlFor="countryBox" error> {errors.brand} </FormHelperText>}
                                    </FormControl>
                              </Grid>
                              <Grid item container md={12} justifyContent='center'>
                                  <TextField 
                                      label="Precio"
                                      name="Precio"
                                      placeholder=""
                                      value={values.Precio}
                                      onChange={handleInputChange}
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                      sx={{width: '100%'}} 
                                      {...(errors.Precio && {error:true, helperText:errors.Precio})}
                                  />
                              </Grid>
                          </Grid>
                                  
                      <div className = "input-field button">
                          <button type="submit" className="registerbtn">{edit ? "Guardar" : "Registrar"}</button>
                      </div>
                      </div>          
                </div>
            </div>
        </Form>
  )
}

export default RegisterProduct;