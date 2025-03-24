import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../services/axios";
import { Round } from "./useAllMatches";
import { useEffect } from "react";
import io from "socket.io-client";

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

  const response = await axios.get<{ match: Match }>(`match/${id}/edit`);

  return response.data.match;
};

const useSingleMatch = (id: string | undefined) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const socket = io("http://localhost:3000"); // Adjust URL as needed

    socket.on("scoreUpdate", () => {
      queryClient.invalidateQueries({ queryKey: ["match", id] }); // Refresh data
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);

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
      queryClient.invalidateQueries({ queryKey: ["match", id] }); // Invalidate match query
      console.log("Score updated successfully.");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return { mutation, data, isError, isLoading };
};

export default useSingleMatch;
