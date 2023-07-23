import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import UserImage from "components/UserImage";
  import FlexBetween from "components/FlexBetween";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const UserWidget = ({ userId, picturePath }) => {
    // This is how we are goibng to grab the user from the backend
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    // Going to grab token from storage
    const token = useSelector((state) => state.token);
    // Grab Colors from theme or palette variable
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
 
    // When we enter the home page - for the User widget we want to grab the user information
    // We are going to do this by calling an API to grab the information
    const getUser = async () => {
    
      // API CALL
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        // Look the server/middleware/auth.js
        // In our authorization we are writing bearer in Authorization header
        // we are taking everything taking everything behind it which is the token
        // that is is how we grab the token and verify it 
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    };
 
    // Grabbing get user and invoke it 
    // When you enter this page and this is an empty array 
    // getUser will be called when you enter / render this component for the first time
    // this is how you make the API call
    useEffect(() => {
      getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // If we don't have a user - we don't return anything for the user widget yet because it will error out
    if (!user) {
      return null;
    }
  
    // We are going to destructure items from the user
    // going to grab properties shown below
    // If we didn't have the if statement above this - there was going to be errors because its waiting for
    // information to get back, but with the if statement we should be fine

    const {
      firstName,
      lastName,
      location,
      occupation,
      viewedProfile,
      impressions,
      friends,
    } = user;
  
    return (
      // This is the purpose of widgetwrapper we made in components to make it more convenient
      <WidgetWrapper>


        {/* All of this is just design / css 
            Pretty Self explantory - just need to get the hang of if
            It is split up into for sections similar to tailwind css
        */}

        {/* FIRST ROW */}

        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          // Want User to Navigate to Profile Page if they click on this
          onClick={() => navigate(`/profile/${userId}`)}
        >
        
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={medium}>{friends.length} friends</Typography>
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined />
        </FlexBetween>
  
        <Divider />
  
        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box>
  
        <Divider />
  
        {/* THIRD ROW */}
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Who's viewed your profile</Typography>
            <Typography color={main} fontWeight="500">
              {viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Impressions of your post</Typography>
            <Typography color={main} fontWeight="500">
              {impressions}
            </Typography>
          </FlexBetween>
        </Box>
  
        <Divider />
  
        {/* FOURTH ROW */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>
  
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img src="../assets/twitter.png" alt="twitter" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Twitter
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
  
          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <img src="../assets/linkedin.png" alt="linkedin" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Linkedin
                </Typography>
                <Typography color={medium}>Network Platform</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        </Box>
      </WidgetWrapper>
    );
  };
  
  export default UserWidget;