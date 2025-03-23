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
    ? questions?.filter((q) => q.q_type === SelectedType)
    : questions;

  const typeOptions = [
    { value: "", label: "All Types" },
    ...(q_types?.map((t) => ({
      value: t.question_type,
      label: t.question_type,
    })) || []),
  ];

  const handleDeleteQuestion = (id: number) => {
    deleteQuestion(id, {
      onSuccess: () => {
        // Replace with your toast implementation
        console.log(`Question with ID ${id} has been deleted successfully.`);
      },
      onError: (error: any) => {
        // Replace with your toast implementation
        console.error(
          `Failed to delete question with ID ${id}. ${error.message}`
        );
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
          Failed to load questions. Please try again later.
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
      <HStack mb={4} gap={4}>
        <select
          value={SelectedType}
          onChange={(e) => setSelectedType(e.target.value)}

          // _hover={{ borderColor: "#C9A834" }}
          // _focus={{
          //   outline: "none",
          //   borderColor: "#C9A834",
          //   boxShadow: "0 0 0 3px rgba(201, 168, 52, 0.5)",
          // }}
        >
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Button bg="#C9A834" color="black" _hover={{ bg: "#dcbf3e" }}>
          <Link to={"/question/add_question"}>Add New Question</Link>
        </Button>
      </HStack>
      <Box overflowX="auto">
        <Table.Root variant="line">
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
              <Table.Row key={question.id} _hover={{ bg: "gray.50" }}>
                <Table.Cell>{question.id}</Table.Cell>
                <Table.Cell>{question.q_type}</Table.Cell>
                <Table.Cell>{question.question}</Table.Cell>
                <Table.Cell>{question.option_a}</Table.Cell>
                <Table.Cell>{question.option_b}</Table.Cell>
                <Table.Cell>{question.option_c}</Table.Cell>
                <Table.Cell>{question.option_d}</Table.Cell>
                <Table.Cell>{question.correct_option}</Table.Cell>
                <Table.Cell>
                  <Button
                    mr={2}
                    size="sm"
                    bg="#C9A834"
                    color="black"
                    _hover={{ bg: "#dcbf3e" }}
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    Delete
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    size="sm"
                    bg="blue.600"
                    color="white"
                    _hover={{ bg: "blue.500" }}
                  >
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
