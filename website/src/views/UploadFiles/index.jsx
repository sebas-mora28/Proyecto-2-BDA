import { Alert, Button } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react'
import './style.scss'
import * as xlsx from "xlsx";
import { Form } from '../../components/UseForm';
import { parse } from 'papaparse';
import axios from 'axios';
import { baseUrl } from '../../utils/constants';
import { enableFunctionalities } from '../../utils/authotization';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const UploadFiles = () => {

    const [fileBrands, setFileBrands] = useState(null);
    const [fileClients, setFileClients] = useState(null);
    const [fileProducts, setFileProducts] = useState(null);
    const [filePurchases, setFilePurchases] = useState(null);

    const [alert, setAlert] = useState(false) 
    const navigate = useNavigate();

    const showAlert = () => {
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 2000)
    }


    const [fileBrandsContent, setFileBrandsContent] = useState([]);
    const [fileClientsContent, setFileClientsContent] = useState([]);
    const [fileProductsContent, setFileProductsContent] = useState([]);
    const [filePurchasesContent, setFilePurchasesContent] = useState([]);


    const uploadBrandsFile = (e) => {

      const file = e.target.files[0]
      setFileBrands(file.name)
      if(file){
        parse(file, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log("Entra a brands")
            setFileBrandsContent(results.data)
          }
        })
        
      }
    }

    const uploadClientsFile = (e) => {
      const file = e.target.files[0]
      setFileClients(file.name)
      if(file){
        parse(file, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log("Entra a clients")
            setFileClientsContent(results.data)
          }
        })
      }
    }

    const uploadProductsFile = (e) => {
      const file = e.target.files[0]
      setFileProducts(file.name)
      if(file){
        parse(file, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log("Entra a products")
            setFileProductsContent(results.data)
          }
        })
      }
    }

    const uploadPurchasesFile = (e) => {
      const file = e.target.files[0]
      setFilePurchases(file.name)
      if(file){
        parse(file, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log("Entra a purchase")
            setFilePurchasesContent(results.data)
          }
        })
      }
    }


    const submit = async (e) => {
      e.preventDefault();
  
      if(fileBrandsContent.length !== 0 && fileClientsContent.length !== 0 && fileProductsContent.length !== 0 && filePurchasesContent.length !== 0){
        const body = {
          brands: fileBrandsContent,
          clients: fileClientsContent,
          purchases: filePurchasesContent,
          products: fileProductsContent
        }

        axios({method: 'POST', url: `${baseUrl}/loadData`, data: body}).then((response) => {
          if(response){
            enableFunctionalities()
            navigate('/home')
          }
        })


      } else {
        console.log("alerta")
        showAlert()
      }
    }


    return (
      <Form onSubmit={submit}>
        {
          alert ? <Alert severity='error'>Debe cargar todos los archivos</Alert> : null
        }
      <div className='body-upload-files'>
        <div className='container-upload-files'>
          <div>
            <div style={{display: 'flex', justifyContent: 'center' }}>
              {
                fileBrands && (<h3>{fileBrands} <Icon icon="ant-design:check-circle-filled" /></h3>)
              }
            </div>
            <label className='label-file' htmlFor='upload-brands'>Cargar marcas</label>
            <input
              accept=".csv"
              className='input-file'
              id="upload-brands"
              type="file"
              onChange={uploadBrandsFile}
            />
          </div>
      
          <div>
          <div style={{display: 'flex', justifyContent: 'center' }}>
          {
              fileClients && (<h3>{fileClients} <Icon icon="ant-design:check-circle-filled" /></h3>)
            }
            </div>
            <label className='label-file' htmlFor='upload-clients'>Cargar clientes</label>
            <input
              accept=".csv"
              className='input-file'
              id="upload-clients"
              type="file"
              onChange={uploadClientsFile}
            />
          </div>

          <div>
          <div style={{display: 'flex', justifyContent: 'center' }}>
            {   
              fileProducts  && (<h3>{fileProducts} <Icon icon="ant-design:check-circle-filled" /></h3>)
            }
            </div>
            <label className='label-file' htmlFor='upload-products'>Cargar productos</label>
            <input
              accept=".csv"
              className='input-file'
              id="upload-products"
              type="file"
              onChange={uploadProductsFile}
            />
          </div>
          <div>
          <div style={{display: 'flex', justifyContent: 'center' }}>
            {
              filePurchases && (<h3>{filePurchases} <Icon icon="ant-design:check-circle-filled" /></h3>)
            }
            </div>
            <label className='label-file' htmlFor='upload-purchases'>Cargar compras</label>
            <input
              accept=".csv"
              className='input-file'
              id="upload-purchases"
              type="file"
              onChange={uploadPurchasesFile}
            />
          </div>
        </div>

        <div>
          <Button variant='contained' type='submit'>Enviar</Button>
        </div>
      </div>
      </Form>
    )
}

export default UploadFiles