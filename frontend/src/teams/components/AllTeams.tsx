import { Box, Table, Spinner, Text, Button } from "@chakra-ui/react";
import useAllTeams from "../hooks/useAllTeams";
import { Link } from "react-router-dom";
import useDeleteTeam from "../hooks/useDeleteTeam";

function AllTeams() {
  const { data: teams, error, isLoading } = useAllTeams();
  const { mutate: deleteTeam } = useDeleteTeam();

  const handleDeleteTeam = (id: number) => {
    deleteTeam(id, {
      onSuccess: () => {
        // Replace this with your toast implementation
        console.log(`Team with ID ${id} has been deleted successfully.`);
      },
      onError: (error: any) => {
        // Replace this with your toast implementation
        console.error(`Failed to delete team with ID ${id}. ${error.message}`);
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

  if (error) {
    return (
      <Box textAlign="center" mt={5}>
        <Text color="red.500">
          Failed to load teams. Please try again later.
        </Text>
      </Box>
    );
  }

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
        <Link to={"/team/add_team"}>Add New Team</Link>
      </Button>

      {teams && teams.length > 0 ? (
        <Box overflowX="auto">
          <Table.Root variant="line">
            <Table.Header bg="gray.100">
              <Table.Row>
                <Table.ColumnHeader>ID</Table.ColumnHeader>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Description</Table.ColumnHeader>
                <Table.ColumnHeader>Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {teams.map((team) => (
                <Table.Row key={team.id} _hover={{ bg: "gray.50" }}>
                  <Table.Cell>{team.id}</Table.Cell>
                  <Table.Cell>{team.team_name}</Table.Cell>
                  <Table.Cell>{team.description}</Table.Cell>
                  <Table.Cell>
                    <Button
                      size="sm"
                      bg="blue.600"
                      color="white"
                      _hover={{ bg: "blue.500" }}
                    >
                      <Link to={`/team/${team.id}/edit`}>Edit</Link>
                    </Button>
                    <Button
                      ml={2}
                      size="sm"
                      bg="red"
                      color="white"
                      _hover={{ bg: "red.500" }}
                      onClick={() => handleDeleteTeam(team.id)}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      ) : (
        <Box textAlign="center" my={5}>
          <Text>No teams available.</Text>
        </Box>
      )}
    </Box>
  );
}

export default AllTeams;
