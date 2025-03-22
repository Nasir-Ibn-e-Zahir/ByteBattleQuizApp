import {
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAddQuestion, { questionDataFormat } from "../hooks/useAddQuestion";

const AddQuestion = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<questionDataFormat>();
  const { mutate } = useAddQuestion();

  const submit = (data: questionDataFormat) => {
    mutate(data);
  };

  return (
    <Box maxW="2xl" mx="auto" bg="white" p={8} borderRadius="xl" boxShadow="lg">
      <Heading size="xl" mb={6} textAlign="center" color="gray">
        Add New Question
      </Heading>
      <Text textAlign="center" color="gray.600" ml={10} mr={5} mb={6}>
        Please fill the following fields to create a new question in the Quiz.
      </Text>
      <Box p={6}>
        <form onSubmit={handleSubmit(submit)}>
          <Stack>
            <FormControl mb={6} isInvalid={!!errors.q_type}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.600">
                Question Type
              </FormLabel>
              <Input
                size="lg"
                type="text"
                placeholder="e.g., General Knowledge, English, Computer Science, ..."
                {...register("q_type", {
                  required: "Question type is required",
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
              <FormErrorMessage color="red">
                {errors.q_type?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mb={6} isInvalid={!!errors.question}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.600">
                Question
              </FormLabel>
              <Input
                size="lg"
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
              <FormErrorMessage color="red">
                {errors.question?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={!!errors.option_a}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.600">
                Option A
              </FormLabel>
              <Input
                size="lg"
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
              <FormErrorMessage color="red">
                {errors.option_a?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={!!errors.option_b}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.600">
                Option B
              </FormLabel>
              <Input
                size="lg"
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
              <FormErrorMessage color="red">
                {errors.option_b?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={!!errors.option_c}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.600">
                Option C
              </FormLabel>
              <Input
                size="lg"
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
              <FormErrorMessage color="red">
                {errors.option_c?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={!!errors.option_d}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.600">
                Option D
              </FormLabel>
              <Input
                size="lg"
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
              <FormErrorMessage color="red">
                {errors.option_d?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={!!errors.correct_option}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.600">
                Correct Option
              </FormLabel>
              <Input
                size="lg"
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
              <FormErrorMessage color="red">
                {errors.correct_option?.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="blue"
              size="lg"
              type="submit"
              _hover={{
                bg: "blue.600",
              }}
              width="full"
            >
              Add Question
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default AddQuestion;
