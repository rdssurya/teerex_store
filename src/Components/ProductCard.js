import React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardMedia,
    Typography,
    Stack
} from "@mui/material";
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

    /**
     * Check whether the product is already in cart items
     * 
     * @param {string} productName 
     *      Name of the product which the user wants to add to cart
     * @param {Array.<cartItem>} itemsInCart 
     *      Array of objects containing details of items in cart  
     * @returns {boolean}
     *      Whether item user wants to add to card is already present in cart or not
     * 
     * Returns true if item is already present in cart
     * Returns false if item is present in cart
     */
    const checkItemInCart = (productName,itemsInCart) => { 
        const product = itemsInCart.find(cartItem => cartItem.name === productName);
        return !!product;
    };
    

    /**
     * Function which is called upon clicking add to cart button on product card
     * 
     * checkItemInCart function is called here, which takes productName and
     * details of the CartItems from localStorage as arguments
     * 
     * If product is already in cart an alert message is shown
     * If product is not in cart details of that particular product are added to CartItems
     */
    const addingProductToCart=()=>{
        const itemsInCart = [...JSON.parse(localStorage.getItem('CartItems'))];
        const isItemInCart = checkItemInCart(props.name,itemsInCart);

        if(isItemInCart===true){
            alert('Item is already in cart. Click on Cart to navigate to cart page');
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
            localStorage.setItem('CartItems',JSON.stringify([...itemsInCart,obj]));
        }
    };


    return (
        <Card>
            <CardMedia
                component="img"
                alt={props.name}
                className='productCard-image'
                image={props.image}
            />
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} paddingX={'1rem'}>
                <Typography fontWeight={700} fontSize={'20px'}>{props.name}</Typography>
                <Typography fontWeight={700}>{props.currency} {props.cost}</Typography>
            </Stack>
            <CardActions>
                <Button onClick={addingProductToCart} variant='contained' fullWidth>
                    ADD TO CART
                </Button>
            </CardActions>
        </Card>
    );
}