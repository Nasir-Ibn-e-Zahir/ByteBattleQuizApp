import { Box, Button, Heading } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      textAlign="center"
    >
      <Heading fontSize="36px" lineHeight="50px" marginY="20px">
        Welcome to the
        <br />
        Quiz App
      </Heading>
      <Box>
        <Button marginLeft={3}>
          <RouterLink to="/register">Register</RouterLink>
        </Button>
        <Button marginLeft={3}>
          <RouterLink to="/login">Login</RouterLink>
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
