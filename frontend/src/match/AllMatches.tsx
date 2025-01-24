import { Box, Button, Span, Table } from "@chakra-ui/react";
import { List, ListItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAllMatches from "./useAllMatches";

function AllMatches() {
  const { data: matches, isError, isLoading } = useAllMatches();

  if (isLoading) return <Box>Loading...</Box>;
  if (isError) return <Box>Error loading matches</Box>;

  return (
    <Box>
      <Button mb={15}>
        <Link to={"/match/add_match"}>Create New Match</Link>
      </Button>

      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Match Name</Table.ColumnHeader>
              <Table.ColumnHeader>Match Type</Table.ColumnHeader>
              <Table.ColumnHeader>Teams</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {matches?.map((match) => (
              <Table.Row key={match.id}>
                <Table.Cell>{match.id}</Table.Cell>
                <Table.Cell>{match.match_name}</Table.Cell>
                <Table.Cell>{match.match_type}</Table.Cell>
                <Table.Cell>
                  <List.Root>
                    {match.rounds?.map((round) => (
                      <ListItem key={round.teams.id}>
                        {round.teams.team_name}
                        <Span paddingLeft={5}>Score: {round.score}</Span>
                      </ListItem>
                    ))}
                  </List.Root>
                </Table.Cell>
                <Table.Cell>
                  <Button>
                    <Link to={`/match/${match.id}/scoreboard`}>Scoreboard</Link>
                  </Button>
                  <Button>
                    <Link to={`/match/${match.id}/edit`}>Edit</Link>
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
