import { useQuery } from "@tanstack/react-query";
import axios from "../../services/axios";

// Define the structure of the team data
export interface Team {
  id: number;
  team_name: string;
  description: string;
}

interface ResponseTeams {
  teams: Team[];
}

const fetchTeams = async (): Promise<Team[]> => {
  try {
    const response = await axios.get<ResponseTeams>("team/all_teams");
    // console.log(response.data.teams);
    return response.data.teams;
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
};

const useAllTeams = () => {
  return useQuery<Team[], Error>({
    queryKey: ["teams"],
    queryFn: () => fetchTeams(),
  });
};

export default useAllTeams;
