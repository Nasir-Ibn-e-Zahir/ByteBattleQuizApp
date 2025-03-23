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
      <Heading size="xl" mb={6} textAlign="center" color="gray.800">
        Add New Question
      </Heading>
      <Text textAlign="center" color="gray.600" mb={6}>
        Please fill in the fields below to create a new question.
      </Text>
      <Box p={6}>
        <form onSubmit={handleSubmit(submit)}>
          <Stack gap={4}>
            <FormControl isInvalid={!!errors.q_type}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                Question Type
              </FormLabel>
              <Input
                size="lg"
                type="text"
                placeholder="e.g., General Knowledge, English, Computer Science, ..."
                {...register("q_type", {
                  required: "Question type is required",
                })}
                borderColor="#C9A834"
                _hover={{ borderColor: "#dcbf3e" }}
                _focus={{
                  outline: "none",
                  borderColor: "#C9A834",
                  boxShadow: "0 0 0 3px rgba(201,168,52,0.5)",
                }}
                p={4}
              />
              <FormErrorMessage color="red">
                {errors.q_type?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.question}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                Question
              </FormLabel>
              <Input
                size="lg"
                type="text"
                placeholder="e.g., Who is the president of the USA?"
                {...register("question", {
                  required: "This field is required",
                })}
                borderColor="#C9A834"
                _hover={{ borderColor: "#dcbf3e" }}
                _focus={{
                  outline: "none",
                  borderColor: "#C9A834",
                  boxShadow: "0 0 0 3px rgba(201,168,52,0.5)",
                }}
                p={4}
              />
              <FormErrorMessage color="red">
                {errors.question?.message}
              </FormErrorMessage>
            </FormControl>

            {(["option_a", "option_b", "option_c", "option_d"] as const).map(
              (optionKey, index) => (
                <FormControl key={optionKey} isInvalid={!!errors[optionKey]}>
                  <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                    Option {String.fromCharCode(65 + index)}
                  </FormLabel>
                  <Input
                    size="lg"
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
                    borderColor="#C9A834"
                    _hover={{ borderColor: "#dcbf3e" }}
                    _focus={{
                      outline: "none",
                      borderColor: "#C9A834",
                      boxShadow: "0 0 0 3px rgba(201,168,52,0.5)",
                    }}
                    p={4}
                  />
                  <FormErrorMessage color="red">
                    {errors[optionKey]?.message}
                  </FormErrorMessage>
                </FormControl>
              )
            )}

            <FormControl isInvalid={!!errors.correct_option}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                Correct Option
              </FormLabel>
              <Input
                size="lg"
                type="text"
                placeholder="e.g., A"
                {...register("correct_option", {
                  required: "Correct option is required",
                })}
                borderColor="#C9A834"
                _hover={{ borderColor: "#dcbf3e" }}
                _focus={{
                  outline: "none",
                  borderColor: "#C9A834",
                  boxShadow: "0 0 0 3px rgba(201,168,52,0.5)",
                }}
                p={4}
              />
              <FormErrorMessage color="red">
                {errors.correct_option?.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              bg="#C9A834"
              color="white"
              size="lg"
              type="submit"
              _hover={{ bg: "#dcbf3e" }}
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
