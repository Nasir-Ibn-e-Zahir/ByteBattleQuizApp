import useSingleMatch from "../match/hooks/useSingleMatch";
import { useParams } from "react-router-dom";
import { Box, Heading, List } from "@chakra-ui/react";

function MainScreen() {
  const { id } = useParams();
  const { data: match, isError, isLoading } = useSingleMatch(id);
  return (
    <Box>
      <Heading>Score Board</Heading>
      <List.Root>
        {match?.rounds.map((round) => (
          <Box>
            <List.Item key={round.id}>{round.teams.team_name}</List.Item>
            <List.Item key={round.id}>{round.score}</List.Item>
          </Box>
        ))}
      </List.Root>
    </Box>
  );
}

export default MainScreen;
