import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import io from "socket.io-client";
import axios from "../../services/axios";

export interface Buzzer {
  id: string;
  teamName: string;
  timestamp: Date;
  status: string;
}

const fetchBuzzerQueue = async (): Promise<Buzzer[]> => {
  try {
    const response = await axios.get<Buzzer[]>("buzzer/all_buzzers");

    // console.log(response.data);

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Failed to fetch buzzer queue:", error);
    return []; // Return empty array instead of undefined
  }
};

const useAllBuzzers = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io("http://localhost:3000"); // Adjust URL as needed

    socket.on("buzzersReset", () => {
      queryClient.invalidateQueries({ queryKey: ["buzzer-queue"] }); // Refresh data
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);

  return useQuery<Buzzer[], Error>({
    queryKey: ["buzzer-queue"],
    queryFn: fetchBuzzerQueue,
    initialData: [], // Provide initial empty array
  });
};

export default useAllBuzzers;
