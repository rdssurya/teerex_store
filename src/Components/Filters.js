import React, { useEffect, useState } from "react";
import FilterComponent from "./FilterComponent";

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

export default function Filters(props){
    const [listOfFilters, setListOfFilters] = useState([]);
   
    /**
     * Use Effect Hook ensures that we have our list of filters with us once the component mounts
     */
    useEffect(()=>{
        const availableProducts = [...JSON.parse(localStorage.getItem('AllProducts'))];

        /**
         * Defintion of Unique filters array
         * Function which is called when component mounts 
         * @param {Array.<Product>} arrayOfAvailableProducts 
         * Returns us the unique filters array with each element in the format [ filterKey, [filterValues]]
         * Ex: [["Gender",["Male","Female"]],["Color",["Red","Black"]]] 
         */
        const arrayOfUniqueFilterValues = (arrayOfAvailableProducts) => {
            const uniqueGenders = ['Gender', getUniqueFilterValues(arrayOfAvailableProducts,"gender")];
            const uniqueTypes = ['Type', getUniqueFilterValues(arrayOfAvailableProducts,"type")];
            const uniqueColors = ['Color', getUniqueFilterValues(arrayOfAvailableProducts,"color")];
            setListOfFilters([uniqueGenders,uniqueTypes,uniqueColors]);
        }

        //calling the above function
        arrayOfUniqueFilterValues(availableProducts);

    } , []);
    
    /**
     * Extracts unique values from a list of products based on a specified filter key
     * 
     * @param {Array.<Product>} productsList 
     * @param {string} filterKey 
     * @returns {Array}
     * Ex: Output: ["Male","Female"]
     */
    const getUniqueFilterValues = ( productsList, filterKey) => {
        const arrayOfFilterValues = productsList.map((product) => product[filterKey]);
        const givenValues = [...arrayOfFilterValues];
        return  [...new Set(givenValues)];
    }

    /**
     * Connector function between Products component and FilterComponent
     * 
     * @param {Array<Product>} filteredProductsArray 
     * This function calls the filteredProductsListUpdater in Products component which updates the
     * products list with the filtered products accordingly
     */
    const connectorFunction = (filteredProductsArray)=>{
        props.updaterProp(filteredProductsArray);
    }

    // Filters returns a JSX component which provides the FilterComponent with our unique list of filters 
    return (
        <div className="filters-div">
            {/* Dynamically updating the page by passing filters as props to FilterComponent */ }
           {listOfFilters.map((filter)=>(
                <FilterComponent 
                    filterKey={filter[0]} 
                    values={filter[1]} 
                    key={filter[0]} 
                    handlingUpdates={connectorFunction}
                />
           ))}
        </div>
    );
}