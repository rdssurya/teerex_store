import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import axios from "axios";
import Header from "./Header";
import ProductCard from "./ProductCard";


// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {number} quantity - The quantity of product available in the store
 * @property {string} type - The type of T-shirt
 * @property {number} price - The price of the product
 * @property {string} currency - Currency of the price
 * @property {string} imageURL - Contains URL for the product image
 * @property {number} id - Unique ID for the product
 * @property {string} gender - Gender to which the product belongs to
 * @property {string} color - color of the product
 */


export default function Products(){
    const [products,setProducts]=useState([]);
    
    
    /**
     * useEffect Hook to make a function call on page load
     * and to make function call on re-renders
     */
    useEffect(()=>{
        if(localStorage.getItem('CartItems')===null){
            localStorage.setItem('CartItems',JSON.stringify([]));
        }
        makingAPICallToFetchProducts();
    },[]);


    /**
     * Definition of makingAPICallToFetchProducts()
     * This is the function that is called on intial page load
     * 
     *  @returns { Array.<Product> }
     *  Array of objects with complete data on all available products
     *  Adds the details of all available products to localStorage as well
     * 
     * API endpoint - GET 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
     * 
     */
    async function makingAPICallToFetchProducts(){
        try{
            const url = 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json';
            const response = await axios.get(url);
            setProducts( [...response.data] );
            localStorage.setItem('AllProducts',JSON.stringify([...response.data]));
        }
        catch(e){
            alert('NETWORK ERROR. Try again after sometime.');
        }
    }

    return (
        <>
        <Header/>
        <Typography>Products</Typography>
        <Grid container>
            <Grid container spacing={3}>
                {products.map((product)=>(
                    <Grid item key={product.id} xs={12} sm={4} md={3}>
                        <ProductCard 
                            name={product.name} 
                            cost={product.price} 
                            image={product.imageURL}
                            currency={product.currency}
                            id={product.id}
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>
        </>
    );
}