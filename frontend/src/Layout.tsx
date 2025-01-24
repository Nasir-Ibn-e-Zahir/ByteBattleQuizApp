import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Nevbar from "./components/Nevbar";

function LayOut() {
  return (
    <Box>
      <Nevbar />
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
