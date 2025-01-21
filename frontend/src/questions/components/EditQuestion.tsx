import {
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import {
  Box,
  Button,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useForm } from "react-hook-form";
import { questionData, questionDataFormat } from "../hooks/useAddQuestion";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import useEditQuestion from "../hooks/useEditQuestion";
import { useEffect } from "react";

const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<questionDataFormat>({ resolver: zodResolver(questionData) });
  const { mutation, question, isError, isLoading } = useEditQuestion(id, reset);

  useEffect(() => {
    if (question) {
      reset({
        ...question,
      });
    }
  }, [question, reset]);

  const submit = (data: questionDataFormat) => {
    mutation.mutate(data, {
      onSuccess: () => {
        reset(), navigate("/question/all_questions");
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

  if (isError) {
    return (
      <Box textAlign="center" mt={5}>
        <Text color="red.500">
          Failed to load question data. Please try again.
        </Text>
      </Box>
    );
  }

  const bgColor = useColorModeValue("white", "gray.800");
  const formBg = useColorModeValue("gray.50", "gray.700");
  const formShadow = useColorModeValue("lg", "dark-lg");

  return (
    <Box
      maxWidth="1000px"
      mx="auto"
      p={8}
      borderRadius="lg"
      boxShadow={formShadow}
      bg={bgColor}
      mt={12}
    >
      <Heading as="h2" size="xl" textAlign="center" mb={4} fontWeight="bold">
        Add a New Question
      </Heading>
      <Text textAlign="center" color="gray.600" ml={10} mr={5} mb={6}>
        Please fill the following fields to create a new question in the Quiz.
      </Text>
      <Box bg={formBg} p={6} borderRadius="md">
        <form onSubmit={handleSubmit(submit)}>
          <Stack>
            <FormControl isInvalid={!!errors.question}>
              <FormLabel fontWeight="bold">Question</FormLabel>
              <Input
                defaultValue={question?.question}
                type="text"
                placeholder="e.g., Who is the president of the USA?"
                {...register("question", {
                  required: "This field is required",
                })}
                bg="gray.50"
                borderRadius="md"
                border="2px solid"
                borderColor="gray.300"
                _hover={{
                  borderColor: "blue.400",
                }}
                _focus={{
                  outline: "none",
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)",
                }}
                _placeholder={{
                  color: "gray.400",
                }}
                p={4}
              />
              <FormErrorMessage>{errors.question?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.option_a}>
              <FormLabel fontWeight="bold">Option A</FormLabel>
              <Input
                defaultValue={question?.option_a}
                type="text"
                placeholder="e.g., Joe Biden"
                {...register("option_a", { required: "Option A is required" })}
                bg="gray.50"
                borderRadius="md"
                border="2px solid"
                borderColor="gray.300"
                _hover={{
                  borderColor: "blue.400",
                }}
                _focus={{
                  outline: "none",
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)",
                }}
                _placeholder={{
                  color: "gray.400",
                }}
                p={4}
              />
              <FormErrorMessage>{errors.option_a?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.option_b}>
              <FormLabel fontWeight="bold">Option B</FormLabel>
              <Input
                defaultValue={question?.option_b}
                type="text"
                placeholder="e.g., Donald Trump"
                {...register("option_b", { required: "Option B is required" })}
                bg="gray.50"
                borderRadius="md"
                border="2px solid"
                borderColor="gray.300"
                _hover={{
                  borderColor: "blue.400",
                }}
                _focus={{
                  outline: "none",
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)",
                }}
                _placeholder={{
                  color: "gray.400",
                }}
                p={4}
              />
              <FormErrorMessage>{errors.option_b?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.option_c}>
              <FormLabel fontWeight="bold">Option C</FormLabel>
              <Input
                defaultValue={question?.option_c}
                type="text"
                placeholder="e.g., Barack Obama"
                {...register("option_c", { required: "Option C is required" })}
                bg="gray.50"
                borderRadius="md"
                border="2px solid"
                borderColor="gray.300"
                _hover={{
                  borderColor: "blue.400",
                }}
                _focus={{
                  outline: "none",
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)",
                }}
                _placeholder={{
                  color: "gray.400",
                }}
                p={4}
              />
              <FormErrorMessage>{errors.option_c?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.option_d}>
              <FormLabel fontWeight="bold">Option D</FormLabel>
              <Input
                defaultValue={question?.option_d}
                type="text"
                placeholder="e.g., Kamala Harris"
                {...register("option_d", { required: "Option D is required" })}
                bg="gray.50"
                borderRadius="md"
                border="2px solid"
                borderColor="gray.300"
                _hover={{
                  borderColor: "blue.400",
                }}
                _focus={{
                  outline: "none",
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)",
                }}
                _placeholder={{
                  color: "gray.400",
                }}
                p={4}
              />
              <FormErrorMessage>{errors.option_d?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.correct_option}>
              <FormLabel fontWeight="bold">Correct Option</FormLabel>
              <Input
                defaultValue={question?.correct_option}
                type="text"
                placeholder="e.g., A"
                {...register("correct_option", {
                  required: "Correct option is required",
                })}
                bg="gray.50"
                borderRadius="md"
                border="2px solid"
                borderColor="gray.300"
                _hover={{
                  borderColor: "blue.400",
                }}
                _focus={{
                  outline: "none",
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)",
                }}
                _placeholder={{
                  color: "gray.400",
                }}
                p={4}
              />
              <FormErrorMessage>
                {errors.correct_option?.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="blue"
              size="lg"
              type="submit"
              _hover={{
                bg: "blue.600", // Slightly darker blue on hover
              }}
              width="full"
            >
              Update Question
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default EditQuestion;
