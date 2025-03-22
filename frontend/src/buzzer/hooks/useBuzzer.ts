import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../services/axios";

// Zod schema for form validation
export const teamSchema = z.object({
  teamName: z.string().min(3, "Team name must be at least 3 characters"),
});

export type TeamFormData = z.infer<typeof teamSchema>;

export interface BuzzerPressPayload {
  teamName: string;
  timestamp: string;
}

const useBuzzerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BuzzerPressPayload) => {
      const response = await fetch("http://localhost:3000/api/buzzer/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to register buzz");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buzzer-queue"] });
    },
    onError: (error) => {
      console.error("Buzzer submission failed:", error);
    },
  });
};

export default useBuzzerMutation;
