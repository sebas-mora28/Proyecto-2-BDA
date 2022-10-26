import { TextField } from '@mui/material';
import React from 'react'
import { useForm, Form } from '../../components/UseForm';
import {Grid} from '@mui/material';
import './style.scss'

const RegisterClient = () => {

    const initialValues = {
        name: '',
        lastNames: ''
    }


    const validate = (fieldValues = values) => {
        let temp = {...errors}
        temp.name = fieldValues.name === "" ? "Este espacio es requerido" : ""
        temp.lastNames = fieldValues.lastNames === "" ? "Este espacio es requerido" : ""  

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
            <div className='body'>
                <div className="container-register-client">
                <h1 className = "registro">Registrar cliente</h1>
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
                                      label="Apellidos"
                                      name="lastNames"
                                      placeholder=""
                                      value={values.lastNames}
                                      onChange={handleInputChange}
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                      sx={{width: '100%'}} 
                                      {...(errors.lastNames && {error:true, helperText:errors.lastNames})}
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

export default RegisterClient;