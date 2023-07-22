import { Box } from "@mui/material";
import { styled } from "@mui/system";

// This will give us a base styling / coloring for each widget
const WidgetWrapper = styled(Box)(({ theme }) => ({
          //Top    Right Bottom   Left   : Clockwise for padding     
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));

export default WidgetWrapper;