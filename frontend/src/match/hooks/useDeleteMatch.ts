import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "../../services/axios";

interface DeleteResponse {
  message: string;
}
const useDeleteMatch = (): UseMutationResult<DeleteResponse, Error, number> => {
  const queryClient = useQueryClient();
  return useMutation<DeleteResponse, Error, number>({
    mutationFn: async (id: number) =>
      await axios.delete(`/match/${id}/`).then((response) => response.data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["matches"],
      });
    },
  });
};

export default useDeleteMatch;
