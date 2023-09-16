import React, { useState , useEffect } from "react";
import { Typography, Stack, TextField, Card } from "@mui/material";
import {useNavigate} from "react-router-dom";
import Header from "./Header";
import CartItem from "./CartItem";
import "../Styles/Cart.css";


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
    const [cartItems, setCartItems] = useState([...JSON.parse(localStorage.getItem('cartItems'))] || []);
    const [ totalItemsCost, setTotalItemsCost] = useState(0);
    const [ address, setAddress] = useState('');
    const navigate = useNavigate();
    const keysOfLocalStorage = Object.keys(localStorage);
    const [showErrorMessage, setShowErrorMessage] = useState('');


    // Whenever there is a change in the item quantity inside our cart it is reflected in cartItems present in local storage
    // As there is a change in cartItems total cart value will get updated with new cart value
    useEffect(() => {
        totalCartValue(cartItems);
    }, [cartItems]);



    /**
     * Function which is called inside useEffect Hook to update the Total cost
     * @param {Array.<cartItem>} cartItems
     * Loops over the cartItems array and returns us the total cost of items present inside our cart
     *  Total Items Cost is updated accordingly
     */
    const totalCartValue = (cartItems) => {
        const newTotalSum = cartItems.reduce((accumulator, currentValue) => {
            const product = currentValue.qty * currentValue.cost;
            return accumulator + product;
        }, 0);
        setTotalItemsCost(newTotalSum);
    };


    /**
     * Function which is called upon updating/deleting the quantity of items in CartItem.js (handleChange())
     * Whenever the quantity is updated or deleted in a cartItem, CartItems array in local storage is updated
     * So to reflect that change in /cart this function is called...
     * Connector function between Cart.js and CartItem.js to handle changes. 
     */
    const updatingTheQuantityOfCartItems = () => {
        const updatedCartItems = [...JSON.parse(localStorage.getItem('cartItems'))];
        setCartItems(updatedCartItems);
    }
    
    /**
     * Function which is called upon when a condition is not meeting our requirement on clicking checkout button
     * @param {string} errorMessage 
     *  Takes the error message as a string and is shown the screen and again hides it after timer goes off
     */
    const showAndHideErrorMessage = (errorMessage) => {
        const timer = 3000;
        setShowErrorMessage(errorMessage);
        setTimeout(()=>{setShowErrorMessage('')}, timer);
    }

    /**
     * Function which is called upon clicking the checkout button
     * First checks whether cart is empty or not if empty shows alert message to add atleast one item to cart
     * If cart has items and address is not filled then alert message is shown to enter valid address
     * If address field is less than 20 characters then alert message is shown to enter 20 character long address
     * If everything is fine then user will be navigated to thanks page and keys in local storage will be set to empty arrays
     */
    const handleCheckout = () => {
        if(cartItems.length===0){
            showAndHideErrorMessage('Add atleast one product to cart to checkout');
        }
        else if(address === ''){
            showAndHideErrorMessage('Enter a valid address');
        }
        else if(address.length<20){
            showAndHideErrorMessage('Address should be atleast 20 characters');
        }
        else{
            navigate('/thanks');
            setEmptyArraysInLocalStorage(keysOfLocalStorage);
        }
    }

    /**
     * Function which can be used to initialize an array of keys to empty arrays in local storage
     * @param {Array.<string>} arrayOfKeys 
     * Used when checkout button is clicked to set all the required keys of local storgage to []
     */
    const setEmptyArraysInLocalStorage = ( arrayOfKeys ) => {
        arrayOfKeys.forEach((key) => {
            localStorage.setItem( key, JSON.stringify([]));
        });
    }


    // Cart page has one column for cart components and another column for total cart value and checkout 
    return (
        <>
        <Header userInCartsPage={true}/>
        <div className="parent-div">

            {/* This stack is for dynamically loading the cart items of the user according to changes, handleChange prop connects Cart and CartItem*/}
            <Stack marginX={'1rem'}>
                {cartItems.length === 0 ? <><Typography>Cart is empty!</Typography></> :
                <>{cartItems.map((cartItem)=>(
                    <CartItem 
                        key={cartItem.id}
                        name={cartItem.name} 
                        image={cartItem.image}
                        cost={cartItem.cost} 
                        qty={cartItem.qty}
                        id={cartItem.id}
                        handleChange={updatingTheQuantityOfCartItems}
                    />
                    ))}
                </>}
            </Stack>

            <Card style={{ width: 340, height: 250 }}>
                {/* This stack is for details of cost all cart products and for adding address and checking out*/}
                <Stack margin={'1rem'} spacing={1}>
                    <Typography fontStyle={'oblique'}>Order Summary</Typography>
                    <Typography fontWeight={'700'}>Total Cart Value: {totalItemsCost} INR</Typography>
                    <TextField
                        label = "Enter delivery address..."
                        multiline
                        rows={3} 
                        fullWidth 
                        variant="outlined"
                        value={address} 
                        onChange={(e)=>setAddress(e.target.value)}
                    />

                    {/* Showing and hiding error message */}
                    {showErrorMessage && <div className="error-message"><span>{showErrorMessage}</span></div>}

                    <button onClick={handleCheckout}>
                        CHECKOUT
                    </button>
                </Stack>
            </Card>

        </div>
        </>
    );
}