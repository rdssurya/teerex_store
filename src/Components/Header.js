import React from "react";
import { Button, Stack, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import "../Styles/Header.css";

const Header = () => {
  // Header with the store title at one end and products, cart buttons on the other end
  return (
    <>
      <Box className="header">
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"row"}>
            <StorefrontOutlinedIcon />
            <Typography fontFamily={"fantasy"}>TEEREX STORE</Typography>
          </Stack>

          <Stack direction={"row"}>
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
          </Stack>
        </Stack>
      </Box>
      <hr />
    </>
  );
};

export default Header;
