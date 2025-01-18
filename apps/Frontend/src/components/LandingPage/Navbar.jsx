import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  Typography,
  styled,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DrawerItem from "./DrawerItem.jsx"; // Assuming you already have a DrawerItem for mobile view

// Styling
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px",
});

const Logo = styled(motion.div)({
  display: "flex",
  alignItems: "center",
  color: "#fff",
  cursor: "pointer",
});

const MenuList = styled(List)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "flex",
    gap: "20px",
  },
}));

const NavbarButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  fontSize: "1rem",
  textTransform: "none",
  fontWeight: "bold",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 0,
    height: "2px",
    backgroundColor: "#ffcb05",
    transition: "width 0.3s ease-in-out",
  },
  "&:hover::after": {
    width: "100%",
  },
}));

const Navbar = () => {
  // Menu items
  const menuItems = [
    { text: "Home", to: "/" },
    { text: "About", to: "/about" },
    { text: "Services", to: "/services" },
    { text: "Contact", to: "/contact" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#3d4b91",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      }}
    >
      <StyledToolbar>
              {/* Logo Section */}
            <Logo>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <Box
                  component="img"
                  src="/vite.svg" // Replace with your actual logo
                  alt="Institute Logo"
                  sx={{
                    width: "40px",
                    height: "auto",
                    position: "relative",

                  }}
                />
              </motion.div>
            <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
                Placement Cell, NIT Kurukshetra
            </Typography>
        </Logo>

        {/* Desktop Menu */}
        <MenuList>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <NavbarButton
                component={Link}
                to={item.to}
                sx={{
                  "&.active": {
                    color: "#ffcb05",
                    "&::after": {
                      backgroundColor: "#ffcb05",
                      width: "100%",
                    },
                  },
                }}
              >
                {item.text}
              </NavbarButton>
            </ListItem>
          ))}
        </MenuList>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <DrawerItem>
            <MenuIcon sx={{ color: "#fff" }} />
          </DrawerItem>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
