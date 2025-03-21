import { Box, Button, HStack, Spinner, Table, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAllQuestoins from "../hooks/uesAllQustions";
import useDeleteQuestion from "../hooks/useDeleteQuestion";
import useAllQuestoin_type from "../hooks/useAllQuestion_type";
import { useState } from "react";

export const AllQuestions = () => {
  const { data: questions, isLoading, error } = useAllQuestoins();
  const { data: q_types } = useAllQuestoin_type();
  const [SelectedType, setSelectedType] = useState("");
  const { mutate: deleteQuestion } = useDeleteQuestion();

  const filteredQuestions = SelectedType
    ? questions?.filter((q) => q.q_type == SelectedType)
    : questions;

  const typeOptions = [
    { value: "", lable: "All Types" },
    ...(q_types?.map((t) => ({
      value: t.question_type,
      lable: t.question_type,
    })) || []),
  ];

  const handleDeleteQuestion = (id: number) => {
    deleteQuestion(id, {
      onSuccess: () => {
        toast({
          title: "Question deleted.",
          description: `Question with ID ${id} has been deleted successfully.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error deleting question.",
          description: `Failed to delete question with ID ${id}. ${error.message}`,
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
    <Box>
      <HStack>
        <select
          value={SelectedType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelectedType(e.target.value)
          }
        >
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.lable}
            </option>
          ))}
        </select>
        <Button>
          <Link to={"/question/add_question"}>Add New Question</Link>
        </Button>
      </HStack>
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Question Type</Table.ColumnHeader>
              <Table.ColumnHeader>Question</Table.ColumnHeader>
              <Table.ColumnHeader>Option A</Table.ColumnHeader>
              <Table.ColumnHeader>Option B</Table.ColumnHeader>
              <Table.ColumnHeader>Option C</Table.ColumnHeader>
              <Table.ColumnHeader>Option D</Table.ColumnHeader>
              <Table.ColumnHeader>Correct Option</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredQuestions?.map((question) => (
              <Table.Row key={question.id}>
                <Table.Cell>{question.id}</Table.Cell>
                <Table.Cell>{question.q_type}</Table.Cell>
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
};

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
