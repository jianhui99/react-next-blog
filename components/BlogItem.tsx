import React from 'react';
import Image from 'next/image';
import { BlogData } from '@/assets/assets';
import { useRouter } from 'next/navigation';

type BlogItemProps = BlogData;

const BlogItem = ({ title, description, category, image, slug }: BlogItemProps) => {
    const router = useRouter();

    const handleReadMore = () => {
        router.push(`/blog/${slug}`);
    };

    return (
        <div className='bg-white border border-black rounded-md overflow-hidden hover:shadow-[-7px_7px_0px_#000000] transition-shadow duration-200'>
            <Image
                src={image}
                alt={title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <span className="text-xs bg-black text-white px-2 py-1 rounded-md">{category}</span>
                <h2 className="text-lg font-semibold mt-2">{title}</h2>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
                <button className="mt-4 text-sm font-medium text-black hover:underline cursor-pointer" onClick={handleReadMore}>Read more →</button>

            </div>
        </div>
    );
};

export default BlogItem;
