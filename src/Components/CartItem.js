import React from 'react';
import {
    Box,
    Card,
    CardMedia,
    Typography,
    Stack
} from "@mui/material";
import '../Styles/CartItem.css';



export default function CartItem(props){
    const availableProducts=[...JSON.parse(localStorage.getItem('AllProducts'))];
    const availableCartItems = [...JSON.parse(localStorage.getItem('CartItems'))];


    const incrementQuantityByOne=()=>{
        const product = availableProducts.find(product => product.id === props.id);
        if(props.qty===product.quantity){
            alert('Quantity for selected item limit reached. Do not add more products')
        }
        else{
            const requiredIndexOfCartItem = availableCartItems.findIndex(item => item.id === props.id);
            availableCartItems[requiredIndexOfCartItem]={...availableCartItems[requiredIndexOfCartItem],
                qty:props.qty+1
            }
            localStorage.setItem('CartItems', JSON.stringify(availableCartItems));
        }
        props.handleChange();
    };



    const decrementQuantityByOne=()=>{
        const requiredIndexOfCartItem = availableCartItems.findIndex(item => item.id === props.id);
        if(props.qty===1){
            availableCartItems.splice(requiredIndexOfCartItem, 1);
        }
        else{
            availableCartItems[requiredIndexOfCartItem]={...availableCartItems[requiredIndexOfCartItem],
                qty:props.qty-1
            }
        }
        localStorage.setItem('CartItems', JSON.stringify(availableCartItems));
        props.handleChange();
    };
    


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
                    <button onClick={incrementQuantityByOne}>+</button>
                    <Typography paddingX={'1rem'}>Qty: {props.qty}</Typography>
                    <button onClick={decrementQuantityByOne}>-</button>
                </Stack>
            </Card>
        </Box>
    );
}