import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Nevbar from "./components/Nevbar";

function LayOut() {
  return (
    <Box>
      <Nevbar />
      <Box width="auto" mx="auto" p={8} mt={12}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default LayOut;
