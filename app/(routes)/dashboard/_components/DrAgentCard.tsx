import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
export type doctorAgent = {
    id:number,
    name: string,
    specialist: string,
    image:string,
    agentPrompt:string,
    description:string
}
const DrAgentCard = ({doctor}: {doctor:doctorAgent}) => {
  return (
    <div className=''>
        <Image src={doctor.image} alt={doctor.specialist} width={200} height={300} 
        className='w-full h-[250px] object-cover rounded-xl shadow-2xl'/>
     
        <h2 className='font-bold mt-1'>{doctor.specialist}</h2>
        <p className='text-sm'>{doctor.description}</p>
        <Button className='w-full mt-2'>Start Consultation <IconArrowRight /></Button>

    </div>
  )
}

export default DrAgentCard