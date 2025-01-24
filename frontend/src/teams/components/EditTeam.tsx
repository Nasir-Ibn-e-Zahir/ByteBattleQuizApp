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
import { TeamAdditionData, teamdata } from "../hooks/useAddTeam";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import useEditTeam from "../hooks/useEditTeam";
import { useEffect } from "react";

const formShadow = "md";
const bgColor = "white";

const EditTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamAdditionData>({ resolver: zodResolver(teamdata) });

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
    <Box>
      <Heading as="h2" size="lg" textAlign="center" mb={4}>
        Edit Team Here
      </Heading>
      <Text textAlign="center" color="gray.600" mb={6}>
        Please edit the details below to update the team.
      </Text>
      <Box bg="gray.50" p={6} borderRadius="md">
        <form onSubmit={handleSubmit(submit)}>
          <Stack>
            <FormControl isInvalid={!!errors.team_name}>
              <FormLabel fontWeight="bold">Team Name</FormLabel>
              <Input
                defaultValue={team?.team_name}
                type="text"
                placeholder="Enter the team name"
                {...register("team_name", {
                  required: "Team name is required",
                })}
                _focus={{ borderColor: "skyblue" }}
              />
              <FormErrorMessage>{errors.team_name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.description}>
              <FormLabel fontWeight="bold">Description</FormLabel>
              <Textarea
                defaultValue={team?.description}
                placeholder="Enter a brief description of the team"
                {...register("description", {
                  required: "Description is required",
                })}
                _focus={{ borderColor: "skyblue" }}
                size="md"
                resize="vertical"
              />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="blue"
              size="lg"
              type="submit"
              // isLoading={mutation.isLoading}
              _hover={{
                bg: "teal.600",
              }}
              width="full"
            >
              Edit
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default EditTeam;
