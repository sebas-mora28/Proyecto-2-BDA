import React, { useEffect, useState } from 'react'
import './style.scss'
import { useForm, Form } from '../../components/UseForm';
import { Grid, Select, TextField, FormControl, MenuItem, InputLabel, FormHelperText} from '@mui/material';

const RegisterPurchase = () => {

    const [products, setProducts] = useState([]);


    useEffect(() => {

    }, [])

    const initialValues = {
        product: '',
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

            console.log("Se crea un juegador")
            

        }
    }

    return (
      <div className='body-register-purchase'>
              <div class="container-register-purchase">
        <h1 class = "registro">Registrar compra</h1>
          <div class="form">
              <Grid container spacing={6} justifyContent={'center'} paddingTop={4} paddingBottom={4}>
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
                                                    return <MenuItem value={product.id}>{product.name}</MenuItem>
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
                  <div class = "input-field button">
                      <button type="submit" class="registerbtn">Registrar</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default RegisterPurchase
