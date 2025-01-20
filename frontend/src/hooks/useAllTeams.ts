import { QueryClient, useMutation } from "@tanstack/react-query"
import axios from "axios"

const useAllTeams = ()=>{
    const queryClient = new QueryClient;
    const { mutate, data, error, isError } = useMutation({
        mutationFn: async () => {
            const response = await axios.get("http://localhost:3000/api/team/get_all")
            return response.data
        },
        onSuccess:(response)=>{
            console.log(response)
            queryClient.setQueryData(["teams"],response)
        },
        onError:(error)=>{
            console.log(error)
        }
    })
    return {
        mutate,
        data, 
        error,
       
        isError
      };
}

export default useAllTeams