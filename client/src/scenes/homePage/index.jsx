import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
// import PostsWidget from "scenes/widgets/PostsWidget";
// import AdvertWidget from "scenes/widgets/AdvertWidget";
// import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // Grabing user information with user selector grabbing it from the reducer
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      {/* // Setting up some layout stuff */}
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {/* This is where we add user widget */}
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          {/* <PostsWidget userId={_id} /> */}
        </Box>

        {/* Friends List / Advertisment will only show for desktop */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* <AdvertWidget />
              <Box m="2rem 0" />
              <FriendListWidget userId={_id} /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
