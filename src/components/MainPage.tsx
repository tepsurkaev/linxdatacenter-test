import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MainPage = () => {
  const name = "Bill";
  const isName = false;
  return (
    <Box sx={{ margin: 5 }}>
      {isName ? (
        <Typography>Имя пользовтеля - {name}</Typography>
      ) : (
        <Link to="/edit">
          <Button>Задать имя</Button>
        </Link>
      )}
    </Box>
  );
};

export default MainPage;
