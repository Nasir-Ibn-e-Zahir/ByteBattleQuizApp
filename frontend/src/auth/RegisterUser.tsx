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
    console.log("Data is send to the backend.");
  };

  return (
    <Box>
      <Heading paddingY="30px" textAlign="center">
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit(submit)}>
        <FormControl isInvalid={!!errors.username} paddingY="15px">
          <FormLabel>Username</FormLabel>
          <Input {...register("username")} type="text" required />
          <FormErrorMessage>
            {errors.username?.message as string}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email} paddingY="15px">
          <FormLabel>Email</FormLabel>
          <Input {...register("email")} type="email" required />
          <FormErrorMessage>{errors.email?.message as string}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} paddingY="15px">
          <FormLabel>Password</FormLabel>
          <Input {...register("password")} type="password" required />
          <FormErrorMessage>
            {errors.password?.message as string}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" paddingY="15px">
          Signup
        </Button>
      </form>
      <Text paddingY="15px">
        Already have an account?{" "}
        <Link to={"/login"} style={{ fontWeight: "bold" }}>
          login here
        </Link>
      </Text>
    </Box>
  );
}

export default RegisterUser;
