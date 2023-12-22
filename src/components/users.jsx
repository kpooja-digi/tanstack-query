import React from 'react'
import 'boxicons';
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
import { getUsers,deleteUser } from './helper';

export default function Users() {
 const {status,data,isFetching} =useQuery({queryKey:["users"],queryFn:getUsers})
//  console.log("query",data)
const queryClient= useQueryClient()
 const deleteMutation =useMutation({mutationFn:deleteUser,
onSuccess:()=>{
    queryClient.invalidateQueries({ queryKey: ['users'] })
}
})

async function handleClick(e){
    if(e.target.dataset.id){
        await deleteMutation.mutate(e.target.dataset.id)
        console.log("deleted data successfully",deleteMutation.mutate(e.target.dataset.id))
    }
}


  return (
    <div className="users grid grid-cols-3 justify-center gap-20">
        {isFetching?<div>Background updating .....</div>:<></>}
        {status==="success"? data.map((value,index)=>
        <UserComponent key={index} data={value} handleClick={handleClick}/> 
        ) : <></>}
         
        
    </div>
  )
}


function UserComponent({ data,handleClick}){
    if(!data) return <></>;
    return (
        <div data-id={data.id} onClick={handleClick} className="relative profile py-10 px-5 flex flex-col justify-center items-center text-center gap-4 ">
            {/* <div className="img relative">
               
            </div> */}
            <div className="details text-gray-600">
                <h1 className='text-blue-300'>user details</h1>
                <h4 className='text-md'>{data.name}</h4>
                <h5 className='text-xs'>{data.email}</h5>        
            </div>
            <button className='delete py-2' ><box-icon data-id={data.id} color="rgb(248 113 113)" name='trash'></box-icon></button>

        </div> 
    )
}