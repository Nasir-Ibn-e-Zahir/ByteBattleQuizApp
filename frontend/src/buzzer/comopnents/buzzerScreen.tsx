// buzzer.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { motion } from "framer-motion";
import { Button, Flex, VStack, Input, Text, Box } from "@chakra-ui/react";
import { useState } from "react";
import useBuzzerMutation, {
  TeamFormData,
  teamSchema,
} from "../hooks/useBuzzer";

// Animation variants
const buttonVariants = {
  initial: { scale: 1 },
  pressed: { scale: 0.95 },
};

const BuzzerPage = () => {
  const [showBuzzer, setShowBuzzer] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [teamName, setTeamName] = useState("");
  const { mutateAsync } = useBuzzerMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
  });

  const handleFormSubmit = ({ teamName }: TeamFormData) => {
    setTeamName(teamName);
    setShowBuzzer(true);
  };

  const handleBuzzerPress = async () => {
    setIsPressed(true);
    const timestamp = new Date().toISOString();

    await mutateAsync({
      teamName,
      timestamp,
    });
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <VStack gap={8} w="100%" maxW="md" px={4}>
        {!showBuzzer ? (
          <Box as="form" w="100%" onSubmit={handleSubmit(handleFormSubmit)}>
            <VStack gap={4}>
              <Input
                {...register("teamName")}
                placeholder="Enter team name"
                size="lg"
                autoComplete="off"
              />
              {errors.teamName && (
                <Text color="red.500">{errors.teamName.message}</Text>
              )}
              <Button type="submit" background="blue" w="100%">
                Register Team
              </Button>
            </VStack>
          </Box>
        ) : (
          <VStack gap={6}>
            <Text fontSize="2xl" fontWeight="bold">
              {teamName}
            </Text>
            <motion.div
              variants={buttonVariants}
              animate={isPressed ? "pressed" : "initial"}
            >
              <Button
                onClick={handleBuzzerPress}
                disabled={isPressed}
                size="lg"
                w="250px"
                h="250px"
                borderRadius="full"
                bg={isPressed ? "green" : "red"}
                color="white"
                fontSize="3xl"
                fontWeight="bold"
                boxShadow="xl"
                _hover={{
                  transform: "scale(1.05)",
                  boxShadow: "2xl",
                }}
                transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              >
                BUZZ!
              </Button>
            </motion.div>
          </VStack>
        )}
      </VStack>
    </Flex>
  );
};

export default BuzzerPage;
