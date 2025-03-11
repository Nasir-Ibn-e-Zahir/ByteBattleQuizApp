import { useQuery } from "@tanstack/react-query";
import axios from "../../services/axios";

export interface Round {
  id: number;
  team_id: number;
  match_id: number;
  score: number;
  teams: {
    id: number;
    team_name: string;
  };
}

interface Match {
  id: number;
  match_name: string;
  match_type: string;
  rounds: Round[];
}

export interface ResponseMatch {
  matches: Match[];
}

const fetchAllMatches = async (): Promise<Match[]> => {
  const response = await axios.get<ResponseMatch>("/match/all_matches");
  console.log(response.data);
  return response.data.matches;
};
const useAllMatches = () => {
  return useQuery<Match[], Error>({
    queryKey: ["matches"],
    queryFn: () => fetchAllMatches(),
  });
};

export default useAllMatches;
