import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../services/axios";

type ResetResponse = { success: boolean }; // Define ResetResponse type

const useResetBuzzers = () => {
  const queryClient = useQueryClient();
  return useMutation<ResetResponse, Error>({
    mutationFn: async () => {
      const response = await axios.delete<{ success: boolean }>(
        "/buzzer/delete_all"
      );
      return response.data;
    },
    onSuccess: () => {
      // More precise query invalidation
      queryClient.invalidateQueries({
        queryKey: ["buzzer-queue"],
        exact: true,
      });
    },
  });
};
export default useResetBuzzers;
