import {
  Box,
  Text,
  Table,
  Heading,
  Input,
  Spinner,
  Button,
} from "@chakra-ui/react";
import useSingleMatch from "./useSingleMatch";
import { useParams } from "react-router-dom";
import { FormControl } from "@chakra-ui/form-control";
import { useEffect, useState } from "react";

function Scoreboard() {
  const { id } = useParams<{ id: string }>();
  const { data: match, isError, isLoading, mutation } = useSingleMatch(id);
  const [scores, setScores] = useState<{ [key: number]: number }>({});

  // Initialize scores state with the current scores from the match data
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
          Failed to load question data. Please try again.
        </Text>
      </Box>
    );
  if (!match) return <Box>No match data found.</Box>;

  const handleScoreChange = (roundId: number, score: number) => {
    setScores((prev) => ({ ...prev, [roundId]: score }));
  };

  const handleSubmit = () => {
    // Prepare the updated rounds for submission
    const updatedRounds = match.rounds.map((round) => ({
      ...round,
      score: scores[round.id],
    }));

    // Call the mutation to update the scores
    mutation.mutate(updatedRounds);
  };

  return (
    <Box>
      <Heading>
        Scoreboard for {match?.match_type} {match?.match_name}
      </Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Team</Table.ColumnHeader>
            <Table.ColumnHeader>Score</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {match?.rounds.map((round) => (
            <Table.Row key={round.id}>
              <Table.Cell key={round.team_id}>
                {round.teams.team_name}
              </Table.Cell>
              <Table.Cell>
                <FormControl>
                  <Input
                    // defaultValue={round.score}
                    value={scores[round.id] ?? round.score}
                    onChange={(e) =>
                      handleScoreChange(round.id, parseInt(e.target.value) || 0)
                    }
                  />
                </FormControl>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Button type="submit" onClick={handleSubmit}>
        Update Score
      </Button>
    </Box>
  );
}

export default Scoreboard;
