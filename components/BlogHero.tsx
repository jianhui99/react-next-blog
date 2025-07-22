import React from 'react'

const BlogHero = () => {
  return (
    <div className="text-center my-8 px-5 md:px-12 lg:px-28">
      <h1 className="text-2xl sm:text-5xl font-medium">Latest Blogs</h1>
      <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        ipsum corrupti quaerat recusandae unde doloremque, voluptatum magnam
        adipisci dolorem repellat.
      </p>
      <form
        action=""
        className="flex justify-between max-w-[500px] rounded-md scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="pl-4 outline-none"
        />
        <button
          type="submit"
          className="border-1 border-black py-4 px-4 sm:px-8 active:bg-stone-800 active:text-white"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default BlogHero
