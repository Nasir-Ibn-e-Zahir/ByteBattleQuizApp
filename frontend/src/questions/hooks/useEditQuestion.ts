import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../services/axios";
import { questionDataFormat } from "./useAddQuestion";

const fetchQuestion = async (id: string) => {
  const response = await axios.get(`/question/${id}/edit`);
  console.log(response.data.question);
  return response.data.question;
};
const useEditQuestion = (id: string | undefined, onSuccess: () => void) => {
  const {
    data: question,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["question", id],
    queryFn: () => fetchQuestion(id!),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: async (data: questionDataFormat) => {
      const questionData = new FormData();

      questionData.append("question", data.question);
      questionData.append("option_a", data.option_a);
      questionData.append("option_b", data.option_b);
      questionData.append("option_c", data.option_c);
      questionData.append("option_d", data.option_d);
      questionData.append("correct_option", data.correct_option);

      const response = await axios.put(`question/${id}`, questionData);
      return response;
    },
    onSuccess: () => {
      console.log("Question updated successfully");
      onSuccess();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return { mutation, question, isError, isLoading };
};

export default useEditQuestion;
