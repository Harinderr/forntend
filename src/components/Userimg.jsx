import { useEffect, useState } from "react"

export default function Userimg({value,id ,status}){
 
  const firstLetter = value.split('')[0]
  const colorArray = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500"]




    return (
      
        <div key={id} className= {`w-8 h-8 relative rounded-full text-center  flex justify-center items-center bg-yellow-500`}> {firstLetter}
 { status === "online" ? <div className="absolute bg-green-400 w-2 h-2 bottom-0 right-0 rounded full"></div> : <div className="absolute bg-red-400 w-2 h-2 bottom-0 right-0 rounded full"></div>  } 
  
        </div>
    )
}