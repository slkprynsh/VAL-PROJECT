'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
}

export function BlogCard({
  id,
  title,
  excerpt,
  date,
  author,
  category,
  image,
  readTime,
}: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-xl border border-gray-200 bg-white hover:shadow-xl transition-all"
    >
      <Link href={`/blog/${id}`}>
        <div className="relative overflow-hidden bg-gray-100 h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-semibold bg-teal-100 text-teal-700 rounded-full">
              {category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{excerpt}</p>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <span>{date}</span>
            <span>{readTime} read</span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-600">{author}</span>
            <ArrowRight
              size={16}
              className="text-teal-600 group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
