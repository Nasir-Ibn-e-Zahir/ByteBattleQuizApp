import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Nevbar from "./components/Nevbar";

function LayOut() {
  return (
    <Box>
      <Nevbar />
      <Box
        width="1200px"
        mx="auto"
        p={8}
        borderRadius="lg"
        boxShadow={"md"}
        bg={"white"}
        mt={12}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default LayOut;
