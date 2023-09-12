import React, { useState , useEffect } from "react";
import { Typography, Stack } from "@mui/material";
import {useNavigate} from "react-router-dom";
import Header from "./Header";
import CartItem from "./CartItem";

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

export default function Cart(){
    const [cartItems, setCartItems]=useState([...JSON.parse(localStorage.getItem('CartItems'))] || []);
    const [value,setValue]=useState(0);
    const navigate=useNavigate();

    // Whenever there is a change in the item quantity inside our cart it is reflected in cartItems
    // and we update the value of Total Cost in /cart
    useEffect(()=>{
        totalCartValue(cartItems);
    },[cartItems]);

    /**
     * Function which is called inside useEffect Hook to update the Total cost
     * @param {Array.<cartItem>} cartItems
     * Loops over the cartItems array and returns us the total cost of items present inside our cart
     * @returns {number} and value is updated accordingly
     */
    const totalCartValue=(cartItems)=>{
        const totalSum = cartItems.reduce((accumulator, currentValue) => {
            const product = currentValue.qty * currentValue.cost;
            return accumulator + product;
        }, 0);
        setValue(totalSum);
    }

    /**
     * Function which is called upon updating/deleting the quantity of items in CartItem.js (handleChange())
     * Whenever the quantity is updated or deleted in a cartItem, CartItems array in local storage is updated
     * So to reflect that change in /cart this function is called...
     */
    const updatingTheQuantityOfCartItems=()=>{
        setCartItems([...JSON.parse(localStorage.getItem('CartItems'))]);
    }
    
    return (
        <>
        <Header/>
        <Stack direction={'row'} justifyContent={'space-around'} >
            <Stack justifyContent={'center'} alignItems={'center'} marginX={'1rem'}>
                <Typography>Cart</Typography>
                {cartItems.map((cartItem)=>(
                    <CartItem 
                        key={cartItem.id}
                        name={cartItem.name} 
                        image={cartItem.image}
                        cost={cartItem.cost} 
                        qty={cartItem.qty}
                        currency={cartItem.currency}
                        id={cartItem.id}
                        handleChange={updatingTheQuantityOfCartItems}
                    />
                ))}
            </Stack>
            <Stack marginX={'1rem'}>
                <Typography>Total Cost: {value} INR</Typography> 
                <button onClick={() =>{
                        if(cartItems.length===0){
                            alert('Add atleast one product to Checkout!');
                            navigate('/');
                        }
                        else{
                            navigate('/thanks');
                            localStorage.clear();
                        }
                    }}>
                    CHECKOUT
                </button>
            </Stack>
        </Stack>
        </>
    );
}