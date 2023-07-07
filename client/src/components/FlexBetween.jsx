import { Box } from "@mui/material";
import { styled } from "@mui/system";

// if you haven't seen this syntax don't worry
// Good if your reusing css as a component 

// This is a style components 
// name this component whatever and pass the properties in there 
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
})

export default FlexBetween;