import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../services/axios";
import { Round } from "./useAllMatches";

interface Match {
  id: number;
  match_name: string;
  match_type: string;
  rounds: Round[];
}

const fetchSingleMatch = async (id: string | undefined): Promise<Match> => {
  if (!id) {
    throw new Error("Match ID is required"); // Handle case where `id` is undefined
  }

  const response = await axios.get(`match/${id}/edit`);

  return response.data.match;
};

const useSingleMatch = (id: string | undefined) => {
  const { data, isError, isLoading } = useQuery<Match, Error>({
    queryKey: ["match", id], // Include `id` in the query key for proper caching
    queryFn: () => fetchSingleMatch(id),
    enabled: !!id, // Only run the query if `id` is defined
  });

  const mutation = useMutation({
    mutationFn: async (updatedRounds: Round[]) => {
      const response = axios.put(`match/${id}/update_score`, {
        rounds: updatedRounds,
      });

      return response;
    },
    onSuccess: () => {
      console.log("Socre updated successfully.");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return { mutation, data, isError, isLoading };
};

export default useSingleMatch;
