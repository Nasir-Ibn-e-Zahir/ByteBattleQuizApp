import { Box, Button, Heading, Input, Textarea, Stack, Text } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import useAddTeam, { teamAdditionData } from "../hooks/useAddTeam";

const formShadow = "md"; // Define the formShadow variable
const bgColor = "white"; // Define the bgColor variable

const AddTeam = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<teamAdditionData>();

  const { mutate } = useAddTeam();

  const submit = (data: teamAdditionData) => {
    mutate(data, {
      onSuccess: () => {
        console.log("team component");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

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
      <Heading as="h2" size="lg" textAlign="center" mb={4}>
        Add New Team Here
      </Heading>
      <Text textAlign="center" color="gray.600" mb={6}>
        Please fill in the details below to add a new team.
      </Text>
      <Box bg="gray.50" p={6} borderRadius="md">
        <form onSubmit={handleSubmit(submit)}>
          <Stack spacing={5}>
            <FormControl isInvalid={!!errors.team_name}>
              <FormLabel fontWeight="bold">Team Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter the team name"
                {...register("team_name", { required: "Team name is required" })}
                focusBorderColor="skyblue" // Sky-blue border on focus
              />
              <FormErrorMessage>{errors.team_name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.description}>
              <FormLabel fontWeight="bold">Description</FormLabel>
              <Textarea
                placeholder="Enter a brief description of the team"
                {...register("description", { required: "Description is required" })}
                focusBorderColor="skyblue" // Sky-blue border on focus
                size="md"
                resize="vertical"
              />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="blue"
              size="lg"
              type="submit"
              _hover={{
                bg: "teal.600",
              }}
              width="full"
            >
              Add Team
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default AddTeam;
