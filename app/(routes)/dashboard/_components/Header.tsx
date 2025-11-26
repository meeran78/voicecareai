import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
    const menuOptions=[
        {
            id:1,name:'Home',path:"/home"
        },
            {
                id:2,name:'History',path:"/history"
            },
            {
                id:3,name:'Pricing',path:"/pricing"
            },
            {
                id:4,name:'Profile',path:"/profile"
            },
    ]
  return (
    <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40 xl:60'>
        <Image src={'/logo.svg'} alt="logo" width={60} height={30}/>
        <div className='hidden md:flex gap-12 items-center '>
            {menuOptions.map((option, index)=>(
                <div key={index} className='cursor-pointer'>
                    <h2 className='hover:font-bold transition-all duration-300'>{option.name}</h2>
                </div>
            ))}
        </div>
        <UserButton />
    </div>
  )
}

export default Header