import React from "react";
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
    
    /**
     * Definition of filter function for a non-numeric value
     * This function is called when an NON-NUMERIC filter value (Ex: 'Male') is checked by the user
     * 
     * @param {Array.<Product>} productsList 
     * @param {Array} filtersList 
     * If no filters are applied, this function will be provided with all the store products as argument inside event handler function
     * If filters are applied, this function will be provided with products with already applied filters as argument inside event handler function
     * @returns {Array}
     * Returns an array of updated product List with the selected filters
     */
    const performFilterOperation = ( productsList, filtersList)=>{
        const updatedFilteredProducts = productsList.filter((product) =>
                filtersList.every(([filterKey, filterValue]) =>
                    product[filterKey] === filterValue
            )
        );
        return updatedFilteredProducts;
    }

    /**
     * Definition of filter function for a numeric value
     * This function is called when an NUMERIC filter value (Ex: '0-250') is checked by the user
     * 
     * @param {Array.<Product>} productsList 
     * @param {string}  
     * If no filters are applied, this function will be provided with all the store products as argument inside event handler function
     * If filters are applied, this function will be provided with products with already applied filters as argument inside event handler function
     * and price range is passed as an argument
     * @returns {Array}
     * Returns an array of updated product List with the selected price ranges
     */
    const performFilterOperationForPriceRange = (productsList, priceRange) => {
        const updatedFilteredProducts = productsList.filter((product) =>
            product['price'] >= priceRange.split('-')[0] && product['price'] <= priceRange.split('-')[1]
        );
        return updatedFilteredProducts;
    }

    /**
     * Definition of updating the local Storage data
     * This function is called after the relevant changes are made to the arrays
     * @param {Array.<Product>} newlyFilteredProducts 
     * @param {Array} newlyAppliedFilters
     * Updates newly added filters and products in the local storage
     * Calls the handlingUpdates prop which in return calls the connector function in Filters component
     * So as to update the changes in Products component 
     */
    const updatingItemsInLocalStorage = (newlyFilteredProducts,newlyAppliedFilters) => {
        localStorage.setItem('FilteredProductsByUser',JSON.stringify(newlyFilteredProducts));
        localStorage.setItem('AppliedFilters',JSON.stringify(newlyAppliedFilters));
        props.handlingUpdates(newlyFilteredProducts);
    }

    /**
     * Definition of event handler when filter value is checked or unchecked
     * This function utilizes the required data available on local storage like already applied filters, products list etc
     * @param {Object} e
     * If a filter value is checked, it checks whether the value of filter is numeric or non-numeric
     * If it is numeric then it will check already any filter is applied or not and accordinlgy calls the function performFilterOperationForPriceRange
     * If it is non-numeric then it will again check if any filter is applied or not and accordinlgy calls the function performFilterOperation
     * If a filter value is unchecked then this function removes that particular filter value form applied filters and updates the lists
     * Here, we are adding values to AppliedFilters in local storage to keep track of all applied filters
     * Ex: Applied Filters in local Storage is of format [['Gender', 'Male'],['Type','Polo']]
     * AGAIN HERE ONLY ONE OF THE FILTERS FOR ANY FILTERKEY CAN BE SELECTED...OTHERWISE NO PRODUCTS WILL BE DISPLAYED.
     */
    const handleChange=(e)=>{
        const ourStoreProducts = [...JSON.parse(localStorage.getItem('AllProducts'))];
        const alreadyAppliedFilters = [...JSON.parse(localStorage.getItem('AppliedFilters'))];
        const currentlyAvailableProductsOnPage = [...JSON.parse(localStorage.getItem('FilteredProductsByUser'))];
        const filterKey = props.filterKey.toLowerCase();
        const filterValue = e.target.value;
        if(e.target.checked){
            alreadyAppliedFilters.push([ filterKey , filterValue]);
            if(!isNaN(filterValue[0])){
                const updatedFiltersList = 
                    currentlyAvailableProductsOnPage.length === 0 ? 
                    performFilterOperationForPriceRange( ourStoreProducts, filterValue) 
                    : performFilterOperationForPriceRange(currentlyAvailableProductsOnPage, filterValue);
                updatingItemsInLocalStorage( updatedFiltersList, alreadyAppliedFilters);
            }
            else{
                const updatedFiltersList = 
                    currentlyAvailableProductsOnPage.length === 0 ? 
                    performFilterOperation( ourStoreProducts, alreadyAppliedFilters) 
                    : performFilterOperation(currentlyAvailableProductsOnPage, alreadyAppliedFilters);
                updatingItemsInLocalStorage( updatedFiltersList, alreadyAppliedFilters);
            }
        }
        else{
            for(let i=0; i<alreadyAppliedFilters.length; i++){
                if(alreadyAppliedFilters[i][0]===filterKey && alreadyAppliedFilters[i][1] === filterValue){
                    alreadyAppliedFilters.splice(i,1);
                }
            }
            const updatedFiltersList = performFilterOperation(ourStoreProducts, alreadyAppliedFilters);
            updatingItemsInLocalStorage( updatedFiltersList, alreadyAppliedFilters);
        }
        
    }


    return (
        <div>
            <Typography fontWeight={'700'}>{props.filterKey}</Typography>
            {props.values.map((val)=>(
                <label key={val}>
                    <input 
                        type="checkbox" 
                        name='checkBox' 
                        onChange={(e)=>handleChange(e)} 
                        value={val}
                    />{val}<br/>
                </label>
            ))}
        </div>
    );
}