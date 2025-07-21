import { blog_data } from '@/assets/assets';
import { slugify } from '@/utils/slugify';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blog_data.map((item) => ({
    slug: slugify(item.title),
  }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = blog_data.find((item) => slugify(item.title) === slug);

  if (!blog) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-2">{blog.category}</p>
      <Image src={blog.image} alt={blog.title} className="w-full rounded mb-6" />
      <p className="text-lg leading-relaxed">{blog.description}</p>
    </div>
  );
}