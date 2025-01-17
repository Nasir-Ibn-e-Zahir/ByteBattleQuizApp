import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function LayOut() {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default LayOut;
