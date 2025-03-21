import { useQuery } from "@tanstack/react-query";
import axios from "../../services/axios";

export interface Question {
  id: number;
  q_type: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
}

interface ResponseQuestions {
  questions: Question[];
}

const fetchQuestions = async (): Promise<Question[]> => {
  const response = await axios.get<ResponseQuestions>("question/all_questions");
  return response.data.questions;
};
const useAllQuestoins = () => {
  return useQuery<Question[], Error>({
    queryKey: ["questions"],
    queryFn: () => fetchQuestions(),
  });
};

export default useAllQuestoins;
