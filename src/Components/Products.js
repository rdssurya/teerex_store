import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import axios from "axios";
import Header from "./Header";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import "../Styles/Products.css";

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


export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchedWord, setSearchedWord] = useState('');
  const [filtersButtonIsClosed, setFiltersButtonIsClosed] = useState(true);
  const [currentlyShowing, setCurrentlyShowing] = useState('ALL PRODUCTS');
  const [error, setError] = useState(null);


  /**
   * useEffect Hook to retrieve JSON data from API endpoint on page load
   * and to intialize our required arrays as empty strings in Local Storage
   * We use these arrays across the pages to easily access required data
   * Even if one array is not present in local Storage that means we need to initialise all the arrays
   */
  useEffect(() => {
    setEmptyArraysInLocalStorage();
    makingAPICallToFetchProducts();
  }, []);

  /**
   * Definition of makingAPICallToFetchProducts()
   * Function that is called inside useEffect Hook on intial page load
   *
   *  @returns { Array.<Product> } - Array of products
   *      Array of product objects with complete data on all available products
   *  Stores the details of all available products in localStorage as well with key name allProducts
   *
   * API endpoint - GET 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
   *
   */
  const makingAPICallToFetchProducts = async () => {
    try {
      const url =
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";
      const response = await axios.get(url);
      setProducts([...response.data]);
      localStorage.setItem("allProducts", JSON.stringify([...response.data]));
    } catch (e) {
      setError(e.message);
    }
  };

  /**
   * Function which can be used to initialize an array of keys to empty arrays in local storage
   * @param {Array.<string>} arrayOfKeys 
   * Used when checkout button is clicked to set all the required keys of local storgage to []
   */
  const setEmptyArraysInLocalStorage = () => {
    const keysOfLocalStorage = ['cartItems','allProducts','searchedProductsByUser'];
    keysOfLocalStorage.forEach((key) => {
      localStorage.setItem( key, JSON.stringify([]));
    });
    localStorage.setItem('appliedFilters',JSON.stringify({
      gender: [],
      color: [],
      type: []
    }));
  };

  /**
   * Function to search products based on a search keyword
   * @param {string} text - The search keyword
   * @param {Array.<Product>} availableProducts - Array of all available products
   * If the text is an empty string it will return all the available products
   * In other cases it will return a products array where all the products include that search value in thier name property
   * @returns {Array.<Product>} - Array of searched products
   */
  const searchProducts = (text, availableProducts) => {
    if (!text) {
      return availableProducts;
    }
    const givenInputWord = text.trim().toLowerCase();
    return availableProducts.filter((product) =>
      product.name.toLowerCase().includes(givenInputWord)
    );
  };

  /**
   * Definition of search box handler
   * Function which is called when user clicks on search button after typing for a product
   * @param {string} text - Searched Value in text box
   *      Text is taken from the input text field and is used to search the products
   * Text and available products in our store are passed as arguments to searchProducts function
   * Returned value from above function updates the products array and updates searchedProductsByUser in local storage
   * Finally We set search value to empty string and filters button will be closed.
   */
  const searchTheInputValue = (text) => {
    const availableProducts = JSON.parse(localStorage.getItem("allProducts")); 
    const searchedProducts = searchProducts(text, availableProducts);
    setCurrentlyShowing(text ? text.toUpperCase() : 'ALL PRODUCTS');
    setProducts(searchedProducts); 
    localStorage.setItem("searchedProductsByUser", JSON.stringify(searchedProducts));
    setFiltersButtonIsClosed(true); 
    setSearchedWord('');
  };

  /**
   * Function which is called on clicking Apply/Clear Filters
   * If previously the filters are closed(not displayed) i.e. button is closed before clicking event
   * Then first all the filters are set empty arrays in local storage so as to allow user to apply filters afresh.
   * If previously the filters are open (displayed) i.e. button is open before clicking event
   * All the products will be shown on the screen
   */
  const handleFiltersClick = () => {
    if (filtersButtonIsClosed){
        localStorage.setItem('appliedFilters',JSON.stringify({
        gender: [],
        color: [],
        type: []
      }));
    }else {
      setCurrentlyShowing("ALL PRODUCTS")
      setProducts(JSON.parse(localStorage.getItem('allProducts')));
    }
    setFiltersButtonIsClosed(!filtersButtonIsClosed);
  }

  /**
   * Updates the products list according to the applied filters
   * Function which is called when there is a change in applied filters
   *
   * @param { Array.<Product> } filteredProducts - Array of filtered products
   *      Array of objects with complete data on all products according to filters
   * This function is PASSED AS PROPS TO FILTERS component which is used whenever there is change of filters
   * Updates the products array
   */
  const filteredProductsListUpdater = (filteredProducts) => {
    setProducts(filteredProducts);
  };

  // Products component which includes Header, search bar, responsive products grid, responsive filters component and other buttons as required
  return (
    <>
      {error ?  <div className="error">{error}</div>:
      <>
      <Header />
      <div className="text-field">
        <input
          type="text"
          name="searchBar"
          value = {searchedWord}
          onChange={(e) => setSearchedWord(e.target.value)}
          placeholder="Search (Ex: Polo)"
        />
        <button onClick={() => searchTheInputValue(searchedWord)}>Search</button>
      </div>
      {/* Container with products and filters */}
      <Grid container>

        <Grid item className="display-filters-md" md={3} sm={3} xs={3}>
          <Button fullWidth variant={'contained'} size="small" onClick={handleFiltersClick}>
            <span className="filters-btn">Apply/Clear Filters</span>
          </Button>
          {filtersButtonIsClosed ? (
            <></>
          ) : (
            <Filters listedProducts={products} updaterProp={filteredProductsListUpdater} />
          )}
        </Grid>

        {products.length === 0 ? (
          <Grid item md={9} sm={9} xs={9} textAlign={'center'} >
            <h2>
              Sorry! Products based on your requirements are not available. Clear
              filters to view available products.
            </h2>
          </Grid>
        ) : (
          <Grid item  md={9} sm={9} xs={9} paddingRight={'2rem'}>
            <h3>Currently Showing: {currentlyShowing}</h3>
            <Grid container spacing={3} paddingX={"2px"}>
              {products.map((product) => (
                <Grid item key={product.id} lg={3} md={4} sm={6} xs={12}>
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
        )}
      </Grid></>}
    </>
  );
}
