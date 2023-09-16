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
  const [filtersButtonIsClosed, setFiltersButtonIsClosed] = useState(true);

  /**
   * useEffect Hook to retrieve JSON data from API endpoint on page load
   * and to intialize our required arrays as empty strings in Local Storage
   * We use these arrays across the pages to easily access required data
   * Even if one array is not present in local Storage that means we need to initialise all the arrays
   */
  useEffect(() => {
    if (localStorage.getItem("CartItems") === null) {
      localStorage.setItem("CartItems", JSON.stringify([]));
      localStorage.setItem("AllProducts", JSON.stringify([]));
      localStorage.setItem("searchedProductsByUser", JSON.stringify([]));
      localStorage.setItem('appliedFilters',JSON.stringify({
        gender: [],
        color: [],
        type: []
    }));
    }
    makingAPICallToFetchProducts();
  }, []);

  /**
   * Definition of makingAPICallToFetchProducts()
   * Function that is called inside useEffect Hook on intial page load
   *
   *  @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *  Stores the details of all available products to localStorage as well with key name AllProducts
   *
   * API endpoint - GET 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
   *
   */
  async function makingAPICallToFetchProducts() {
    try {
      const url =
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";
      const response = await axios.get(url);
      setProducts([...response.data]);
      localStorage.setItem("AllProducts", JSON.stringify([...response.data]));
    } catch (e) {
      alert("NETWORK ERROR. Try again after sometime.");
    }
  }

  /**
   * Definition of search box handler
   * Function which is called when user clicks on search button after trying to search for a product
   * @param {string} text
   *      Text is taken from the input text field and is used to filter the products
   * If text is an empty string AllProducts from the local storage will be shown
   * In other cases products whose name includes the given text will be filtered and will be shown
   * @returns {Array.<Product>}
   *       Updates the products array and updates searchedProductsByUser in local storage
   */
  const searchTheInputValue = (text) => {
    if (text === "") {
      setProducts([...JSON.parse(localStorage.getItem("AllProducts"))]);
    } else {
      const givenInputWord = text.trim();
      const searchResults = products.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(givenInputWord.toLowerCase());
      });
      setProducts([...searchResults]);
      localStorage.setItem(
        "searchedProductsByUser",
        JSON.stringify([...searchResults])
      );
    }
  };

  const handleFiltersClick = () => {
    setFiltersButtonIsClosed(!filtersButtonIsClosed);
    setProducts([...JSON.parse(localStorage.getItem('AllProducts'))]);
    localStorage.setItem('appliedFilters',JSON.stringify({
      gender: [],
      color: [],
      type: []
    }));
  }

  /**
   * Updates the products list according to the applied filters
   * Function which is called when there is a change of filters
   *
   * @param { Array.<Product> } arr
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
      <Header />
      <div className="text-field">
        <input
          type="text"
          name="searchBar"
          onChange={(e) => searchTheInputValue(e.target.value)}
          placeholder="Search (Ex: Polo)"
        />
      </div>

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
          <Grid item md={9} textAlign={'center'} >
            <h2>
              Sorry! Products based on your requirements are not available. Clear
              filters to view available products.
            </h2>
          </Grid>
        ) : (
          <Grid item  md={9} sm={9} xs={9} paddingRight={'2rem'}>
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
      </Grid>
    </>
  );
}
