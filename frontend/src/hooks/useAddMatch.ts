import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const matchData = z.object({
    match_name: z.string(),
    match_type: z.string(),
})

export type matchDataFormat = z.infer<typeof matchData>

const useAddMatch = () => {
    return useMutation({
        mutationFn: async (data: matchDataFormat)=>{
            matchData.parse(data)
            const response = await axios.post("http://localhost:3000/api/question/add",data)
            return response;
    },
    onSuccess:(response)=>{
        console.log("Team Inserted Successfully",response.data)
    },
    onError:(e)=>{
        console.log("Some error occurred durig team insertion",e)
    }
})
}

export default useAddMatch;