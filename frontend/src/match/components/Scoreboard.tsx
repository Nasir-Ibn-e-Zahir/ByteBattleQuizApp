import {
  Box,
  Text,
  Table,
  Heading,
  Input,
  Spinner,
  Button,
} from "@chakra-ui/react";
import useSingleMatch from "../hooks/useSingleMatch";
import { useParams } from "react-router-dom";
import { FormControl } from "@chakra-ui/form-control";
import { useEffect, useState } from "react";

function Scoreboard() {
  const { id } = useParams<{ id: string }>();
  const { data: match, isError, isLoading, mutation } = useSingleMatch(id);
  const [scores, setScores] = useState<{ [key: number]: number }>({});

  // Initialize scores with current match rounds
  useEffect(() => {
    if (match) {
      const initialScores = match.rounds.reduce((acc, round) => {
        acc[round.id] = round.score;
        return acc;
      }, {} as { [key: number]: number });
      setScores(initialScores);
    }
  }, [match]);

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );

  if (isError)
    return (
      <Box textAlign="center" mt={5}>
        <Text color="red.500">
          Failed to load match data. Please try again.
        </Text>
      </Box>
    );
  if (!match) return <Box>No match data found.</Box>;

  const handleScoreChange = (roundId: number, score: number) => {
    setScores((prev) => ({ ...prev, [roundId]: score }));
  };

  const handleSubmit = () => {
    const updatedRounds = match.rounds.map((round) => ({
      ...round,
      score: scores[round.id],
    }));
    mutation.mutate(updatedRounds);
  };

  return (
    <Box
      maxW="container.lg"
      mx="auto"
      p={6}
      bg="white"
      borderRadius="xl"
      boxShadow="md"
    >
      <Heading mb={6} color="gray.800">
        Scoreboard for {match?.match_type} – {match?.match_name}
      </Heading>
      <Table.Root variant="line">
        <Table.Header bg="gray.100">
          <Table.Row>
            <Table.ColumnHeader>Team</Table.ColumnHeader>
            <Table.ColumnHeader>Score</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {match.rounds.map((round) => (
            <Table.Row key={round.id} _hover={{ bg: "gray.50" }}>
              <Table.Cell>{round.teams.team_name}</Table.Cell>
              <Table.Cell>
                <FormControl>
                  <Input
                    value={scores[round.id] ?? round.score}
                    onChange={(e) =>
                      handleScoreChange(round.id, parseInt(e.target.value) || 0)
                    }
                    borderColor="#C9A834"
                    _hover={{ borderColor: "#dcbf3e" }}
                    _focus={{
                      outline: "none",
                      borderColor: "#C9A834",
                      boxShadow: "0 0 0 3px rgba(201,168,52,0.5)",
                    }}
                  />
                </FormControl>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Button
        mt={6}
        type="submit"
        onClick={handleSubmit}
        bg="#C9A834"
        color="white"
        _hover={{ bg: "#dcbf3e" }}
      >
        Update Score
      </Button>
    </Box>
  );
}

export default Scoreboard;
