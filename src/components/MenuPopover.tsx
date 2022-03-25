import React from "react";
import { Link } from "react-router-dom";
import { Button, Popover, Typography } from "@mui/material";

interface PopoverProps {
  id: string | undefined;
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
}

const MenuPopover = ({ id, open, anchorEl, handleClose }: PopoverProps) => {
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
      <Button sx={{ p: 2, color: "#000" }}>Выход</Button>
    </Popover>
  );
};

export default MenuPopover;
