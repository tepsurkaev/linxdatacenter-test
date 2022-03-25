import React from "react";
import { Formik, Form, Field, useField, FieldAttributes } from "formik";
import {
  Button,
  TextField,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material";

interface FormValues {
  email: string;
  password: string;
  saveDataToLS: boolean;
}

interface Errors {
  email: string;
  password: string;
}

interface FormProps {
  isSubmitting: boolean;
  errors: Errors;
}

const initialValues: FormValues = {
  email: "",
  password: "",
  saveDataToLS: false,
};

const StyledForm = styled(Form)`
  width: 500px;
  margin: 0 auto;

  @media (max-width: 510px) {
    width: 350px;
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const StyledTextBox = styled(Box)`
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px auto 0 auto;

  @media (max-width: 510px) {
    width: 350px;
  }
`;

const CustomTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);

  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <StyledTextField
      {...field}
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const LoginPage = () => {
  return (
    <>
      <StyledTextBox>
        <Typography variant="h6" color="primary">
          Авторизация
        </Typography>
      </StyledTextBox>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: Record<string, string> = {};

          const validateEmail = (email: string) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
          };

          const validatePass = (password: string) => {
            return String(password)
              .toLowerCase()
              .match(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{3,}$/);
          };

          if (!validateEmail(values.email)) {
            errors.email = "Не валидный email";
          }

          if (!validatePass(values.password)) {
            errors.password =
              "Длина пароля должна быть минимум 3 символа, одна загланая буква и латиница";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors }: FormProps) => (
          <StyledForm>
            <CustomTextField
              name="email"
              type="input"
              as={StyledTextField}
              placeholder="Email"
            />
            <CustomTextField
              name="password"
              type="input"
              as={StyledTextField}
              placeholder="Password"
            />
            <Field
              name="saveDataToLS"
              type="checkbox"
              as={FormControlLabel}
              control={<Checkbox />}
              label="Запомнить"
              sx={{ marginBottom: 2 }}
            />
            <StyledButton
              disabled={isSubmitting}
              variant="contained"
              type="submit"
            >
              Войти
            </StyledButton>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default LoginPage;
