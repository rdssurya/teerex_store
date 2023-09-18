import React from "react";
import Header from "./Header";
import "../Styles/Thanks.css";
import { Link } from "react-router-dom";

export default function Thanks() {
  // We directly navigate an user to Thanks page upon successful checkout and show success message on screen
  return (
    <>
      <Header />
      <div className="thanks">
        <h3>Order will be delivered to your address !</h3>
        <h3>Payment can be made to our delivery executive !</h3>
        <h1>THANK YOU FOR SHOPPING</h1>
        <Link to="/">
          <p id="link">EXPLORE MORE</p>
        </Link>
      </div>
    </>
  );
}
