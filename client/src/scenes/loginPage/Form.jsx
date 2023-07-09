// This is where we are going to do all of the register functionaliy

import { useTheme } from "@emotion/react";
import { Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// Form Library
import { Formik } from "formik";

// Validation Library
import * as yup from "yup";

// Need to navigate when users register / login
import { useNavigate } from "react-router-dom";

// Using react redux to store our use information
import { useDispatch } from "react-redux";

// Once the user sets there login page
import { setLogin } from "state";

// Allows user to import a picture/file
import Dropzone from "react-dropzone";

import FlexBetween from "components/FlexBetween";
import { PaletteRounded } from "@mui/icons-material";

// We are passing all our values for our schema
// We can make each value validated in more detail but for this example we are just going to make it simple
// But we are validating  each value as a string and if the input is empty and has a required feild it needs to be filled

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

// Login is going to be a stripped down version of the regular schema
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  // Creating different types of states

  // have a situation where we will the page to either login or register
  const [pageType, setPageType] = useState("login");

  const { palette } = useTheme();
  const dispatch = useDispatch();

  // allow us to navigate to different pages
  const navigate = useNavigate();

  // check between mobile / desktop
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // just to check which page we are in
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // ================================================================
  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    // last to append is the picture path
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        // this can be seen in  state/index.js
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    // if we are on the isLogin Page
    // - we want some functionality to call the back end
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  // ================================================================

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {/* These values will be allowed to be used in your components / form  */}
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        //  Formik is grabbing the handleform submit above, then passing it into our formik
        //  and then pass it into our on submit function
        //  once we have that we can now do all the form  stuff now inside
        <form onSubmit={handleSubmit}>
          {/* splitting grid into 4 sections
                min of 0 if it gets too small it shrinks to 0
                else we are splitting into equal fractions of 4  */}

          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {/* Register Section */}
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  // in largers screen its going to have a span of 2
                  // but looking at the above it is mobile it'll be a span of 4
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  // in largers screen its going to have a span of 2
                  // but looking at the above it is mobile it'll be a span of 4
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  // in largers screen its going to have a span of 2
                  // but looking at the above it is mobile it'll be a span of 4
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  // in largers screen its going to have a span of 2
                  // but looking at the above it is mobile it'll be a span of 4
                  sx={{ gridColumn: "span 4" }}
                />

                {/* Inputting of Profile Image */}
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      // For formik we set feildvalue here because formik doesn't have a field value for picture
                      // the setFieldValue allows us to create our own value and in this case since we are using DropZone
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        {/* Display this if there is not picture */}
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          // Else show the name of the image that has been added
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            {/* Login  */}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              label="Password"
              //  this will hide the password
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* Buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
