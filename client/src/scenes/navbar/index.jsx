
import { useState } from "react";
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery} from "@mui/material";
import {Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close} from "@mui/icons-material";
import { useDispatch, useSelector} from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const NavBar =() => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    // allow you to dispatch actions from the reducers
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    
    // hook built in to material UI that allows us to determine if the current screen size
    // of the user is below this min width or higher than min width
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    // will allow us to use theme.js
    const theme = useTheme();

    // these are the colors that we'll be using 
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.neutral.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    // convenience variable
    const fullName = '${user.firstName} ${user.lastName}';

    // the padding = syntax is only for the box component in material UI
    // he'll show us later how to do it not only for box
    return <FlexBetween padding="1rem 6%" backgroundColor={alt}>

    </FlexBetween>
};

export default NavBar;