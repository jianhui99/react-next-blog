import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'

const Header = () => {
    return (
        <div className="py-5 px-5 md:px-12 lg:px-28">
            <div className="flex justify-between items-center">
                <a href="/">
                    <Image
                        src={assets.logo}
                        width={150}
                        alt="Logo"
                        className="w-32 sm:w-40 md:w-48 lg:w-auto max-w-[180px]"
                    />
                </a>

                <button className="flex items-center gap-1.5 font-normal py-1.5 px-3 sm:py-2 sm:px-4 border border-solid border-black shadow-[-7px_7px_0px_#000000] transition-all duration-300 ease-in-out hover:shadow-[-3px_3px_0px_#000000] hover:translate-x-[-4px] hover:translate-y-[4px] active:shadow-none active:translate-x-0 active:translate-y-0 rounded-md bg-white text-black text-sm">
                    Get started
                    <Image src={assets.arrow} alt="Arrow" width={16} height={16} />
                </button>
            </div>
        </div>
    )
}

export default Header