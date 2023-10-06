import React from 'react';
import { useState,useEffect } from 'react';
import {API} from "../api";
import { Loading } from './../Components/Loading';
import { Products } from './../Components/Products';
import { NavBar } from './../Components/NavBar';


export const ProductList  = () => {
   const [productList, setProductList] = useState(null);

  const getProducts = ()=> {
    fetch(`${API}/products`,{
      method:"GET"
    })
    .then((data)=>data.json())
    .then((products)=> setProductList(products))
  }
  useEffect(() => getProducts(), []);

  return (
    <>
      <NavBar />
      {productList ? (
        <div className="App-container">
          {productList.map((item) => (
            <Products key={item.id} product={item} refresh={getProducts} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
)
}
