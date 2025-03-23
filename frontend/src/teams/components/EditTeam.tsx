import {
  Box,
  Button,
  Heading,
  Input,
  Textarea,
  Stack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import { TeamAdditionData } from "../hooks/useAddTeam";
import { useNavigate, useParams } from "react-router-dom";
// import { zodResolver } from "@hookform/resolvers/zod";
import useEditTeam from "../hooks/useEditTeam";
import { useEffect } from "react";

const EditTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamAdditionData>();

  const { mutation, team, isError, isLoading } = useEditTeam(id, reset);

  useEffect(() => {
    if (team) {
      reset({
        ...team,
      });
    }
  }, [team, reset]);

  const submit = (data: TeamAdditionData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        reset();
        navigate("/team/all_teams");
      },
    });
  };

  if (isLoading) {
    return (
      <Box textAlign="center" mt={5}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" mt={5}>
        <Text color="red.500">Failed to load team data. Please try again.</Text>
      </Box>
    );
  }

  return (
    <Box maxW="2xl" mx="auto" bg="white" p={8} borderRadius="xl" boxShadow="lg">
      <Heading as="h2" size="xl" textAlign="center" mb={6} color="gray.800">
        Edit Team
      </Heading>
      <Text textAlign="center" color="gray.600" mb={6}>
        Please update the details below to modify the team.
      </Text>
      <Box p={6} borderRadius="md">
        <form onSubmit={handleSubmit(submit)}>
          <Stack gap={4}>
            <FormControl isInvalid={!!errors.team_name}>
              <FormLabel fontWeight="bold" color="gray.700">
                Team Name
              </FormLabel>
              <Input
                defaultValue={team?.team_name}
                type="text"
                placeholder="Enter the team name"
                {...register("team_name", {
                  required: "Team name is required",
                })}
                _focus={{ borderColor: "#C9A834" }}
              />
              <FormErrorMessage>{errors.team_name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.description}>
              <FormLabel fontWeight="bold" color="gray.700">
                Description
              </FormLabel>
              <Textarea
                defaultValue={team?.description}
                placeholder="Enter a brief description of the team"
                {...register("description", {
                  required: "Description is required",
                })}
                _focus={{ borderColor: "#C9A834" }}
                resize="vertical"
              />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>

            <Button
              bg="#C9A834"
              color="black"
              size="lg"
              type="submit"
              _hover={{ bg: "#dcbf3e" }}
              width="full"
            >
              Save Changes
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default EditTeam;
