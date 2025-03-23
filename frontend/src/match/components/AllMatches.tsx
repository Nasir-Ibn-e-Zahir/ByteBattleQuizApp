import { Box, Button, Table } from "@chakra-ui/react";
import { List, ListItem, Span } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAllMatches from "../hooks/useAllMatches";
import useDeleteMatch from "../hooks/useDeleteMatch";

function AllMatches() {
  const { data: matches, isError, isLoading } = useAllMatches();
  const { mutate: deleteMatch } = useDeleteMatch();

  const handleDeleteMatch = (id: number) => {
    deleteMatch(id);
  };

  if (isLoading)
    return (
      <Box textAlign="center" mt={6}>
        Loading...
      </Box>
    );
  if (isError)
    return (
      <Box textAlign="center" mt={6}>
        Error loading matches.
      </Box>
    );

  return (
    <Box
      maxW="container.lg"
      mx="auto"
      p={6}
      bg="white"
      borderRadius="xl"
      boxShadow="md"
    >
      <Button mb={4} bg="#C9A834" color="white" _hover={{ bg: "#dcbf3e" }}>
        <Link to={"/match/add_match"}>Create New Match</Link>
      </Button>
      <Box overflowX="auto">
        <Table.Root variant="line">
          <Table.Header bg="gray.100">
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Match Name</Table.ColumnHeader>
              <Table.ColumnHeader>Match Type</Table.ColumnHeader>
              <Table.ColumnHeader>Teams</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {matches?.map((match) => (
              <Table.Row key={match.id} _hover={{ bg: "gray.50" }}>
                <Table.Cell>{match.id}</Table.Cell>
                <Table.Cell>{match.match_name}</Table.Cell>
                <Table.Cell>{match.match_type}</Table.Cell>
                <Table.Cell>
                  <List.Root>
                    {match.rounds?.map((round) => (
                      <ListItem key={round.teams.id}>
                        {round.teams.team_name}
                        <Span pl={5}>Score: {round.score}</Span>
                      </ListItem>
                    ))}
                  </List.Root>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    size="sm"
                    mr={2}
                    bg="#C9A834"
                    color="white"
                    _hover={{ bg: "#dcbf3e" }}
                  >
                    <Link to={`/match/${match.id}/scoreboard`}>Scoreboard</Link>
                  </Button>
                  <Button
                    size="sm"
                    mx={2}
                    bg="blue.600"
                    color="white"
                    _hover={{ bg: "blue.500" }}
                  >
                    <Link to={`/match/${match.id}/quiz`}>Go to Quiz</Link>
                  </Button>
                  <Button
                    size="sm"
                    mx={2}
                    bg="blue.600"
                    color="white"
                    _hover={{ bg: "blue.500" }}
                  >
                    <Link to={`/match/${match.id}/edit`}>Edit</Link>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDeleteMatch(match.id)}
                    bg="red.600"
                    color="white"
                    _hover={{ bg: "red.500" }}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}

export default AllMatches;
