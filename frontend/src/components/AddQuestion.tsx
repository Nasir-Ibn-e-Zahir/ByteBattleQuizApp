import {  FormLabel } from '@chakra-ui/form-control'
import { Box,  Button,  Heading, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import useAddQuestion, { questionDataFormat } from '../hooks/useAddQuestion'


const AddQuestion = () => {
    const {handleSubmit,register} = useForm<questionDataFormat>()
    const {mutate} = useAddQuestion()

    const submit = (data:questionDataFormat) => {
          mutate(data)
    }
  return (
    <>
    <Box>
       <Heading> Add New Question!</Heading>
       <form action="" onSubmit={handleSubmit(submit)}>
       
        <FormLabel>Question</FormLabel>
        <Input  type="text" placeholder={"who is example...."}  {...register("question",{required:true})} ></Input>
        <FormLabel>OptionA</FormLabel>
        <Input  type="text" {...register("option_a",{required:true})} ></Input>
        <FormLabel>OptionA</FormLabel>
        <Input  type="text" {...register("option_b",{required:true})} ></Input>
        <FormLabel>OptionA</FormLabel>
        <Input  type="text" {...register("option_c",{required:true})} ></Input>
        <FormLabel>OptionA</FormLabel>
        <Input  type="text" {...register("option_d",{required:true})}  ></Input>
        <FormLabel>Correct Option</FormLabel>
        <Input  type="text" {...register("correct_option",{required:true})} ></Input>
        <Button type={"submit"}>Add</Button>
       
       </form>
    </Box>
    </>
  )
}

export default AddQuestion
