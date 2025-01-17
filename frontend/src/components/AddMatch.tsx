import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Box, Button, Heading } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useAddMatch, { matchDataFormat } from '../hooks/useAddMatch';

export const AddMatch = () => {
    const {handleSubmit,register} = useForm<matchDataFormat>()
    const {mutate} = useAddMatch()
    const submit = (data: matchDataFormat) => {
        mutate(data)
    }
  return (
    <Box paddingX={"400px"} textAlign="center">
        <Heading>Add New Match</Heading>
        <form action="" onSubmit={handleSubmit(submit)}>
           <FormControl>
            <FormLabel>Enter Match Name: </FormLabel>
                <input type="text" {...register("match_name",{required: true} ) } placeholder="Team 1" />
           </FormControl><br />
           <FormControl>
              <FormLabel> Select Match Type: </FormLabel>
                <select id="match_type" {...register("match_type",{required: true})}>
                    <option value="test">Test</option>
                    <option value="odi">ODI</option>
                    <option value="t20">T20</option>
                </select>
           </FormControl><br />
           <FormControl>
              <Button>Add Team +</Button>
           </FormControl><br />
           <Button type="submit">Submit</Button>
        </form>
    </Box>
  )
}

export default AddMatch;
