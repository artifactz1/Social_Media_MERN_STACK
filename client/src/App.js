import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

// this is the whole purpose of the config file json
// this allows us to reference scences instead of doing relative imports like ./../
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

import { useMemo } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";

function App() {
  // state.mode is the value that we made in our initial state in client/src/state/index.js
  const mode = useSelector((state) => state.mode);
  // this will setup our theme / need to put it into material UI
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // checking if the user are logged in or not
  // will see if they are authorized
  // so we can add this to our routes
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <BrowserRouter>
        {/** pass a property into theme / we should have our theme configured for material UI **/}
        <ThemeProvider theme={theme}>
          {/* Reset our css to basic css / css reset - doing it for material UI */}
          <CssBaseline />
          <Routes>
            {/* This is how we will access our pages  */}
            <Route path="/" element={<LoginPage />} />

            {/* If token exist we are authorized and then you stay in homepage else go to login page */}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            {/* if you go to profile/useId then you can use this route */}
            {/* this is a param we can set */}
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
