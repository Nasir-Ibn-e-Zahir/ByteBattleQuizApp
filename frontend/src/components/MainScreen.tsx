import useSingleMatch from "../match/hooks/useSingleMatch";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Flex,
  List,
  Text,
  VStack,
} from "@chakra-ui/react";
import useAllQuestoins, { Question } from "../questions/hooks/uesAllQustions";
import { useState } from "react";
import useAllBuzzers from "../buzzer/hooks/useAllBuzzers";

function MainScreen() {
  const { id } = useParams();
  const { data: match } = useSingleMatch(id);
  const { data: questions } = useAllQuestoins();
  const { data: buzzers, error, isLoading } = useAllBuzzers();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [previousQuestion, setPreviousQuestion] = useState<number[]>([]);
  const [correctOption, setCorrectOption] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const [activeOption, setActiveOption] = useState<string | null>(null);

  const filteredQuestions = match?.match_type
    ? questions?.filter(
        (q) => q.q_type.toLowerCase() == match.match_type.toLowerCase()
      )
    : questions;

  // console.log(filteredQuestions?.length);
  const getRandomQuestion = () => {
    if (!filteredQuestions) return null;

    if (previousQuestion.length >= filteredQuestions.length) {
      setPreviousQuestion([]);
    }

    const availableQuestions = filteredQuestions.filter(
      (_, index) => !previousQuestion.includes(index)
    );

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);

    const actualIndex = filteredQuestions.indexOf(
      availableQuestions[randomIndex]
    );

    setPreviousQuestion((prev) => [...prev, actualIndex]);
    return availableQuestions[randomIndex];
  };

  const handleNextQuestion = () => {
    document.body.style.backgroundColor = "white";
    setShowAnswer(false);
    setShowCorrectAnswer(false);
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
  let tCount = 1;

  return (
    <Flex
      minH="100vh"
      p={8}
      gap={8}
      bg="gray.50"
      justifyContent="space-between"
    >
      <Box bg="white" p={6} borderRadius="xl" boxShadow="lg" w="300px">
        <Heading size="lg" mb={4} color="brand.secondary">
          Score Board
        </Heading>
        <List.Root>
          {match?.rounds.map((round) => (
            <Box key={round.id} bg="gray.50" p={3} borderRadius="md">
              <Text fontWeight="600">{round.teams.team_name}</Text>
              <Text fontSize="2xl" color="brand.primary">
                {round.score}
              </Text>
            </Box>
          ))}
        </List.Root>
      </Box>
      <Box
        flex={1}
        maxW="800px"
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="lg"
      >
        {currentQuestion ? (
          <Box mt={4}>
            <Text fontSize="xl" fontWeight={"bold"} mb={2}>
              {currentQuestion.question}
            </Text>
            <VStack align="start">
              {["option_a", "option_b", "option_c", "option_d"].map(
                (optionKey, index) => {
                  const optionValue = currentQuestion
                    ? currentQuestion[optionKey as keyof Question]
                    : "";
                  const isActive = activeOption === optionValue;
                  const isCorrect =
                    optionValue === currentQuestion?.correct_option;

                  // Determine button color
                  let background = "white";
                  let color = "";
                  if (showCorrectAnswer && isCorrect) {
                    background = "green";
                    color = "white";
                  } else if (isActive) {
                    background = "blue";
                  }

                  return (
                    <Button
                      color={color}
                      key={optionKey}
                      onClick={() => handleCorrectOption(optionValue as string)}
                      background={background}
                      variant={isActive ? "solid" : "outline"}
                      size="lg"
                      w="full"
                      justifyContent="flex-start"
                      _hover={{ transform: "translateY(-2px)" }}
                    >
                      {String.fromCharCode(65 + index)}) {optionValue}
                    </Button>
                  );
                }
              )}
            </VStack>
          </Box>
        ) : (
          <Text mt={4}>
            {filteredQuestions?.length
              ? "Click next to star! "
              : "No questions available"}
          </Text>
        )}

        {filteredQuestions?.length && (
          <Text mt={2} fontSize={"sm"} color={"gray.500"}>
            Questions remaining:{" "}
            {filteredQuestions.length - previousQuestion.length}
          </Text>
        )}
        <Button
          onClick={handleNextQuestion}
          background="blue"
          m={4}
          disabled={!filteredQuestions?.length}
        >
          Next Question
        </Button>
        <Button m={4} onClick={handleCheckButton}>
          Check
        </Button>
        {showAnswer == true ? (
          <Button
            m={4}
            background={"red.600"}
            onClick={() => setShowCorrectAnswer(true)}
          >
            Show Answer
          </Button>
        ) : (
          ""
        )}
      </Box>
      <Box bg="white" p={6} borderRadius="xl" boxShadow="lg" w="300px">
        <Heading size="lg" mb={4} color="brand.secondary">
          Buzzer Queue
        </Heading>
        {buzzers?.map((buzzer) => (
          <Box key={buzzer.id} bg="gray.50" p={3} mb={2} borderRadius="md">
            <Text fontWeight="500">{buzzer.teamName}</Text>
            <Text fontSize="sm" color="gray.500">
              {new Date(buzzer.timestamp).toLocaleTimeString()}
            </Text>
          </Box>
        ))}
      </Box>
    </Flex>
  );
}

export default MainScreen;
