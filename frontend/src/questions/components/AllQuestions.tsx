import { Box, Button, Spinner, Table, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAllQuestoins from "../hooks/uesAllQustions";
import useDeleteQuestion from "../hooks/useDeleteQuestion";

function AllQuestions() {
  const { data: questions, isLoading, error } = useAllQuestoins();

  const { mutate: deleteQuestion } = useDeleteQuestion();

  const handleDeleteQuestion = (id: number) => {
    deleteQuestion(id, {
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
      <Box textAlign={"center"}>
        <Spinner size={"xl"} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign={"center"}>
        <Text color={"red.500"}>
          Faild to Load questions. Please try again later.
        </Text>
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
        <Link to={"/question/add_question"}>Add New Question</Link>
      </Button>

      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Question</Table.ColumnHeader>
              <Table.ColumnHeader>Option A</Table.ColumnHeader>
              <Table.ColumnHeader>Option B</Table.ColumnHeader>
              <Table.ColumnHeader>Option C</Table.ColumnHeader>
              <Table.ColumnHeader>Option D</Table.ColumnHeader>
              <Table.ColumnHeader>Correct Option</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {questions?.map((question) => (
              <Table.Row key={question.id}>
                <Table.Cell>{question.id}</Table.Cell>
                <Table.Cell>{question.question}</Table.Cell>
                <Table.Cell>{question.option_a}</Table.Cell>
                <Table.Cell>{question.option_b}</Table.Cell>
                <Table.Cell>{question.option_c}</Table.Cell>
                <Table.Cell>{question.option_d}</Table.Cell>
                <Table.Cell>{question.correct_option}</Table.Cell>

                <Table.Cell>
                  <Button onClick={() => handleDeleteQuestion(question.id)}>
                    delete
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button background={"blue.600"}>
                    <Link to={`/question/${question.id}/edit`}>Edit</Link>
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

export default AllQuestions;
function toast(arg0: {
  title: string;
  description: string;
  status: string;
  duration: number;
  isClosable: boolean;
}) {
  throw new Error("Function not implemented.");
}
