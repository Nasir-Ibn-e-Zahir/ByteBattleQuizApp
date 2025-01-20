import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Box, Button, Heading } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useAddMatch, { matchDataFormat } from '../hooks/useAddMatch';
import useAllTeams from '../hooks/useAllTeams';

// interface Team{
//   id: number
//   team_name:string,
//   description:string,

// }

export const AddMatch = () => {
  const { handleSubmit, register } = useForm<matchDataFormat>();
  const { mutate } = useAddMatch();
  const { data, isLoading, isError } = useAllTeams();

  const submit = (data: matchDataFormat) => {
    mutate(data);
  };

  
  // Handle loading and error states
  if (isLoading) {

    return <div>Loading teams...</div>;
  }

  if (isError) {
    return <div>Error fetching teams.</div>;
  }

  return (
    <Box paddingX={"400px"} textAlign="center">
      <Heading>Add New Match</Heading>
      <form action="" onSubmit={handleSubmit(submit)}>
        <FormControl>
          <FormLabel>Enter Match Name: </FormLabel>
          <input type="text" {...register("match_name", { required: true })} placeholder="Team 1" />
        </FormControl><br />
        
        <FormControl>
          <FormLabel>Select Match Type: </FormLabel>
          <select id="match_type" {...register("match_type", { required: true })}>
           {data?.map((i)=>(
            <option value={i.description}>{i.team_name}</option>
           ))}
          </select>
        </FormControl><br />
        
        <FormControl>
          <Button  >Add Team +</Button>
          <div id="teamSection">

          </div>
        </FormControl><br />
        
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default AddMatch;
