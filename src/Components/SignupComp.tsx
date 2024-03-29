import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//Formik & Yup imports
import { useFormik } from "formik";
import * as yup from "yup";
import TextFieldCustom from "../common/TextFieldCustom";
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const [hover, setHover] = useState(false);
  const variantChangeHandle = () => {
    setHover(!hover);
  };
  const [visible, setVisible] = useState(true);
  // set initail
  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
  };
  // set validate
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("enter your name")
      .min(6, "name must be 6 charackter at least"),
    email: yup.string().email("email is invalid").required("enter your email"),
    password: yup
      .string()
      .required("enter your password")
      .min(8, "password must be 8 charackter at least"),
    phone: yup
      .string()
      .required("enter your phone")
      .matches(/^[0-9]{11}$/, "phone number is invalid"),
    passwordConfirm: yup
      .string()
      .required("confrim your password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  // formik
  const formik = useFormik({
    validateOnMount: true,
    initialValues,
    validationSchema,
    enableReinitialize: true,
  } as any);
  // visibility
  const visibilityHandler = () => {
    setVisible(!visible);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1, width: 600 }}>
              <TextFieldCustom formik={formik} name="name" label="User Name" type={""} focus={false} iconStart={undefined} iconEnd={undefined} InputProps={undefined} />
              <TextFieldCustom formik={formik} name="email" label="Email" type={""} focus={false} iconStart={undefined} iconEnd={undefined} InputProps={undefined} />
              <TextFieldCustom
                formik={formik}
                name="phone"
                label="Phone Number" type={""} focus={false} iconStart={undefined} iconEnd={undefined} InputProps={undefined}              />
              <TextFieldCustom
                formik={formik}
                name="password"
                label="Password"
                type={visible ? "password" : "text"}
                iconEnd={visible ? (
                  <Visibility
                    onClick={visibilityHandler}
                    sx={{ cursor: "pointer" }} />
                ) : (
                  <VisibilityOff
                    onClick={visibilityHandler}
                    sx={{ cursor: "pointer" }} />
                )} focus={false} iconStart={undefined} InputProps={undefined}              />

              <TextFieldCustom
                formik={formik}
                name="passwordConfirm"
                label="Confirm Password"
                type={visible ? "password" : "text"} focus={false} iconStart={undefined} iconEnd={undefined} InputProps={undefined}              />
              <FormControlLabel
                control={<Checkbox value="agree" color="success" />}
                label="agree with privacy policy"
              />
              <Button
                type="submit"
                fullWidth
                variant={hover ? "outlined" : "contained"}
                sx={{ mt: 3, mb: 2 }}
                href="/home"
                disabled={!formik.isValid}
                onMouseEnter={variantChangeHandle}
                onMouseLeave={variantChangeHandle}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
