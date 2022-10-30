import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useContext, useEffect, useState, } from 'react';
import './App.css';
import Home from "./views/Home";
import GeneralRequests from "./views/GeneralRequests";
import ClientsManager from "./views/ClientsManager";
import ProductsManager from "./views/ProductsManager";
import UploadFiles from "./views/UploadFiles";
import RegisterClient from "./views/RegisterClient";
import RegisterProduct from "./views/RegisterProduct";
import TopClients from "./views/TopClients";
import TopBrands from "./views/TopBrands";
import TopProducts from "./views/TopProducts";
import SpecialRequests from "./views/SpecialRequests";
import ClientPurchases from "./views/ClientPurchases";
import RegisterPurchase from "./views/RegisterPurchase";
import SpecialRequest1 from "./views/SpecialRequest1";
import SpecialRequest2 from "./views/SpecialRequest2";
import SearchClients from "./views/SearchClients";


function App() {

  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/home' element={<Home />}  />
          <Route path='/general-requests' element={<GeneralRequests />}  />
          <Route path='/clients-manager' element={<ClientsManager />}  />
          <Route path='/products-manager' element={<ProductsManager />}  />
          <Route path='/upload-files' element={<UploadFiles />}  />
          <Route path='/register-client' element={<RegisterClient />}  />
          <Route path='/register-product' element={<RegisterProduct />}  />
          <Route path='/top-clients' element={<TopClients />}  />
          <Route path='/top-brands' element={<TopBrands /> }  />
          <Route path='/top-products' element={<TopProducts /> }  />
          <Route path='/search-client' element={<SearchClients />} />
          <Route path='/especial-requests' element={<SpecialRequests /> }  />
          <Route path='/client-purchases/:clientId' element={<ClientPurchases />} />
          <Route path='/register-purchase' element={<RegisterPurchase />} />
          <Route path='/special-request-1' element={<SpecialRequest1 />} />
          <Route path="/special-request-2" element={<SpecialRequest2 />} />
          <Route path="/edit-client/:clientId" element={<RegisterClient edit={true} />} />
          <Route path="/edit-product/:productId" element={<RegisterProduct edit={true} />} />
        </Routes>
      </Router>
  );
}

export default App;
