import React from "react";
import Header from "./Header";
import "../Styles/Thanks.css";
import { Link } from "react-router-dom";


export default function Thanks(){
    return (
        <>
            <Header/>
            <div className="thanks">
                <h3>Order Placed Successfully!</h3>
                <h1>THANK YOU FOR SHOPPING</h1>
                <Link to='/'><p id="link">EXPLORE MORE</p></Link>
            </div>  
        </>
    );
}