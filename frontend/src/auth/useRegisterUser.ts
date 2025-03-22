import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import axios from "../services/axios";

export const UserData = z.object({
  username: z.string(),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type UserRegistrationData = z.infer<typeof UserData>;

const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (data: UserRegistrationData) => {
      await axios.post("/register", data);
    },
    onSuccess: () => {
      console.log("User added successfuly.");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export default useRegisterUser;
