import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAddMatch, { matchDataFormat } from "../hooks/useAddMatch";
import useAllTeams from "../../teams/hooks/useAllTeams";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import useAllQuestoin_type from "../../questions/hooks/useAllQuestion_type";

export const AddMatch = () => {
  const { handleSubmit, register } = useForm<matchDataFormat>();
  const { mutate } = useAddMatch();
  const { data: teams, isLoading, isError } = useAllTeams();
  const { data: q_types } = useAllQuestoin_type();
  const [teamSections, setTeamSections] = useState<
    { id: string; value: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState("");

  const typeOptions = [
    { value: "", lable: "All Types" },
    ...(q_types?.map((t) => ({
      value: t.question_type,
      lable: t.question_type,
    })) || []),
  ];

  const submit = (data: matchDataFormat) => {
    // Check if any team dropdown is empty
    const invalidTeams = teamSections.some((section) => !section.value);

    if (invalidTeams) {
      setError("Please select a team for each dropdown.");
      return;
    }
    setError(null);

    const teamIds = teamSections.map((section) => section.value); // Extract selected team IDs
    const submitData = {
      ...data,
      team_ids: teamIds,
    };
    console.log(submitData);
    mutate(submitData);
  };

  // Function to add a new team section
  const handleAddTeam = () => {
    const newTeamDiv = {
      id: Date.now().toString(),
      value: "",
    };
    setTeamSections((prevSections) => [...prevSections, newTeamDiv]);
  };

  // Function to handle team selection change
  const handleTeamChange = (id: string, value: string) => {
    setTeamSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, value } : section
      )
    );
  };

  // Function to remove a team section
  const handleRemoveTeam = (id: string) => {
    setTeamSections((prevSections) =>
      prevSections.filter((section) => section.id !== id)
    );
  };
  // Real-time error removal
  useEffect(() => {
    if (teamSections.every((section) => section.value)) {
      setError(null); // Clear error if all dropdowns are valid
    }
  }, [teamSections]);

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
    <Box>
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Add New Match
      </Heading>
      <form onSubmit={handleSubmit(submit)}>
        <VStack align="stretch">
          <FormControl>
            <FormLabel>Enter Match Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter match name"
              {...register("match_name", { required: true })}
              borderColor="blue.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Select Match Type</FormLabel>
            <select
              id="match_type"
              {...register("match_type", { required: true })}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {typeOptions.map((q_type) => (
                <option key={q_type.value} value={q_type.value}>
                  {q_type.lable}
                </option>
              ))}
            </select>
          </FormControl>

          <FormControl isInvalid={!!error}>
            <VStack align="stretch" id="teamSection">
              {teamSections.map((section, index) => (
                <HStack key={section.id} align="center">
                  <select
                    id={`team_${index}`}
                    value={section.value}
                    onChange={(e) =>
                      handleTeamChange(section.id, e.target.value)
                    }
                  >
                    <option value="">Select a team</option>
                    {teams?.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.team_name}
                      </option>
                    ))}
                  </select>
                  <Button
                    size="sm"
                    background={"red.600"}
                    onClick={() => handleRemoveTeam(section.id)}
                  >
                    Remove
                  </Button>
                </HStack>
              ))}
            </VStack>
            {error && (
              <FormErrorMessage paddingTop={10} textColor={"red"}>
                {error}
              </FormErrorMessage>
            )}

            <Button
              mt={4}
              onClick={handleAddTeam}
              background="blue.700"
              color={"white"}
              variant="outline"
              size="sm"
            >
              Add Team
            </Button>
          </FormControl>

          <Button mt="20px" type="submit" size={"sm"} width={"150px"}>
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddMatch;
