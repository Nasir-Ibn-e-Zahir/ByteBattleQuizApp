import { useMutation } from "@tanstack/react-query";
import { matchDataFormat } from "./useAddMatch";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";

const useEditMatch = (id: string | undefined) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: matchDataFormat) => {
      const response = axios.put(`match/${id}`, data);
      return response;
    },
    onSuccess: (response) => {
      console.log("Match updated Successfully", response.data);
      navigate("/match/all_matches");
    },
    onError: (e) => {
      console.log("Some error occurred durig updating match. ", e);
    },
  });
};

export default useEditMatch;
