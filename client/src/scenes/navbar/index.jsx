
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
        <FlexBetween gap="1.75rem">
            <Typography 
                fontWeight="bold" 
                fontSize="clamp(1rem, 2rem, 2.25rem)" 
                color="primary" 
                onClick={() => navigate("/home")}
                sx={{
                    "&:hover": {
                        color: primaryLight,
                        cursor: "pointer",
                    },
                }} 
                >
                Sociopedia
            </Typography>
            {isNonMobileScreens && (
                <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                    <InputBase placeholder="Search..." />
                    <IconButton>
                        <Search/>
                    </IconButton>
                </FlexBetween>
            )}
        </FlexBetween> 
        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
            <FlexBetween gap="2rem">
                {/* this is the dispatch or action that the use will do to change the theme to dark or light mode */}
                {/* we are using redux to flip the switch for the dark and light mode  */}
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? 
                        (
                            <DarkMode sx={{ fontSize: "25px"}}/>
                        ) 
                        : 
                        (
                            <LightMode sx = {{color: dark, fontSize: "25px" }} />
                        )
                    }
                </IconButton>
                <Message sx={{ fontSize: "25px"}}/>
                <Notifications sx={{ fontSize: "25px"}}/>
                <Help sx={{ fontSize: "25px"}}/>
                <FormControl variant="standard" value={fullName}>
                    <Select 
                        value={fullName}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem",
                            },
                            "& .MuiSelect-:focus": {
                                backgroundColor: neutralLight
                            }
                        }}
                        input={<InputBase/>}
                    >
                        <MenuItem value={fullName}>
                            <Typography>
                                {fullName}
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}> logout</MenuItem>
                    </Select>
                </FormControl>
                

            </FlexBetween>) : (
            <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
                <Menu/>
            </IconButton>
            )}

            {/* MOBILE NAV */}
            {/* When you click the menu item it should open a box with icon in there */}
            {
                !isNonMobileScreens && isMobileMenuToggled && (
                    <Box 
                        position="fixed"
                        right="0" 
                        bottom="0"
                        height="100%"
                        zIndex="10"
                        maxWidth="500px"
                        minWidth="300px"
                        backgroundColor={background}
                    >
                        {/* CLOSE ICON */}
                        <Box display="flex" justifyContent="flex-end">
                            <IconButton>
                                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                                <Close/>
                            </IconButton>
                        </Box>
                        {/* MENU ITEMS */}
                        
                    </Box>
            )}
    </FlexBetween>
};

export default NavBar;