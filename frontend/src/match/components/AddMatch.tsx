import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  Input,
  VStack,
  // Remove Chakra Select from import list since we now use plain HTML select
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
    const invalidTeams = teamSections.some((section) => !section.value);
    if (invalidTeams) {
      setError("Please select a team for each dropdown.");
      return;
    }
    setError(null);
    const teamIds = teamSections.map((section) => section.value);
    const submitData = {
      ...data,
      team_ids: teamIds,
    };
    console.log(submitData);
    mutate(submitData);
  };

  // Add new team dropdown section
  const handleAddTeam = () => {
    const newTeamDiv = { id: Date.now().toString(), value: "" };
    setTeamSections((prev) => [...prev, newTeamDiv]);
  };

  const handleTeamChange = (id: string, value: string) => {
    setTeamSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, value } : section
      )
    );
  };

  const handleRemoveTeam = (id: string) => {
    setTeamSections((prev) => prev.filter((section) => section.id !== id));
  };

  useEffect(() => {
    if (teamSections.every((section) => section.value)) {
      setError(null);
    }
  }, [teamSections]);

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
    <Box maxW="2xl" mx="auto" bg="white" p={8} borderRadius="xl" boxShadow="lg">
      <Heading as="h2" size="xl" textAlign="center" mb={6} color="gray.800">
        Add New Match
      </Heading>
      <form onSubmit={handleSubmit(submit)}>
        <VStack align="stretch" gap={4}>
          {/* Match Name Input */}
          <FormControl>
            <FormLabel>Enter Match Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter match name"
              {...register("match_name", { required: true })}
              borderColor="#C9A834"
              _hover={{ borderColor: "#dcbf3e" }}
              _focus={{
                outline: "none",
                borderColor: "#C9A834",
                boxShadow: "0 0 0 3px rgba(201,168,52,0.5)",
              }}
            />
          </FormControl>

          {/* Row with Match Type on left and Add Team on right */}
          <HStack gap={4}>
            <Box flex={1}>
              <FormControl>
                <FormLabel>Add Team</FormLabel>
                <Button
                  onClick={handleAddTeam}
                  bg="blue.700"
                  color="white"
                  variant="outline"
                  size="sm"
                  _hover={{ bg: "blue.600" }}
                  width="100%"
                >
                  Add Team
                </Button>
              </FormControl>
            </Box>
            <Box flex={1}>
              <FormControl>
                <FormLabel>Select Match Type</FormLabel>
                {/* Using a native select tag */}
                <select
                  {...register("match_type", { required: true })}
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.375rem",
                    border: "2px solid #C9A834",
                  }}
                >
                  <option value="">Select match type</option>
                  {typeOptions.map((q_type) => (
                    <option key={q_type.value} value={q_type.value}>
                      {q_type.lable}
                    </option>
                  ))}
                </select>
              </FormControl>
            </Box>
          </HStack>

          {/* Team Sections */}
          <FormControl isInvalid={!!error}>
            <VStack align="stretch">
              {teamSections.map((section, index) => (
                <HStack key={section.id}>
                  <select
                    id={`team_${index}`}
                    value={section.value}
                    onChange={(e) =>
                      handleTeamChange(section.id, e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "0.375rem",
                      border: "2px solid #C9A834",
                    }}
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
                    bg="red.600"
                    color="white"
                    onClick={() => handleRemoveTeam(section.id)}
                    _hover={{ bg: "red.500" }}
                  >
                    Remove
                  </Button>
                </HStack>
              ))}
            </VStack>
            {error && (
              <FormErrorMessage pt={4} color="red.500">
                {error}
              </FormErrorMessage>
            )}
          </FormControl>

          <Button
            mt={6}
            type="submit"
            size="md"
            width="150px"
            bg="#C9A834"
            color="black"
            _hover={{ bg: "#dcbf3e" }}
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddMatch;
