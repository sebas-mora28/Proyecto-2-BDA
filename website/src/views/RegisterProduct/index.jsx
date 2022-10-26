import { TextField } from '@mui/material';
import React from 'react'
import { useForm, Form } from '../../components/UseForm';
import {Grid} from '@mui/material';
import './style.scss'

const RegisterProduct = () => {

    const initialValues = {
        name: '',
        brand: '',
        price: ''
    }


    const validate = (fieldValues = values) => {
        let temp = {...errors}
        temp.name = fieldValues.name === "" ? "Este espacio es requerido" : ""
        temp.brand = fieldValues.brand === "" ? "Este espacio es requerido" : ""  
        temp.price = fieldValues.price === "" ? "Este espacio es requerido" : ""  

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

            console.log("Se crea un producto")
            

        }
    }

    
    return (
        <Form onSubmit={submit}>
            <div className='body'>
                <div className="container-register-product">
                <h1 className = "registro">Registrar producto</h1>
                <div className="form">
                          <Grid container spacing={6} justifyContent={'center'} paddingTop={4} paddingBottom={4}>
                              <Grid item container md={12} justifyContent='center'>
                                  <TextField 
                                      label="Nombre"
                                      name="name"
                                      placeholder=""
                                      value={values.name}
                                      onChange={handleInputChange}
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                      sx={{width: '100%'}} 
                                      {...(errors.name && {error:true, helperText:errors.name})}
                                  />
                              </Grid>
                              <Grid item container md={12} justifyContent='center'>
                                  <TextField 
                                      label="Marca"
                                      name="brand"
                                      placeholder=""
                                      value={values.brand}
                                      onChange={handleInputChange}
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                      sx={{width: '100%'}} 
                                      {...(errors.brnad && {error:true, helperText:errors.brand})}
                                  />
                              </Grid>
                              <Grid item container md={12} justifyContent='center'>
                                  <TextField 
                                      label="Precio"
                                      name="price"
                                      placeholder=""
                                      value={values.price}
                                      onChange={handleInputChange}
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                      sx={{width: '100%'}} 
                                      {...(errors.price && {error:true, helperText:errors.price})}
                                  />
                              </Grid>
                          </Grid>
                                  
                      <div className = "input-field button">
                          <button type="submit" className="registerbtn">Registrar</button>
                      </div>
                      </div>          
                </div>
            </div>
        </Form>
  )
}

export default RegisterProduct;