import React from "react";
import { useAppDispatch } from "../app/hooks";
import { Link } from "react-router-dom";
import { Button, Popover, Typography } from "@mui/material";
import { logout } from "../features/users/usersSlice";

interface PopoverProps {
  id: string | undefined;
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
}

const MenuPopover = ({ id, open, anchorEl, handleClose }: PopoverProps) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Link to="/">
        <Typography sx={{ p: 2, color: "#000" }}>Главная</Typography>
      </Link>
      <Link to="/edit">
        <Typography sx={{ p: 2, color: "#000" }}>Профиль</Typography>
      </Link>
      <Button onClick={handleLogout} sx={{ p: 2, color: "#000" }}>
        Выход
      </Button>
    </Popover>
  );
};

export default MenuPopover;
