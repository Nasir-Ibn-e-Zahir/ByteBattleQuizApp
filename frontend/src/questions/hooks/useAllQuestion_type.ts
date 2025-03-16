// Update the fetch function in useAllQuestion_type.ts
import { useQuery } from "@tanstack/react-query";
import axios from "../../services/axios";

interface Question_Type {
  question_type: string;
}

const fetchQuestion_type = async (): Promise<Question_Type[]> => {
  const response = await axios.get<Question_Type[]>(
    "/question/all_question_types"
  );
  return response.data || []; // Directly return response.data
};

const useAllQuestoin_type = () => {
  return useQuery<Question_Type[], Error>({
    queryKey: ["q_types"],
    queryFn: fetchQuestion_type, // Simplified since the function doesn't need a wrapper
    initialData: [],
  });
};

export default useAllQuestoin_type;
