import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../services/axios";

interface DeleteResponse {
  message: string;
}

const useDeleteTeam = (): UseMutationResult<DeleteResponse, Error, number> => {
  const queryClient = useQueryClient();
  return useMutation<DeleteResponse, Error, number>({
    mutationFn: (id: number) =>
      axios.delete(`/team/${id}`).then((response) => response.data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["teams"],
      });
    },
  });
};

export default useDeleteTeam;
