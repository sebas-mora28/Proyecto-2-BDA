import { TextField } from '@mui/material';
import React, { useEffect } from 'react'
import { useForm, Form } from '../../components/UseForm';
import {Grid} from '@mui/material';
import './style.scss'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../utils/parser/constants';

const RegisterClient = ({edit}) => {

    const initialValues = {
        id: 0,
        first_name: '',
        last_name: ''
    }

    const params = useParams();
    const navigate = useNavigate();

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        temp.first_name = fieldValues.first_name === "" ? "Este espacio es requerido" : ""
        temp.last_name = fieldValues.last_name === "" ? "Este espacio es requerido" : ""  

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
        if(edit){
            axios({method: 'GET', url: `${baseUrl}/client/${params.clientId}`}).then((response) => {
                if(response.data[0]){
                    const client = response.data[0].c
                    console.log(client)
                    setValues(client)
                }
            })
            console.log(`Se quiere editar al jugador con id ${params.clientId}`)
        }
    }, [])


    const submit = (e) => {
        e.preventDefault();
        if(validate()){
            if(!edit){
                axios({method: 'POST',url: `${baseUrl}/client`, data : values}).then((response) => {
                    if(response){
                        console.log("Se crea el jugador")
                        navigate('/clients-manager')
                    }
                }).catch((error) => {
                    console.log(error)
                })
            } else {
                axios({method: 'PUT', url:`${baseUrl}/client`, data: values}).then((response) => {
                    if(response){
                        console.log("Se edita un jugador")
                        navigate('/clients-manager')

                    }
                })
                
            }
        }
    }

    
    return (
        <Form onSubmit={submit}>
            <div className='body'>
                <div className="container-register-client">
                <h1 className = "registro">{edit ? "Editar cliente" : "Registrar cliente"}</h1>
                <div className="form">
                          <Grid container spacing={6} justifyContent={'center'} paddingTop={4} paddingBottom={4}>
                              <Grid item container md={12} justifyContent='center'>
                                  <TextField 
                                      label="Nombre"
                                      name="first_name"
                                      placeholder=""
                                      value={values.first_name}
                                      onChange={handleInputChange}
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                      sx={{width: '100%'}} 
                                      {...(errors.first_name && {error:true, helperText:errors.first_name})}
                                  />
                              </Grid>
                              <Grid item container md={12} justifyContent='center'>
                                  <TextField 
                                      label="Apellidos"
                                      name="last_name"
                                      placeholder=""
                                      value={values.last_name}
                                      onChange={handleInputChange}
                                      InputLabelProps={{
                                          shrink: true,
                                      }}
                                      sx={{width: '100%'}} 
                                      {...(errors.last_name && {error:true, helperText:errors.last_name})}
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

export default RegisterClient;