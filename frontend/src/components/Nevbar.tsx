import { Box, Heading, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Nevbar() {
  return (
    <Box>
      <HStack
        align={"center"}
        display={"flex"}
        justify={"space-between"}
        margin="20px"
      >
        <Box>
          <Heading>Admin Panel</Heading>
        </Box>
        <Box width={"350px"} display={"flex"} justifyContent={"space-between"}>
          <Link to="/team/all_teams">Teams</Link>
          <Link to="/match/all_matches">Matchs</Link>
          <Link to="/question/all_questions">Questions</Link>
          <Link to="/teams">Logout</Link>
        </Box>
        <Box>
          <Image src={logo} boxSize={"80px"} objectFit="cover" />
        </Box>
      </HStack>
      <Box
        background={"blackAlpha.500"}
        width={"85%"}
        height={"1px"}
        marginX="80px"
        marginY="30px"
      ></Box>
    </Box>
  );
}

export default Nevbar;
