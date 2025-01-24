import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const matchData = z.object({
  team_ids: z.array(z.string()),
  match_name: z.string(),
  match_type: z.string(),
});

export type matchDataFormat = z.infer<typeof matchData>;

const useAddMatch = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: matchDataFormat) => {
      matchData.parse(data);

      const response = await axios.post(
        "http://localhost:3000/api/match/add",
        data
      );
      return response;
    },
    onSuccess: (response) => {
      console.log("Team Inserted Successfully", response.data);
      navigate("/match/all_matches");
    },
    onError: (e) => {
      console.log("Some error occurred durig team insertion", e);
    },
  });
};

export default useAddMatch;
