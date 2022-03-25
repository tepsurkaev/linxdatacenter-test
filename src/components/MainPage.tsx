import React from "react";
import jwtDecode from "jwt-decode";
import { useAppSelector } from "../app/hooks";
import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const MainPage = () => {
  const tokenFromState = useAppSelector((state) => state.users.token);
  const decodedTokenFromState: any = jwtDecode(tokenFromState);

  const localStore = localStorage.getItem("userName");

  const token: any = localStorage.getItem("stayLogged");
  const decodedTokenFromLocal: any = token && jwtDecode(token);

  return (
    <Box sx={{ margin: 5 }}>
      {localStore || decodedTokenFromLocal.userName || decodedTokenFromState ? (
        <Typography>
          Имя пользовтеля -{" "}
          {localStore ||
            decodedTokenFromLocal.userName ||
            decodedTokenFromState.userName}
        </Typography>
      ) : (
        <Link to="/edit">
          <Button>Задать имя</Button>
        </Link>
      )}
    </Box>
  );
};

export default MainPage;
