import { Box, Button, Heading, Input, Textarea} from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useForm } from 'react-hook-form'
import useAddTeam, { teamAdditionData } from '../hooks/useAddTeam';

const AddTeam = () => {
  const {register,handleSubmit, formState: { errors }} = useForm<teamAdditionData>();

  const { mutate } = useAddTeam();
 
   
  const submit = (data:teamAdditionData) =>{
    mutate(data,{
      onSuccess:()=>{
          console.log('team compnenet')
      },
      onError:(error)=>{
        console.log(error)
      },
    })
  }
  
  return (
    <>
     <Box paddingX={'400px'} textAlign='center' >
      <Heading>
        Add New Team Here!
      </Heading>
      <form action="" onSubmit={handleSubmit(submit)}>
       <FormControl>
          <FormLabel> Enter Team Name</FormLabel>
          <Input type={'text'}  {...register("team_name",{required: true})} ></Input>
          {errors.team_name && <p style={{ color: "red" }}>Team name is required</p>}
       </FormControl>
       <FormControl>
          <FormLabel> Description </FormLabel>
          <Textarea type={'text'} required {...register("team_desc")}  size={'md'} resize={'vertical'} ></Textarea>
       </FormControl>
       <Button type={'submit'} >Add</Button>
      </form>
     </Box>
    </>
  )
}

export default AddTeam
