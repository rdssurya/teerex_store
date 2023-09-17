import React, { useState } from 'react';
import {Button} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import '../Styles/ProductCard.css';


// Definition of Data Structures used
/**
 * @typedef {Object} cartItem - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {number} qty - Quantity of product in cart
 * @property {number} cost - The price of the product
 * @property {number} id - Id of the product
 * @property {string} currency - Currency of the price
 * @property {string} image - Contains URL for the product image
 */

export default function ProductCard(props) {
    const [showMessage,setShowMessage] = useState('');

    /**
     * Function to check whether the product is already in cart items
     *  
     * @param {string} nameOfProductWhichUserWantsToAdd - Name of the product which the user wants to add to cart
     * @param {Array.<cartItem>} itemsInCart - Array of objects containing details of items in cart  
     * @returns {boolean}
     *      Whether item user wants to add to card is already present in cart or not
     * Returns true if item is already present in cart
     * Returns false if item is present in cart
     */
    const checkItemIsInCart = ( nameOfProductWhichUserWantsToAdd, itemsInCart) => { 
        const product = itemsInCart.find(cartItem => cartItem.name === nameOfProductWhichUserWantsToAdd);
        return !!product;
    };

    /**
     * Function which is called upon clicking add to cart button on products card
     * @param {string} message 
     * Message will be shown in product card according to the requirement.
     */
    const showAndHideMessage = (message) => {
        const timer = 3000;
        setShowMessage(message);
        setTimeout(()=>{setShowMessage('')}, timer);
    }

    /**
     * Function which is called upon clicking add to cart button on product card
     * 
     * checkItemInCart function is called here, which takes nameOfProductWhichUserWantsToAdd and
     * details of the CartItems from localStorage as arguments
     * If product is already in cart an alert message is shown to inform item is in cart
     * If product is not in cart, details of that particular product are added to cartItems in local storage
     * A message will be shown accordingly
     */
    const addingProductToCart = (localStorage, props) => {
        const itemsCurrentlyInCart = [...JSON.parse(localStorage.getItem('cartItems'))];
        // Checking for whether item in cart or not
        const isItemInCart = checkItemIsInCart( props.name, itemsCurrentlyInCart);

        if(isItemInCart === true){
            showAndHideMessage('Item is already in cart. Click on cart to view cart');
        }
        else{
            const obj={
                name:props.name,
                cost:props.cost,
                currency:props.currency,
                image:props.image,
                id:props.id,
                qty:1
            };
            const updatedCartItems = [...itemsCurrentlyInCart, obj];
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            showAndHideMessage('Product added to cart. Click on Cart to view cart');
        }
    };

    // Returning Product Card with image of the product, name and price details of the products and add to cart button
    return (
        <div>
            {/* Image div for the product card */}
            <div>
                <img src={props.image} alt={props.name} className='productCard-image'/>
            </div>
            {/* Product details div for the product card */}
            <div className='product-details'>
                <div className="overflow-container">{props.name}</div>
                <span style={{fontWeight: '700'}}>{props.currency} {props.cost}</span>
            </div>
            {showMessage && <div className="message"><span>{showMessage}</span></div>}

            {/* Add to cart button */}
            <div className='add-to-cart'>
                <Button onClick={()=>addingProductToCart(localStorage,props)} variant='contained' fullWidth>
                    <AddShoppingCartIcon/> ADD TO CART 
                </Button>
            </div>
        </div>
    );
}