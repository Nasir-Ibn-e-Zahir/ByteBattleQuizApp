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

const formShadow = "md"; // Define the formShadow variable
const bgColor = "white"; // Define the bgColor variable

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
        console.log(error);
      },
    });
  };

  return (
    <Box maxW="2xl" mx="auto" bg="white" p={8} borderRadius="xl" boxShadow="lg">
      <Heading size="xl" mb={6} textAlign="center" color="brand.secondary">
        Add New Team Here
      </Heading>
      <Text textAlign="center" color="gray.600" mb={6}>
        Please fill in the details below to add a new team.
      </Text>
      <Box bg="gray.50" p={6} borderRadius="md">
        <form onSubmit={handleSubmit(submit)}>
          <Stack>
            <FormControl mb={6} isInvalid={!!errors.team_name}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.600">
                Team Name
              </FormLabel>
              <Input
                size="lg"
                type="text"
                placeholder="Enter the team name"
                {...register("team_name", {
                  required: "Team name is required",
                })}
                _focus={{ borderColor: "skyblue" }} // Sky-blue border on focus
              />
              <FormErrorMessage>{errors.team_name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={!!errors.description}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.600">
                Description
              </FormLabel>
              <Textarea
                size="lg"
                placeholder="Enter a brief description of the team"
                {...register("description", {
                  required: "Description is required",
                })}
                _focus={{ borderColor: "skyblue" }} // Sky-blue border on focus
                resize="vertical"
              />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="blue"
              size="lg"
              type="submit"
              _hover={{
                bg: "teal.600",
              }}
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
