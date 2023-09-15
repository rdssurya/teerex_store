import React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardMedia,
    Typography,
    Stack
} from "@mui/material";
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

    /**
     * Check whether the product is already in cart items
     * 
     * @param {string} nameOfProductWhichUserWantsToAdd 
     *      Name of the product which the user wants to add to cart
     * @param {Array.<cartItem>} itemsInCart 
     *      Array of objects containing details of items in cart  
     * @returns {boolean}
     *      Whether item user wants to add to card is already present in cart or not
     * 
     * Returns true if item is already present in cart
     * Returns false if item is present in cart
     */
    const checkItemIsInCart = ( nameOfProductWhichUserWantsToAdd, itemsInCart) => { 
        const product = itemsInCart.find(cartItem => cartItem.name === nameOfProductWhichUserWantsToAdd);
        return !!product;
    };
    

    /**
     * Function which is called upon clicking add to cart button on product card
     * 
     * checkItemInCart function is called here, which takes nameOfProductWhichUserWantsToAdd and
     * details of the CartItems from localStorage as arguments
     * 
     * If product is already in cart an alert message is shown
     * If product is not in cart details of that particular product are added to CartItems
     */
    const addingProductToCart = () => {
        const itemsCurrentlyInCart = [...JSON.parse(localStorage.getItem('CartItems'))];
        
        // Checking for whether item in cart or not
        const isItemInCart = checkItemIsInCart( props.name, itemsCurrentlyInCart);

        if(isItemInCart === true){
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
            const updatedCartItems = JSON.stringify( [...itemsCurrentlyInCart, obj] );
            localStorage.setItem('CartItems', updatedCartItems);
            alert('Product added to cart. Feel free to add more products. Or click on Cart to view cart');
        }
    };

    // Returning Product Card with image of the product, name and price details of the products and add to cart button
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
                    <AddShoppingCartIcon/> ADD TO CART 
                </Button>
            </CardActions>
            
        </Card>
    );
}