import { useEffect, useState } from "react"

export default function Userimg({value}){
const [index, setIndex] = useState(0)
const Firstletter = value.split('')[0]

const colorarray = ['bg-yellow-300', 'bg-grey-300', 'bg-green-300','bg-red-300']
useEffect(()=> {
    if(index > colorarray.length){
        setIndex(0)
    }
    setIndex(index+1)
},[])
    return (
        <div className= {`w-8 h-8 rounded-full text-center  flex justify-center items-center ${colorarray[index]} `}> {Firstletter}</div>
    )
}