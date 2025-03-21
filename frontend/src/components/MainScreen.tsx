import useSingleMatch from "../match/hooks/useSingleMatch";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  HStack,
  List,
  Text,
  VStack,
} from "@chakra-ui/react";
import useAllQuestoins, { Question } from "../questions/hooks/uesAllQustions";
import { useState } from "react";

function MainScreen() {
  const { id } = useParams();
  const { data: match, isError, isLoading } = useSingleMatch(id);
  const { data: questions } = useAllQuestoins();
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

  return (
    <HStack>
      <Box>
        <Heading>Score Board</Heading>
        <List.Root>
          {match?.rounds.map((round) => (
            <Box key={`round-${round.id}`}>
              <List.Item key={`${round.id}-team`}>
                {round.teams.team_name}
              </List.Item>
              <List.Item key={`${round.id}-score`}>{round.score}</List.Item>
            </Box>
          ))}
        </List.Root>
      </Box>
      <Box id="questionBox">
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
                      justifyContent="flex-start"
                      _hover={{ transform: "scale(1.02)" }}
                      transition="all 0.2s"
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
      <Box>{/* for buzzers */}</Box>
    </HStack>
  );
}

export default MainScreen;
