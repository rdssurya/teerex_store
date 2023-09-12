import React from 'react';
import {
    Box,
    Card,
    CardMedia,
    Typography,
    Stack
} from "@mui/material";
import '../Styles/CartItem.css';

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

export default function CartItem(props){

    // Retrieving available data on all products in stock from Local Storage
    const availableProducts=[...JSON.parse(localStorage.getItem('AllProducts'))];
    
    // Retrieving the details of cart items added to cart from Local Storage
    const availableCartItems = [...JSON.parse(localStorage.getItem('CartItems'))];


    /**
     * Function which is called to increment the quantity of an item inside cart
     * @param {number} id 
     * @param {number} quantity 
     * If user tries to increase the quantity of a particular item greater than the quantity in stock
     *      An alert message is shown
     * Otherwise quantity will be incremented and we update the array of CartItems in Local Storage
     * @returns {Array.<cartItem>} updated in local storage
     * ATLAST WE CALL handleChange() function so as to tell the /cart page that CartItems array has been updated in Local Storage  
     */
    const incrementQuantityByOne=( id, quantity)=>{
        const product = availableProducts.find(product => product.id === id);
        if(quantity===product.quantity){
            alert(`Available stock for this product is ${props.qty}.`)
        }
        else{
            const requiredIndexOfCartItem = availableCartItems.findIndex(item => item.id === id);
            availableCartItems[requiredIndexOfCartItem]={...availableCartItems[requiredIndexOfCartItem],
                qty:quantity+1
            }
            localStorage.setItem('CartItems', JSON.stringify(availableCartItems));
        }
        props.handleChange();
    };


    /**
     * Function which is called to decrement the quantity of an item inside cart
     * @param {number} id 
     * @param {number} quantity 
     * If user decrements the quantity of an item to zero
     *      That item will be deleted from the cart
     * In other cases quantity will be decremented and we update the array of CartItems in Local Storage
     * @returns {Array.<cartItem>} updated in local storage
     * ATLAST WE CALL handleChange() function so as to tell the /cart page that CartItems array has been updated in Local Storage
     */
    const decrementQuantityByOne=( id, quantity)=>{
        const requiredIndexOfCartItem = availableCartItems.findIndex(item => item.id === id);
        if(quantity===1){
            availableCartItems.splice(requiredIndexOfCartItem, 1);
        }
        else{
            availableCartItems[requiredIndexOfCartItem]={...availableCartItems[requiredIndexOfCartItem],
                qty:quantity-1
            }
        }
        localStorage.setItem('CartItems', JSON.stringify(availableCartItems));
        props.handleChange();
    };
    

    /**
     * Function which is called on clicking the delete button
     * @param {number} id 
     * Deletes that particular cart item from the cart 
     * Updates the CartItems array in local storage as well
     * @returns {Array.<cartItem>} updated in local storage
     * ATLAST WE CALL handleChange() function so as to tell the /cart page that CartItems array has been updated in Local Storage 
     */
    const handleDelete=(id)=>{
        const requiredIndexOfCartItem = availableCartItems.findIndex(item => item.id === id);
        availableCartItems.splice(requiredIndexOfCartItem, 1);
        localStorage.setItem('CartItems', JSON.stringify(availableCartItems));
        props.handleChange();
    }
    

    return (
        <Box marginY={'1rem'}>
            <Card>
                <Stack direction={'row'}>
                    <CardMedia
                        component="img"
                        alt={props.name}
                        className='cartCard-image'
                        image={props.image}
                    />
                    <Stack paddingX={'1rem'}>
                        <Typography fontWeight={700}>{props.name}</Typography>
                        <Typography fontWeight={700}>Cost: {props.currency} {props.cost}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={'row'} margin={'1rem'}>
                    <button onClick={() => {decrementQuantityByOne(props.id, props.qty)} }>-</button>    
                    <Typography paddingX={'1rem'}>Qty: {props.qty}</Typography>
                    <button onClick={() => {incrementQuantityByOne(props.id, props.qty)} }>+</button>
                </Stack>
                <Stack margin={'5px'}>
                    <button onClick={() => {handleDelete(props.id)} }>Delete</button>
                </Stack>
            </Card>
        </Box>
    );
}