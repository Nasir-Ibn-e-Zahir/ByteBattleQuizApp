import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const teamdata = z.object({
    team_name: z.string(),
    description: z.string()
    
})

export type teamAdditionData = z.infer<typeof teamdata>

const useAddTeam = () => {
    
    return useMutation({
         mutationFn: async (data:teamAdditionData) => {
            teamdata.parse(data);

        const response = await axios.post("http://localhost:3000/api/team/add",data)
        
        return response;
         },

        onSuccess:(response)=>{
            console.log("Team Added Successfully!")
            console.log(response.data)
        },
        onError:()=>{
            console.log("an error is occured during the process")
        }
    })
}

export default useAddTeam