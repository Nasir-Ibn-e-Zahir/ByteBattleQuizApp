import {
  Box,
  Button,
  Heading,
  Input,
  Textarea,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import useAddTeam, { TeamAdditionData } from "../hooks/useAddTeam";
import { useNavigate } from "react-router-dom";

const AddTeam = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamAdditionData>();

  const navigate = useNavigate();
  const { mutate } = useAddTeam();

  const submit = (data: TeamAdditionData) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/team/all_teams");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <Box maxW="2xl" mx="auto" bg="white" p={8} borderRadius="xl" boxShadow="lg">
      <Heading size="xl" mb={6} textAlign="center" color="gray.800">
        Add New Team
      </Heading>
      <Text textAlign="center" color="gray.600" mb={6}>
        Please fill in the details below to add a new team.
      </Text>
      <Box p={6} borderRadius="md">
        <form onSubmit={handleSubmit(submit)}>
          <Stack gap={4}>
            <FormControl isInvalid={!!errors.team_name}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                Team Name
              </FormLabel>
              <Input
                size="lg"
                placeholder="Enter the team name"
                {...register("team_name", {
                  required: "Team name is required",
                })}
                borderColor="#C9A834"
                _hover={{ borderColor: "#dcbf3e" }}
                _focus={{
                  outline: "none",
                  borderColor: "#C9A834",
                  boxShadow: "0 0 0 3px rgba(201,168,52,0.5)",
                }}
              />
              <FormErrorMessage>{errors.team_name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.description}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                Description
              </FormLabel>
              <Textarea
                size="lg"
                placeholder="Enter a brief description of the team"
                {...register("description", {
                  required: "Description is required",
                })}
                borderColor="#C9A834"
                _hover={{ borderColor: "#dcbf3e" }}
                _focus={{
                  outline: "none",
                  borderColor: "#C9A834",
                  boxShadow: "0 0 0 3px rgba(201,168,52,0.5)",
                }}
              />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>

            <Button
              bg="#C9A834"
              color="white"
              size="lg"
              type="submit"
              _hover={{ bg: "#dcbf3e" }}
              width="full"
            >
              Add Team
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default AddTeam;
