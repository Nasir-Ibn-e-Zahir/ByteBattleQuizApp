import {
  Box,
  Button,
  Heading,
  VStack,
  HStack,
  Text,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAddMatch, { matchDataFormat } from "../hooks/useAddMatch";
import useAllTeams from "../teams/useAllTeams";
import { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

export const AddMatch = () => {
  const { handleSubmit, register } = useForm<matchDataFormat>();
  const { mutate } = useAddMatch();
  const { data, isLoading, isError } = useAllTeams();

  const submit = (data: matchDataFormat) => {
    console.log(data);
    mutate(data);
  };

  const [teamSections, setTeamSections] = useState<JSX.Element[]>([]);

  // Function to add a new team section
  const handleAddTeam = () => {
    const newTeamDiv = (
      <HStack key={Date.now()} spacing={4} align="center">
        <select id="team">
          {data?.map((team) => (
            <option key={team.description} value={team.team_name}>
              {team.team_name}
            </option>
          ))}
        </select>
        <Button
          size="sm"
          colorScheme="red"
          onClick={() => handleRemoveTeam(teamSections.length)}
        >
          Remove
        </Button>
      </HStack>
    );

    setTeamSections((prevSections) => [...prevSections, newTeamDiv]);
  };

  // Function to remove a team section
  const handleRemoveTeam = (index: number) => {
    setTeamSections((prevSections) =>
      prevSections.filter((_, idx) => idx !== index)
    );
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <Box textAlign="center" mt={6}>
        <Text>Loading teams...</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" mt={6}>
        <Text color="red.500">Error fetching teams.</Text>
      </Box>
    );
  }

  return (
    <Box
      maxW="600px"
      mx="auto"
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Add New Match
      </Heading>
      <form onSubmit={handleSubmit(submit)}>
        <VStack spacing={6} align="stretch">
          <FormControl>
            <FormLabel>Enter Match Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter match name"
              {...register("match_name", { required: true })}
              focusBorderColor="blue.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Select Match Type</FormLabel>
            <select
              id="match_type"
              {...register("match_type", { required: true })}
            >
              <option value="ict">ICT</option>
              <option value="general_knowledge">General Knowledge</option>
            </select>
          </FormControl>

          <FormControl>
            <FormLabel>Add Teams</FormLabel>
            <VStack spacing={4} align="stretch" id="teamSection">
              {teamSections}
            </VStack>
            <Button
              mt={4}
              onClick={handleAddTeam}
              colorScheme="blue"
              variant="outline"
              size="sm"
            >
              Add Team
            </Button>
          </FormControl>

          <Button type="submit" colorScheme="green" size="lg">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddMatch;
