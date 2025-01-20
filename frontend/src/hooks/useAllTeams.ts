import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the structure of the team data
interface Team {
  team_name: string;
  description: string;
}

const useAllTeams = () => {
  const { data, error, isError, isLoading } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/team/all_teams");
      console.log(response.data.allTeams)
      return response.data.allTeams; // Assuming the response contains the list of teams in 'data'
    }
   
  });

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

export default useAllTeams;
