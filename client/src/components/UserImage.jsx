import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    // Default w / h if nothing is specified 
    <Box width={size} height={size}>
      <img
        /*
          ObjectFit : cover = 
          - takes up the entire space as necessary / crop it as necessary / centers image mainly
          BorderRadius: "50%" =
          - makes it a circle
        */
         style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        // grab the profile image of user in storage
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;