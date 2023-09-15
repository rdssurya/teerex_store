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

    // Retrieving available data on all products from Local Storage
    const availableProducts=[...JSON.parse(localStorage.getItem('AllProducts'))];
    
    // Retrieving the details of cart items added to cart by user from Local Storage
    const availableCartItems = [...JSON.parse(localStorage.getItem('CartItems'))];


    /**
     * Function which is called to increment the quantity of an item inside cart
     * @param {number} idOfSelectedProduct
     * @param {number} currentQuantity 
     * If user tries to increase the quantity of a particular item greater than the quantity in stock
     *      An alert message is shown
     * Otherwise quantity will be incremented 
     * We update the array of CartItems in Local Storage
     * ATLAST WE CALL handleChange() function so as to tell the Cart.js that CartItems array has been updated in Local Storage
     * This is where we use handleChange prop which calls updatingTheQuantityOfCartItems() function of Cart.js to tell the Cart that there is a change in CartItems
     */
    const incrementQuantityByOne = ( idOfSelectedProduct, currentQuantity) => {
        const selectedProduct = availableProducts.find(product => product.id === idOfSelectedProduct);
        const availableQuantityOFTheProduct = selectedProduct.quantity;

        if(currentQuantity === availableQuantityOFTheProduct){
            alert(`Available stock for this product is ${availableQuantityOFTheProduct}. Cannot add more products`);
        }
        else{
            const indexOfRequiredCartItem = availableCartItems.findIndex(item => item.id === idOfSelectedProduct);
            availableCartItems[indexOfRequiredCartItem] = {...availableCartItems[indexOfRequiredCartItem],
                qty : currentQuantity + 1
            };
            localStorage.setItem('CartItems', JSON.stringify(availableCartItems));
        }

        props.handleChange();
    };


    /**
     * Function which is called to decrement the quantity of an item inside cart
     * @param {number} idOfSelectedProduct
     * @param {number} currentQuantity 
     * If user decrements the quantity of an item to zero
     *      That item will be removed from the cart
     * In other cases quantity will be decremented and we update the array of CartItems in Local Storage
     * ATLAST WE CALL handleChange() function so as to tell the cart.js that CartItems array has been updated in Local Storage
     * This is where we use handleChange prop which calls updatingTheQuantityOfCartItems() function of Cart.js to tell the Cart that there is a change in CartItems
     */
    const decrementQuantityByOne=( idOfSelectedProduct, currentQuantity)=>{
        const indexOfRequiredCartItem = availableCartItems.findIndex(item => item.id === idOfSelectedProduct);

        if(currentQuantity === 1){
            availableCartItems.splice(indexOfRequiredCartItem, 1);
        }
        else{
            availableCartItems[indexOfRequiredCartItem] = {...availableCartItems[indexOfRequiredCartItem],
                qty : currentQuantity - 1
            };
        }

        localStorage.setItem('CartItems', JSON.stringify(availableCartItems));
        props.handleChange();
    };
    

    /**
     * Function which is called on clicking the delete button
     * @param {number} idOfSelectedProduct 
     * Deletes that particular cart item from the cart 
     * Updates the CartItems array in local storage as well
     * ATLAST WE CALL handleChange() function so as to tell the Cart.js page that CartItems array has been updated in Local Storage
     * This is where we use handleChange prop which calls updatingTheQuantityOfCartItems() function of Cart to tell the Cart that there is a change in CartItems
     */
    const handleDelete = (idOfSelectedProduct) => {
        const indexOfRequiredCartItem = availableCartItems.findIndex(item => item.id === idOfSelectedProduct);
        availableCartItems.splice(indexOfRequiredCartItem, 1);
        localStorage.setItem('CartItems', JSON.stringify(availableCartItems));
        props.handleChange();
    };
    
    // CartItem component returns a card component with details of each cart item
    return (
        <Box marginY={'1rem'}>
            <Card style={{ width: 340, height: 200 }}>

                {/* This stack is for cart item's image and for it's name and cost */}
                <Stack direction={'row'}>
                    <CardMedia
                        component="img"
                        alt={props.name}
                        className='cartCard-image'
                        image={props.image}
                        style={{ objectFit: 'contain', width: '200px' }}
                    />
                    <Stack paddingX={'1rem'}>
                        <Typography fontWeight={700} fontSize={'15px'}>{props.name}</Typography>
                        <Typography fontWeight={700} fontSize={'15px'}>Cost: INR {props.cost}</Typography>
                    </Stack>
                </Stack>

                {/* This stack is for cart item's quantity in cart and buttons to increase or decrease the quantity */}
                <Stack direction={'row'} margin={'1rem'}>
                    <button onClick={() => {decrementQuantityByOne(props.id, props.qty)} }>-</button>    
                    <Typography paddingX={'1rem'}>Qty: {props.qty}</Typography>
                    <button onClick={() => {incrementQuantityByOne(props.id, props.qty)} }>+</button>
                </Stack>

                {/* This stack is for delete button to delete the item from the cart */}
                <Stack margin={'5px'}>
                    <button onClick={() => {handleDelete(props.id)} }>Delete</button>
                </Stack>

            </Card>
        </Box>
    );
}