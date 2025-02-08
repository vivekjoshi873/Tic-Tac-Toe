import React from 'react'
interface BlockProps{
    value?:string | null
    onClick?:()=>void
}
const Block:React.FC<BlockProps>=({value,onClick})=>{
    return(
        <div className='h-32 w-32 border cursor-pointer border-gray-300 flex items-center justify-center text-4xl font-bold' onClick={onClick}>
            {value}
           
        </div>
    )
}

export default Block
