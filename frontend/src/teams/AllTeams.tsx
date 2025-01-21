import {
  Box,
  Table,
  Spinner,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";
import useAllTeams from "./useAllTeams";
import { Link } from "react-router-dom";
import { FiDelete } from "react-icons/fi";
import useDeleteTeam from "./useDeleteTeam";

function AllTeams() {
  const { data: teams, error, isLoading } = useAllTeams();

  const { mutate: deleteTeam } = useDeleteTeam();

  // const handleDeleteTeam = (id: number) => {
  //   delteTeam(id, {
  //     onSuccess: () => {
  //       window.alert(`Team no ${id} deleted`);
  //     },
  //     onError: (error) => {
  //       console.error(`Failed to delete team with id: ${id}`, error);
  //     },
  //   });
  // };

  const handleDeleteTeam = (id: number) => {
    deleteTeam(id, {
      onSuccess: () => {
        toast({
          title: "Team deleted.",
          description: `Team with ID ${id} has been deleted successfully.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error deleting team.",
          description: `Failed to delete team with ID ${id}. ${error.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
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

  if (!teams || teams.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Text>No teams available.</Text>
      </Box>
    );
  }

  return (
    <Box
      width={"100vh"}
      // overflowX="auto"
      p={5}
    >
      <Button>
        <Link to={"/add_team"}>Add New Team</Link>
      </Button>

      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Description</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {teams.map((team) => (
              <Table.Row key={team.id}>
                <Table.Cell>{team.id}</Table.Cell>
                <Table.Cell>{team.team_name}</Table.Cell>
                <Table.Cell>{team.description}</Table.Cell>
                <Table.Cell>
                  <IconButton
                    aria-label="Delete team"
                    // _icon={<FiDelete/>}
                    onClick={() => handleDeleteTeam(team.id)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}

export default AllTeams;
function toast(arg0: {
  title: string;
  description: string;
  status: string;
  duration: number;
  isClosable: boolean;
}) {
  throw new Error("Function not implemented.");
}
