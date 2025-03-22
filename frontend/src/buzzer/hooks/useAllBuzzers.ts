import { useQuery } from "@tanstack/react-query";
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
  return useQuery<Buzzer[], Error>({
    queryKey: ["buzzer-queue"],
    queryFn: fetchBuzzerQueue,
    initialData: [], // Provide initial empty array
  });
};

export default useAllBuzzers;
