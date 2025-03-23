import { Box, Button, Heading, Input } from "@chakra-ui/react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin, { Schema, UserLoginData } from "./useLogin";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginData>({ resolver: zodResolver(Schema) });

  const mutation = useLogin();

  const onSubmit = (data: UserLoginData) => {
    mutation.mutate(data);
    console.log(data.password);
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
      <Heading fontSize="28px" py="30px" textAlign="center" color="gray.800">
        Log In
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email} py="20px">
          <FormLabel>Email</FormLabel>
          <Input
            {...register("email")}
            type="email"
            placeholder="Johndoe@gmail.com"
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
        <FormControl isInvalid={!!errors.password} py="20px">
          <FormLabel>Password</FormLabel>
          <Input
            {...register("password")}
            type="password"
            placeholder="********"
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
          py="20px"
          bg="#C9A834"
          color="black"
          _hover={{ bg: "#dcbf3e" }}
          width="full"
        >
          Login
        </Button>
      </form>
    </Box>
  );
}

export default Login;
