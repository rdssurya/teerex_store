import React, { useState , useEffect } from "react";
import { Typography, Stack } from "@mui/material";
import Header from "./Header";
import CartItem from "./CartItem";


export default function Cart(){
    const [cartItems, setCartItems]=useState([...JSON.parse(localStorage.getItem('CartItems'))] || []);
    const [value,setValue]=useState(0);

    useEffect(()=>{
        totalCartValue(cartItems);
    },[cartItems]);

    const totalCartValue=(cartItems)=>{
        const totalSum = cartItems.reduce((accumulator, currentValue) => {
            const product = currentValue.qty * currentValue.cost;
            return accumulator + product;
        }, 0);
        setValue(totalSum);
    }

    const dummy=()=>{
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
                        handleChange={dummy}
                    />
                ))}
            </Stack>
            <Stack marginX={'1rem'}>
                <Typography>Total Cost: {value} INR</Typography>
                <button>CHECKOUT</button>
            </Stack>
        </Stack>
        </>
    );
}