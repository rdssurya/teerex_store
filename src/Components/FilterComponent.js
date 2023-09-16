import React from "react";
import '../Styles/FilterComponent.css';

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
    const searchedProducts = [...JSON.parse(localStorage.getItem('searchedProductsByUser'))];
    const filters = JSON.parse(localStorage.getItem('appliedFilters'));

    
    function filterProducts (filters) {
        const productsList = searchedProducts.length === 0 ? [...allProducts] : [...searchedProducts];
        const filteredByGender = performingFilteringOperation(productsList, filters, 'gender');
        const filteredByColor = performingFilteringOperation(filteredByGender, filters, 'color');
        const filteredByType = performingFilteringOperation(filteredByColor, filters, 'type');
        const filteredProductsWithAllTheAppliedFilters = [...filteredByType];

        props.handlingUpdates(filteredProductsWithAllTheAppliedFilters);
    }


    function performingFilteringOperation (productsToBeFiltered, filtersObject, filterKey){
        const filteredProductsAccordingToFilterKey = productsToBeFiltered.filter((product) => 
            filtersObject[filterKey].length === 0 || filtersObject[filterKey].includes(product[filterKey])
        );
        return filteredProductsAccordingToFilterKey;
    }
    
    const toggleCheckbox = (filterKey, checkboxValue) => {
        const updatedFilters = {...filters,
            [filterKey.toLowerCase()]: filters[filterKey.toLowerCase()].includes(checkboxValue)
                  ? filters[filterKey.toLowerCase()].filter((item) => item !== checkboxValue)
                  : [...filters[filterKey.toLowerCase()], checkboxValue]
        }
        localStorage.setItem('appliedFilters',JSON.stringify(updatedFilters));
        filterProducts(updatedFilters);
      };
    
    
    return (
        <div style={{padding: '1rem 0rem 1rem 0rem'}}>
            <span className="filter-heading">{props.filterKey}</span>
            <br/>
            {props.values.map((filterValue)=>(
                <label key={filterValue} className="filter-values">
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