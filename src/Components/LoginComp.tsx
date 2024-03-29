import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
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
import { InputAdornment } from "@mui/material";
//Formik & Yup imports
import { useFormik } from "formik";
import * as yup from "yup";
import TextFieldCustom from "../common/TextFieldCustom";
import { useState } from "react";

function Copyright(props : any) {
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
    email: "",
    password: "",
  };
  // set validate
  const validationSchema = yup.object({
    email: yup.string().email("email is invalid").required("enter your email"),
    password: yup
      .string()
      .required("enter your password")
      .min(8, "password must be 8 charackter at least"),
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
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{ mt: 1, width: 600 }}
            >
              <TextFieldCustom formik={formik} name="email" label="email" type={""} focus={false} iconStart={undefined} iconEnd={undefined} InputProps={undefined} />

              <TextFieldCustom
                formik={formik}
                name="password"
                label="password"
                iconEnd={visible ? (
                  <Visibility
                    onClick={visibilityHandler}
                    sx={{ cursor: "pointer" }} />
                ) : (
                  <VisibilityOff
                    onClick={visibilityHandler}
                    sx={{ cursor: "pointer" }} />
                )}
                type={visible ? "password" : "text"} focus={false} iconStart={undefined} InputProps={undefined}              />
              <FormControlLabel
                control={<Checkbox value="remember" color="success" />}
                label="Remember me"
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
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
