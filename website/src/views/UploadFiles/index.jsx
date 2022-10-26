import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react'
import './style.scss'

const UploadFiles = () => {

    const [fileBrands, setFileBrands] = useState(null);
    const [fileClients, setFileClients] = useState(null);
    const [fileProducts, setFileProducts] = useState(null);
    const [filePurchases, setFilePurchases] = useState(null);


    useEffect(() => {

        console.log(fileBrands)



    }, [fileBrands])


    return (
      <div className='body'>

        <div className='container'>

            <input type='file' onClick={(e) => setFileBrands(e.target.files[0]) } />

        </div>


      </div>
    )
}

export default UploadFiles