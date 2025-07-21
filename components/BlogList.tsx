import React, { useState } from 'react';
import { blog_data } from '@/assets/assets';
import BlogItem from './BlogItem';
import { slugify } from '@/utils/slugify';

const categories = ['All', 'Technology', 'Startup', 'Lifestyle'];

const BlogList = () => {
  const [menu, setMenu] = useState('All');

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      {/* category filter */}
      <div className="flex gap-4 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setMenu(cat)}
            className={`py-1 px-4 rounded-md border transition-all duration-200 ${menu === cat
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* blog card */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {blog_data
          .filter((item) => menu === 'All' || item.category === menu)
          .map((item, index) => (
            <BlogItem key={index} {...item} slug={slugify(item.title)} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
