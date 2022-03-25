import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Formik, Form, Field } from "formik";
import { Button, TextField, Box, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { userNameEdit } from "../features/users/ActionCreators";

const StyledTextBox = styled(Box)`
  width: 500px;
  display: flex;
  align-items: center;
  margin: 50px auto 10px auto;

  @media (max-width: 510px) {
    width: 350px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
`;

const StyledForm = styled(Form)`
  width: 500px;
  margin: 0 auto;

  @media (max-width: 510px) {
    width: 350px;
  }
`;

interface FormValues {
  userName: string;
}

interface EditData {
  userName: string;
  token: string;
}

const initialValues: FormValues = { userName: "" };

const EditPage = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.users.loading);

  const token = useAppSelector((state) => state.users.token);

  const localS = localStorage.getItem("stayLogged");

  const tokens: any = token || localS;

  const handleEditUserName = (data: EditData) => {
    dispatch(userNameEdit(data));
  };

  return (
    <>
      <StyledTextBox>
        <Typography variant="h6" color="primary">
          Редактирование
        </Typography>
      </StyledTextBox>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          const data: EditData = {
            userName: values.userName,
            token: tokens,
          };
          setSubmitting(true);
          handleEditUserName(data);
          setSubmitting(false);
        }}
      >
        <StyledForm>
          <Field
            name="userName"
            placeholder="user name"
            type="input"
            size="small"
            as={StyledTextField}
          />
          <StyledButton type="submit" disabled={loading} variant="contained">
            Изменить
          </StyledButton>
        </StyledForm>
      </Formik>
    </>
  );
};

export default EditPage;
