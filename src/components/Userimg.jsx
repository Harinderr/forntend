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
        <div className= {`w-8 h-8 relative rounded-full text-center  flex justify-center items-center bg-yellow-400 `}> {Firstletter}
    <div className="absolute bg-green-400 w-2 h-2 bottom-0 right-0 rounded full"></div> 
  
        </div>
    )
}