import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'

const Header = () => {
    return (
        <div className='py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Image
                    src={assets.logo}
                    width={180}
                    height={40}
                    alt='Logo'
                    className='w-32 sm:w-40 md:w-48 lg:w-auto max-w-[180px]'
                />

                <button className='flex items-center gap-1.5 font-normal py-1.5 px-3 sm:py-2 sm:px-4 border border-solid border-black shadow-[-7px_7px_0px_#000000] transition-all duration-300 ease-in-out hover:shadow-[-3px_3px_0px_#000000] hover:translate-x-[-4px] hover:translate-y-[4px] active:shadow-none active:translate-x-0 active:translate-y-0 rounded-md bg-white text-black text-sm'>
                    Get started
                    <Image
                        src={assets.arrow}
                        alt='Arrow'
                        width={16}
                        height={16}
                    />
                </button>
            </div>

            <div className='text-center my-8'>
                <h1 className='text-2xl sm:text-5xl font-medium'>
                    Latest Blogs
                </h1>
                <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ipsum corrupti quaerat recusandae unde doloremque, voluptatum magnam adipisci dolorem repellat.</p>
                <form action="" className='flex justify-between max-w-[500px] rounded-md scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]'>
                    <input type="email" placeholder='Enter your email' className='pl-4 outline-none'/>
                    <button type='submit' className='border-1 border-black py-4 px-4 sm:px-8 active:bg-stone-800 active:text-white'>Subscribe</button>
                </form>
            </div>
        </div>
    )
}

export default Header