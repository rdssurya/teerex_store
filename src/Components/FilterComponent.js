import React from "react";
import { Typography } from "@mui/material";


export default function FilterComponent(props){
    
    
    const performFilter = ( productsList, filtersList)=>{
        const filteredProducts = productsList.filter((product) =>
                filtersList.every(([filterKey, filterValue]) =>
                    product[filterKey] === filterValue
            )
        );
        return filteredProducts;
    }

    const performFilterForPriceRange = (productsList, priceRange) => {
        const filteredProducts = productsList.filter((product) =>
            product['price'] >= priceRange.split('-')[0] && product['price'] <= priceRange.split('-')[1]
        );
        return filteredProducts;
    }

    const handleChange=(e)=>{
        const ourStoreProducts = [...JSON.parse(localStorage.getItem('AllProducts'))];
        const appliedFilters = [...JSON.parse(localStorage.getItem('AppliedFilters'))];
        const currentlyAvailableProductsOnPage = [...JSON.parse(localStorage.getItem('CurrentListedProducts'))];
        const filterKey = props.heading.toLowerCase();
        const filterValue = e.target.value;

        if(e.target.checked){
            appliedFilters.push([ filterKey , filterValue]);
            if(!isNaN(filterValue[0]) && typeof filterValue[0] !== 'boolean'){
                const filteredProducts = currentlyAvailableProductsOnPage.length === 0 ? 
                    performFilterForPriceRange( ourStoreProducts, filterValue) : performFilterForPriceRange(currentlyAvailableProductsOnPage, filterValue);
                localStorage.setItem('CurrentListedProducts',JSON.stringify(filteredProducts));
                localStorage.setItem('AppliedFilters',JSON.stringify(appliedFilters));
                props.handler(filteredProducts);
            }
            else{
                const filteredProducts = currentlyAvailableProductsOnPage.length === 0 ? 
                performFilter( ourStoreProducts, appliedFilters) : performFilter(currentlyAvailableProductsOnPage, appliedFilters);
                localStorage.setItem('CurrentListedProducts',JSON.stringify(filteredProducts));
                localStorage.setItem('AppliedFilters',JSON.stringify(appliedFilters));
                props.handler(filteredProducts);
            }
            
        }
        else{
            for(let i=0; i<appliedFilters.length; i++){
                if(appliedFilters[i][0]===filterKey && appliedFilters[i][1] === filterValue){
                    appliedFilters.splice(i,1);
                }
            }
            const filteredProducts = performFilter( ourStoreProducts, appliedFilters)
            localStorage.setItem('CurrentListedProducts',JSON.stringify(filteredProducts));
            localStorage.setItem('AppliedFilters',JSON.stringify(appliedFilters));
            props.handler(filteredProducts);
        }
    }


    return (
        <div>
            <Typography fontWeight={'700'}>{props.heading}</Typography>
            {props.values.map((val)=>(
                <label key={val}><input type="checkbox" name='checkBox' onChange={(e)=>handleChange(e)} value={val}/>{val}<br/></label>
            ))}
        </div>
    );
}