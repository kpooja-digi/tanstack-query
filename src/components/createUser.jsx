import React from 'react'
import { useForm } from 'react-hook-form';
import { createUser } from './helper';
import { useMutation ,useQueryClient} from '@tanstack/react-query';


export default function CreateUser() {

  const { register, handleSubmit, resetField } = useForm();
  const queryClient =useQueryClient()
   const addMutation =useMutation({
    mutationFn:createUser,
    onSuccess:()=>{queryClient.invalidateQueries({ queryKey: ['users'] })}
   })
   
  const onSubmit = async (data) => {
    if(data){
      await addMutation.mutate({data})
      console.log("user added successfully",data)
      resetField('name')
      resetField('email')

    }
  }

  return (
    <div className="form py-10">
        <form id="form" className='flex gap-4' onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('name')} placeholder="Full Name" className="form-input"/>    
            <input type="text" {...register('email')} placeholder="@email" className="form-input"/>    
            {/* <input type="text" {...register('imgUrl')} hidden value="/static/media/img5.fa884d7ebcceaa6e9b64.png" className="form-input"/>    
            <input type="text" {...register('status')} hidden value="active" className="form-input"/>     */}
            <button className='bg-indigo-500 px-5 rounded text-gray-50'>create</button>   
        </form>    
    </div>
  )
}
