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
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useEditQuestion from "../hooks/useEditQuestion";
import { useEffect } from "react";
import { questionDataFormat } from "../hooks/useAddQuestion";

const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<questionDataFormat>();
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
        reset();
        navigate("/question/all_questions");
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

  return (
    <Box maxW="2xl" mx="auto" bg="white" p={8} borderRadius="xl" boxShadow="lg">
      <Heading as="h2" size="xl" textAlign="center" mb={6} color="gray.800">
        Edit Question
      </Heading>
      <Text textAlign="center" color="gray.600" mb={6}>
        Update the fields below to modify the question.
      </Text>
      <Box p={6} borderRadius="md">
        <form onSubmit={handleSubmit(submit)}>
          <Stack gap={4}>
            <FormControl isInvalid={!!errors.question}>
              <FormLabel fontWeight="bold" color="gray.700">
                Question
              </FormLabel>
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
                _hover={{ borderColor: "#C9A834" }}
                _focus={{
                  outline: "none",
                  borderColor: "#C9A834",
                  boxShadow: "0 0 0 3px rgba(201, 168, 52, 0.5)",
                }}
                _placeholder={{ color: "gray.400" }}
                p={4}
              />
              <FormErrorMessage>{errors.question?.message}</FormErrorMessage>
            </FormControl>

            {(["option_a", "option_b", "option_c", "option_d"] as const).map(
              (optionKey, index) => (
                <FormControl key={optionKey} isInvalid={!!errors[optionKey]}>
                  <FormLabel fontWeight="bold" color="gray.700">
                    Option {String.fromCharCode(65 + index)}
                  </FormLabel>
                  <Input
                    defaultValue={question ? question[optionKey] : ""}
                    type="text"
                    placeholder={`e.g., ${
                      index === 0
                        ? "Joe Biden"
                        : index === 1
                        ? "Donald Trump"
                        : index === 2
                        ? "Barack Obama"
                        : "Kamala Harris"
                    }`}
                    {...register(optionKey, {
                      required: `Option ${String.fromCharCode(
                        65 + index
                      )} is required`,
                    })}
                    bg="gray.50"
                    borderRadius="md"
                    border="2px solid"
                    borderColor="gray.300"
                    _hover={{ borderColor: "#C9A834" }}
                    _focus={{
                      outline: "none",
                      borderColor: "#C9A834",
                      boxShadow: "0 0 0 3px rgba(201, 168, 52, 0.5)",
                    }}
                    _placeholder={{ color: "gray.400" }}
                    p={4}
                  />
                  <FormErrorMessage>
                    {errors[optionKey]?.message}
                  </FormErrorMessage>
                </FormControl>
              )
            )}

            <FormControl isInvalid={!!errors.correct_option}>
              <FormLabel fontWeight="bold" color="gray.700">
                Correct Option
              </FormLabel>
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
                _hover={{ borderColor: "#C9A834" }}
                _focus={{
                  outline: "none",
                  borderColor: "#C9A834",
                  boxShadow: "0 0 0 3px rgba(201, 168, 52, 0.5)",
                }}
                _placeholder={{ color: "gray.400" }}
                p={4}
              />
              <FormErrorMessage>
                {errors.correct_option?.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              bg="#C9A834"
              size="lg"
              type="submit"
              _hover={{ bg: "#dcbf3e" }}
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
