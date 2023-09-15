import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";


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

export default function FilterComponent(props){
    const allProducts = [...JSON.parse(localStorage.getItem('AllProducts'))];
    const searchedOrFilteredProducts = [...JSON.parse(localStorage.getItem('searchedOrFilteredProductsByUser'))];
    const [filters, setFilters] = useState({
        gender: [],
        color: [],
        type: []
    });

    useEffect(() => {
        filterProducts();
    }, [filters]);

    function filterProducts () {
        const productsList = searchedOrFilteredProducts.length === 0 ? [...allProducts] : [...searchedOrFilteredProducts]
        const filteredProducts = productsList.filter((product) => {
            const genderFilter = filters.gender.length === 0 || filters.gender.includes(product.gender);
            const colorFilter = filters.color.length === 0 || filters.color.includes(product.color);
            const typeFilter = filters.type.length === 0 || filters.type.includes(product.type);
            return genderFilter && colorFilter && typeFilter;
        });
        props.handlingUpdates(filteredProducts);
    }

    
    const toggleCheckbox = (filterKey, value) => {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filterKey.toLowerCase()]: prevFilters[filterKey.toLowerCase()].includes(value)
            ? prevFilters[filterKey.toLowerCase()].filter((item) => item !== value)
            : [...prevFilters[filterKey.toLowerCase()], value]
        }));
      };
    
    
    return (
        <div>
            <Typography fontWeight={'700'}>{props.filterKey}</Typography>
            {props.values.map((filterValue)=>(
                <label key={filterValue}>
                    <input 
                        type="checkbox" 
                        name={props.filterKey}
                        onChange = { (e) => toggleCheckbox(e.target.name,e.target.value)} 
                        value = {filterValue}
                    />{filterValue}<br/>
                </label>
            ))}
        </div>
    );
}