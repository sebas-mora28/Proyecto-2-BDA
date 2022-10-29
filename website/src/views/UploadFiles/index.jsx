import { Alert, Button } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react'
import './style.scss'
import * as xlsx from "xlsx";
import { Form } from '../../components/UseForm';
import { parse } from 'papaparse';
import axios from 'axios';
import { baseUrl } from '../../utils/parser/constants';

const UploadFiles = () => {

    const [fileBrands, setFileBrands] = useState([]);
    const [fileClients, setFileClients] = useState([]);
    const [fileProducts, setFileProducts] = useState([]);
    const [filePurchases, setFilePurchases] = useState([]);


    const ref1 = useRef(null)
    const ref2  = useRef(null)
    const ref3  = useRef(null)
    const ref4  = useRef(null)


    const handleClick1 = () => {
      ref1.current.click();
    }
    const handleClick2 = () => {
      ref2.current.click();
    }
    const handleClick3 = () => {
      ref3.current.click();
    }
    const handleClick4 = () => {
      ref4.current.click();
    }


    const uploadBrandsFile = (e) => {

      const file = e.target.files[0]
      if(file){
        parse(file, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log("Entra a brands")
            setFileBrands(results.data)
          }
        })
        
      }
    }

    const uploadClientsFile = (e) => {
      const file = e.target.files[0]
      if(file){
        parse(file, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log("Entra a clients")
            setFileClients(results.data)
          }
        })
      }
    }

    const uploadProductsFile = (e) => {

      const file = e.target.files[0]
      if(file){
        parse(file, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log("Entra a products")
            setFileProducts(results.data)
          }
        })
      }
    }

    const uploadPurchasesFile = (e) => {
      const file = e.target.files[0]
      if(file){
        parse(file, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log("Entra a purchase")
            setFilePurchases(results.data)
          }
        })
      }
    }


    const submit = async (e) => {
      e.preventDefault();
      const body = {
        clients: fileClients,
        brands: fileBrands,
        products: fileProducts,
        purchases: filePurchases
      }
      console.log(body)

      axios({method: 'POST', url: `${baseUrl}/loadData`, data: body}).then((response) => {
        console.log(response)
      })
    }


    return (
      <Form onSubmit={submit}>
      <div className='body-upload-files'>
        <div className='container-upload-files'>
          <div>
            <label htmlFor='upload-brands'>Cargar marcas</label>
            <input
              accept=".csv"
              className='upload-file'
              id="upload-brands"
              type="file"
              onChange={uploadBrandsFile}
            />
          </div>

          <div>
            <label htmlFor='upload-clients'>Cargar clientes</label>
            <input
              accept=".csv"
              className='upload-file'
              id="upload-clients"
              type="file"
              onChange={uploadClientsFile}
            />
          </div>

          <div>
            <label htmlFor='upload-products'>Cargar productos</label>
            <input
              accept=".csv"
              className='upload-file'
              id="upload-products"
              type="file"
              onChange={uploadProductsFile}
            />
          </div>
          <div>
            <label htmlFor='upload-purchases'>Cargar compras</label>
            <input
              accept=".csv"
              className='upload-file'
              id="upload-purchases"
              type="file"
              onChange={uploadPurchasesFile}
            />
          </div>
        </div>

        <div>
          <Button variant='contianed' type='submit'>Enviar</Button>
        </div>
      </div>
      </Form>
    )
}

export default UploadFiles