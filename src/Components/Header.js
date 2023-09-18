import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import "../Styles/Header.css";

const Header = () => {
  // Header with the store title at one end and products, cart buttons on the other end
  return (
    <>
      <div className="header">
        <div className="header-components">
          <StorefrontOutlinedIcon />
          <span>TEEREX STORE</span>
        </div>
        {/* Products and Cart Buttons */}
        <div className="header-components">
          <Link to="/">
            <Button>
              <ShoppingBagRoundedIcon />
              PRODUCTS
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="outlined">
              <ShoppingCartCheckoutRoundedIcon />
              CART
            </Button>
          </Link>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Header;
