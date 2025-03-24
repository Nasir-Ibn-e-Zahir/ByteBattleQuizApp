import useSingleMatch from "../match/hooks/useSingleMatch";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Flex,
  Text,
  VStack,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import useAllQuestoins, { Question } from "../questions/hooks/uesAllQustions";
import { useState } from "react";
import useAllBuzzers from "../buzzer/hooks/useAllBuzzers";
import byteBattleLogo from "../assets/logo.jpg";

// (Optional) If you have a ByteBattle24 logo image, import it here
// import byteBattleLogo from "../assets/byteBattle24.png";

function MainScreen() {
  const { id } = useParams();
  const { data: match } = useSingleMatch(id);
  const { data: questions } = useAllQuestoins();
  const { data: buzzers } = useAllBuzzers();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [previousQuestion, setPreviousQuestion] = useState<number[]>([]);
  const [correctOption, setCorrectOption] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [activeOption, setActiveOption] = useState<string | null>(null);

  // Filter questions by match type (if applicable)
  const filteredQuestions = match?.match_type
    ? questions?.filter(
        (q) => q.q_type.toLowerCase() === match.match_type.toLowerCase()
      )
    : questions;

  // Utility to grab a random question
  const getRandomQuestion = () => {
    if (!filteredQuestions) return null;

    // Reset if we've asked all
    if (previousQuestion.length >= filteredQuestions.length) {
      setPreviousQuestion([]);
    }

    // Filter out previously used questions
    const availableQuestions = filteredQuestions.filter(
      (_, index) => !previousQuestion.includes(index)
    );

    // Random pick from the remaining
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const actualIndex = filteredQuestions.indexOf(
      availableQuestions[randomIndex]
    );

    setPreviousQuestion((prev) => [...prev, actualIndex]);
    return availableQuestions[randomIndex];
  };

  // Button Handlers
  const handleNextQuestion = () => {
    document.body.style.backgroundColor = "white";
    setShowAnswer(false);
    setShowCorrectAnswer(false);
    setActiveOption(null);
    const nextQuestion = getRandomQuestion();
    setCurrentQuestion(nextQuestion || null);
  };

  const handleCorrectOption = (selectedOption: string) => {
    setActiveOption(selectedOption);
    if (selectedOption === currentQuestion?.correct_option) {
      setCorrectOption("correct");
      console.log("Congratulation!!!");
    } else {
      setCorrectOption("wrong");
      console.log("Wrong answer.");
    }
  };

  const handleCheckButton = () => {
    if (correctOption === "correct") {
      document.body.style.backgroundColor = "green";
    } else {
      setShowAnswer(true);
      document.body.style.backgroundColor = "red";
    }
  };

  return (
    <Flex
      minH="100vh"
      p={4}
      bg="white"
      justifyContent="space-between"
      flexWrap={{ base: "wrap", md: "nowrap" }}
    >
      {/* Score Board */}
      <Box
        bg="white"
        p={6}
        borderRadius="xl"
        boxShadow="md"
        maxW="auto"
        position="sticky"
        top={4}
        height="fit-content"
      >
        <Heading
          size={"3xl"}
          mb={6}
          color="red"
          fontWeight="bold"
          textAlign="center"
        >
          Score Board
        </Heading>
        <VStack gap={3} align="stretch">
          {match?.rounds.map((round) => (
            <Flex
              key={round.id}
              bg="white"
              p={3}
              borderRadius="md"
              borderLeft="4px solid red"
              justify="space-between"
              align="center"
              boxShadow="sm"
            >
              <Text fontWeight="600" fontSize="xl" color="blue">
                {round.teams.team_name}
              </Text>
              <Text ml={7} fontSize="3xl" fontWeight="bold" color="gray.800">
                {round.score}
              </Text>
            </Flex>
          ))}
        </VStack>
      </Box>

      {/* Main Question Area */}
      <Box
        flex={1}
        maxW="auto"
        bg="white"
        p={6}
        borderRadius="xl"
        boxShadow="md"
        mx={{ base: 0, md: 6 }}
        mt={{ base: 6, md: 0 }}
        border="4px solid gold"
      >
        {/* Optional ByteBattle24 Logo at the top */}

        <Box textAlign="center">
          <Image
            src={byteBattleLogo}
            alt="ByteBattle24 Logo"
            mx="auto"
            mb={4}
            height="200px"
          />
        </Box>

        {currentQuestion ? (
          <Box mt={4} textAlign="center">
            <Heading
              size="lg"
              mb={6}
              color="black"
              fontWeight="semibold"
              border="2px solid black"
              borderRadius={"md"}
              p={4}
            >
              {currentQuestion.question}
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              {["option_a", "option_b", "option_c", "option_d"].map(
                (optionKey, index) => {
                  const optionValue = currentQuestion
                    ? currentQuestion[optionKey as keyof Question]
                    : "";
                  const isActive = activeOption === optionValue;
                  const isCorrect =
                    optionValue === currentQuestion?.correct_option;

                  let background = "gold";
                  if (showCorrectAnswer && isCorrect) {
                    background = "green";
                  } else if (isActive) {
                    background = "blue.500";
                  }

                  return (
                    <Button
                      key={optionKey}
                      onClick={() => handleCorrectOption(optionValue as string)}
                      bg={background}
                      color="white"
                      size="lg"
                      height="80px"
                      borderRadius="md"
                      _hover={{ bg: "#dcbf3e" }}
                      fontWeight="bold"
                    >
                      <VStack gap={0} mt={2}>
                        <Box
                          as="span"
                          fontWeight="bold"
                          color="blue.600"
                          width="40px"
                          height="40px"
                          bg="white"
                          borderRadius="5px"
                          pt={2}
                          fontSize="xl"
                        >
                          {String.fromCharCode(65 + index)}
                        </Box>
                        {optionValue}
                      </VStack>
                    </Button>
                  );
                }
              )}
            </SimpleGrid>
          </Box>
        ) : (
          <Text mt={4} fontSize="xl" color="gray.500" textAlign="center">
            {filteredQuestions?.length
              ? "Click next to start!"
              : "No questions available"}
          </Text>
        )}

        {filteredQuestions?.length && (
          <Text mt={4} fontSize="md" color="gray.500" textAlign="center">
            Questions remaining:{" "}
            <Box as="span" fontWeight="bold" color="blue.600">
              {filteredQuestions.length - previousQuestion.length}
            </Box>
          </Text>
        )}

        <Flex justify="center" gap={4} mt={8}>
          <Button
            onClick={handleNextQuestion}
            bg="blue.700"
            color="white"
            size="md"
            px={6}
            fontWeight="bold"
          >
            Next Question
          </Button>
          <Button
            onClick={handleCheckButton}
            bg="blue.700"
            color="white"
            size="md"
            px={6}
            fontWeight="bold"
          >
            Check Answer
          </Button>
          {showAnswer && (
            <Button
              onClick={() => setShowCorrectAnswer(true)}
              bg={"green"}
              color="white"
              size="md"
              px={6}
              fontWeight="bold"
            >
              Reveal Answer
            </Button>
          )}
        </Flex>
      </Box>

      <Box
        bg="white"
        p={6}
        borderRadius="xl"
        boxShadow="md"
        maxW="auto"
        position="sticky"
        top={4}
        height="fit-content"
      >
        <Heading size="3xl" mb={4} color="red" fontWeight="bold">
          Buzzers
        </Heading>
        <VStack gap={3} align="stretch">
          {buzzers?.map((buzzer) => (
            <Flex
              key={buzzer.id}
              bg="gray.50"
              p={3}
              borderRadius="md"
              direction="column"
              borderLeft="3px solid red"
              boxShadow="sm"
            >
              <Text fontSize="xl" fontWeight="600" color="blue">
                {buzzer.teamName}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {new Date(buzzer.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </Text>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
}

export default MainScreen;
