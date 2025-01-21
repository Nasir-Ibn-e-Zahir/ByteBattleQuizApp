import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../services/axios";
import { TeamAdditionData } from "./useAddTeam";

const fetchTeam = async (id: string) => {
  const response = await axios.get(`/team/${id}/edit`);
  //   console.log(response.data.team);
  return response.data.team;
};

const useEditTeam = (id: string | undefined, onSuccess: () => void) => {
  const {
    data: team,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["team", id],
    queryFn: () => fetchTeam(id!),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: async (data: TeamAdditionData) => {
      const teamData = new FormData();

      teamData.append("team_name", data.team_name);
      teamData.append("description", data.description);

      const response = await axios.put(`team/${id}`, teamData);
      return response;
    },
    onSuccess: () => {
      console.log("Team updated successfully");
      onSuccess();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return { team, isLoading, isError, mutation };
};

export default useEditTeam;
