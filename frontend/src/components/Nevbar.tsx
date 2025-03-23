import { Box, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Nevbar() {
  return (
    <Box
      bg="white"
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex="sticky"
      px={8}
      py={4}
    >
      <HStack justify="space-between" maxW="container.xl" mx="auto">
        <Image src={logo} boxSize="60px" />

        <HStack gap={8}>
          <Link to="/team/all_teams">
            <Box
              as="span"
              fontSize="lg"
              fontWeight="500"
              _hover={{ color: "#C9A834" }}
            >
              Teams
            </Box>
          </Link>
          <Link to="/match/all_matches">
            <Box
              as="span"
              fontSize="lg"
              fontWeight="500"
              _hover={{ color: "#C9A834" }}
            >
              Matches
            </Box>
          </Link>
          <Link to="/question/all_questions">
            <Box
              as="span"
              fontSize="lg"
              fontWeight="500"
              _hover={{ color: "#C9A834" }}
            >
              Questions
            </Box>
          </Link>
          <Link to="/teams">
            <Box
              as="span"
              fontSize="lg"
              fontWeight="500"
              _hover={{ color: "#C9A834" }}
            >
              Logout
            </Box>
          </Link>
        </HStack>
      </HStack>
    </Box>
  );
}

export default Nevbar;
