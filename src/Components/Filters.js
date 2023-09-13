import React, { useEffect } from "react";
import FilterComponent from "./FilterComponent";
import '../Styles/Filters.css'

export default function Filters(props){
    const listedProducts = [...props.listedProducts];
    const arrayOfFilters = [];

    
    const getUniqueFilterValues = (arrayOfFilterValues)=>{
        const givenValues = [...arrayOfFilterValues];
        return [...new Set(givenValues)];
    }

    const arrayOfUniqueFilterValues = () => {
        const uniqueGenders=['Gender',getUniqueFilterValues(listedProducts.map((product) => product.gender))];
        const uniqueTypes=['Type',getUniqueFilterValues(listedProducts.map((product) => product.type))];
        const uniqueColors=['Color',getUniqueFilterValues(listedProducts.map((product) => product.color))];
        const priceRanges=['Price',['0-250','250-450','450-500']];
        arrayOfFilters.push(uniqueGenders,uniqueTypes,uniqueColors,priceRanges);
    }

    arrayOfUniqueFilterValues();
    

    const dummy=(arr)=>{
        props.handler(arr);
    }
    return (
        <div className="filters-div">
            <div id="filters-heading"><p>FILTERS</p></div>
           {arrayOfFilters.map((filter)=>(
                <FilterComponent 
                    heading={filter[0]} 
                    values={filter[1]} 
                    key={filter[0]} 
                    handler={dummy}
                />
           ))}
        </div>
    );
}