export const getUsers = async()=>{
    const data = await fetch("https://jsonplaceholder.typicode.com/users")
    return data.json()
}
export const createUser = async(PostData)=>{
    if(!PostData) return Promise.reject("PostData not provided")
    const data = await fetch("https://jsonplaceholder.typicode.com/users",{
        method:"POST",
        header:{'Content-Type':"application/json"},
        body:JSON.stringify(PostData)
})
    return data.json()
}

export const deleteUser = async(userId)=>{
    if(!userId) return Promise.reject("userId not provided")
    const data = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`,{
        method:"DELETE"})
    return data

}