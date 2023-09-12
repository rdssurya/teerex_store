import React from "react";
import Header from "./Header";
import "../Styles/Thanks.css";


export default function Thanks(){
    return (
        <>
            <Header/>
            <div className="thanks">
                <h3>Order Placed Successfully!</h3>
                <h1>THANK YOU FOR SHOPPING</h1>   
            </div>  
        </>
    );
}