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

  const OnSubmit = (data: any) => {
    mutation.mutate(data);
    console.log(data.password);
  };

  return (
    <Box>
      <Heading fontSize="28px" paddingY="30px" textAlign="center">
        Log In
      </Heading>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <FormControl isInvalid={!!errors.email} paddingY="20px">
          <FormLabel>Email</FormLabel>
          <Input
            {...register("email")}
            type="email"
            placeholder="Johndoe@gmail.com"
          />
          <FormErrorMessage>{errors.email?.message as String}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} paddingY="20px">
          <FormLabel>Password</FormLabel>
          <Input
            {...register("password")}
            type="password"
            placeholder="********"
          />
          <FormErrorMessage>
            {errors.password?.message as String}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" paddingY="20px">
          Login
        </Button>
      </form>
    </Box>
  );
}

export default Login;
