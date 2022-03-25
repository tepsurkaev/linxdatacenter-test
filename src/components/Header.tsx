import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { Link } from "react-router-dom";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuPopover from "./MenuPopover";
import { styled } from "@mui/material";
import { logout } from "../features/users/usersSlice";

const StyledBox = styled(Box)`
  display: flex;

  @media (max-width: 575px) {
    display: none;
  }
`;

const StyledIconButton = styled(IconButton)`
  @media (min-width: 575px) {
    display: none;
  }
`;

const Header = () => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <AppBar position="static">
      <Toolbar>
        <StyledIconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleClick}
        >
          <MenuIcon />
        </StyledIconButton>
        <MenuPopover
          id={id}
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
        <StyledBox>
          <Link to="/">
            <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
              Главная
            </Typography>
          </Link>
          <Link to="/edit">
            <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
              Профиль
            </Typography>
          </Link>

          <Button onClick={handleLogout} color="inherit">
            Выход
          </Button>
        </StyledBox>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
