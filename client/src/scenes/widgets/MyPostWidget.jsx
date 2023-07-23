
import{
EditOutlined,
DeleteOutlined,
AttachFileOutlined,
GifBoxOutlined,
ImageOutlined,
MicOutlined,
MoreHorizOutlined,
} from "@mui/icons-material";
import {
Box,
Divider,
Typography,
InputBase,
useTheme,
Button,
IconButton,
useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
const dispatch = useDispatch();
const [isImage, setIsImage] = useState(false);
const [image, setImage] = useState(null);
// Actual post content description
const [post, setPost] = useState("");
// States
const { _id } = useSelector((state) => state.user);
const token = useSelector((state) => state.token);
const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
// Colors
const { palette } = useTheme();
const mediumMain = palette.neutral.mediumMain;
const medium = palette.neutral.medium;


// Funciton that handles our post and makes our API call 
const handlePost = async () => {

  // Using this because we are passing an image 
  const formData = new FormData();
  // Appending manually some properties and values 
  formData.append("userId", _id);
  formData.append("description", post);
  // If there is an image
  if (image) {
    // append to the picture key - passing the image
    formData.append("picture", image);
    formData.append("picturePath", image.name);
  }
  // Send the post information to the backend
  const response = await fetch(`http://localhost:3001/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  // The backend will return our list of updated post
  const posts = await response.json();
  // this will keep our list of post
  dispatch(setPosts({ posts }));
  // Reset all the state we have once we make an api call
  setImage(null);
  setPost("");
};

return (
  <WidgetWrapper>
    <FlexBetween gap="1.5rem">
      <UserImage image={picturePath} />
      <InputBase
        placeholder="What's on your mind..."
        // e = event = this input should be updating the setPost state that we created
        onChange={(e) => setPost(e.target.value)}
        value={post}
        // Styling
        sx={{
          width: "100%",
          backgroundColor: palette.neutral.light,
          borderRadius: "2rem",
          padding: "1rem 2rem",
        }}
      />
    </FlexBetween>
    {/* if they click an image or add image to a post, it will open up this div*/}
    {isImage && (
      <Box
        border={`1px solid ${medium}`}
        borderRadius="5px"
        mt="1rem"
        p="1rem"
      >
        {/* Copied from Login Form - almost the same */}
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <FlexBetween>
              <Box
                {...getRootProps()}
                border={`2px dashed ${palette.primary.main}`}
                p="1rem"
                width="100%"
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <input {...getInputProps()} />
                {!image ? (
                  <p>Add Image Here</p>
                ) : (
                  <FlexBetween>
                    <Typography>{image.name}</Typography>
                    <EditOutlined />
                  </FlexBetween>
                )}
              </Box>
              {image && (
                // TrashIcon if they want to remove the image 
                <IconButton
                  onClick={() => setImage(null)}
                  sx={{ width: "15%" }}
                >
                  <DeleteOutlined />
                </IconButton>
              )}
            </FlexBetween>
          )}
        </Dropzone>
      </Box>
    )}

    <Divider sx={{ margin: "1.25rem 0" }} />

    {/* All the Icons below */}
    <FlexBetween>
    
      {/* Turn off and open the image dropzone */}
      <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
        <ImageOutlined sx={{ color: mediumMain }} />
        <Typography
          color={mediumMain}
          sx={{ "&:hover": { cursor: "pointer", color: medium } }}
        >
          Image
        </Typography>
      </FlexBetween>

      {/* For non mobile screens because icons get squished */}
      {isNonMobileScreens ? (
        <>
          {/* These icons wont have any functionality but we could if we wanted to  */}
          <FlexBetween gap="0.25rem">
            <GifBoxOutlined sx={{ color: mediumMain }} />
            <Typography color={mediumMain}>Clip</Typography>
          </FlexBetween>

          <FlexBetween gap="0.25rem">
            <AttachFileOutlined sx={{ color: mediumMain }} />
            <Typography color={mediumMain}>Attachment</Typography>
          </FlexBetween>

          <FlexBetween gap="0.25rem">
            <MicOutlined sx={{ color: mediumMain }} />
            <Typography color={mediumMain}>Audio</Typography>
          </FlexBetween>
        </>
      ) : (
        // This will be 3 dots
        <FlexBetween gap="0.25rem">
          <MoreHorizOutlined sx={{ color: mediumMain }} />
        </FlexBetween>
      )}
      {/* The button for Posting */}
      <Button
        // Start with disabled
        disabled={!post}
        onClick={handlePost}
        sx={{
          color: palette.background.alt,
          backgroundColor: palette.primary.main,
          borderRadius: "3rem",
        }}
      >
        POST
      </Button>
    </FlexBetween>
  </WidgetWrapper>
);
};

export default MyPostWidget;