import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useRegisterUser, {
  UserData,
  UserRegistrationData,
} from "./useRegisterUser";
import { Link } from "react-router-dom";

function RegisterUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistrationData>({ resolver: zodResolver(UserData) });

  const mutation = useRegisterUser();

  const submit = (data: UserRegistrationData) => {
    mutation.mutate(data);
    console.log("Data is sent to the backend.");
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      bg="white"
      p={8}
      mt={8}
      borderRadius="xl"
      boxShadow="lg"
    >
      <Heading py="30px" textAlign="center" color="gray.800">
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit(submit)}>
        <FormControl isInvalid={!!errors.username} py="15px">
          <FormLabel>Username</FormLabel>
          <Input
            {...register("username")}
            type="text"
            required
            bg="gray.50"
            borderColor="#C9A834"
            _hover={{ borderColor: "#dcbf3e" }}
            _focus={{
              outline: "none",
              borderColor: "#C9A834",
              boxShadow: "0 0 0 3px rgba(201,168,52,0.5)",
            }}
          />
          <FormErrorMessage>
            {errors.username?.message as string}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email} py="15px">
          <FormLabel>Email</FormLabel>
          <Input
            {...register("email")}
            type="email"
            required
            bg="gray.50"
            borderColor="#C9A834"
            _hover={{ borderColor: "#dcbf3e" }}
            _focus={{
              outline: "none",
              borderColor: "#C9A834",
              boxShadow: "0 0 0 3px rgba(201,168,52,0.5)",
            }}
          />
          <FormErrorMessage>{errors.email?.message as string}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} py="15px">
          <FormLabel>Password</FormLabel>
          <Input
            {...register("password")}
            type="password"
            required
            bg="gray.50"
            borderColor="#C9A834"
            _hover={{ borderColor: "#dcbf3e" }}
            _focus={{
              outline: "none",
              borderColor: "#C9A834",
              boxShadow: "0 0 0 3px rgba(201,168,52,0.5)",
            }}
          />
          <FormErrorMessage>
            {errors.password?.message as string}
          </FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          py="15px"
          bg="#C9A834"
          color="black"
          _hover={{ bg: "#dcbf3e" }}
          width="full"
        >
          Signup
        </Button>
      </form>
      <Text py="15px" textAlign="center">
        Already have an account?{" "}
        <Link to="/login" style={{ fontWeight: "bold" }}>
          login here
        </Link>
      </Text>
    </Box>
  );
}

export default RegisterUser;
