'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/animations/reveal';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const articles = [
  {
    id: 1,
    title: 'Why Alloy Lead Times Are Spiking — And What to Do Now',
    excerpt: 'Supply constraints on specialty alloys are tightening across key industrial markets. Here\'s what procurement teams need to know and act on.',
    category: 'Sourcing Strategy',
    readTime: '8 min',
    date: '2024-05-15',
    author: 'Priya Nair',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Composite vs. Metal: Choosing the Right Material for Structural Load Applications',
    excerpt: 'A practical engineering and procurement guide to making the right call between composites and metals when structural performance is non-negotiable.',
    category: 'Metals & Alloys',
    readTime: '6 min',
    date: '2024-05-10',
    author: 'Thomas Brecker',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'The Hidden Cost of Spec Non-Compliance in Manufacturing Procurement',
    excerpt: 'When materials arrive out of spec, the cost isn\'t just the return — it\'s the line stoppage, the rework, and the audit trail you didn\'t have.',
    category: 'Compliance & Certs',
    readTime: '10 min',
    date: '2024-05-05',
    author: 'Ayaan Mehta',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
  },
];

export function SolutionsSection() {
  return (
    <section className="bg-white py-20" id="solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#17A2B8] mb-2">
              INDUSTRY KNOWLEDGE
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50]">
              Technical Insights
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              href="/about"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[#17A2B8] hover:text-[#0D7A8C] transition-colors group"
            >
              View All Articles
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Article cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <Reveal key={article.id} delay={idx * 0.1}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#D1F2F7] hover:shadow-md transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#2C3E50] to-[#17A2B8] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-[#17A2B8] text-white text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs text-[#6B7280]">
                    <span>{article.readTime} read</span>
                    <span>·</span>
                    <span>
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#2C3E50] mb-2 leading-snug group-hover:text-[#17A2B8] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <div className="w-6 h-6 rounded-full bg-[#E6F7FA] flex items-center justify-center text-[#17A2B8] font-bold shrink-0">
                      {article.author.charAt(0)}
                    </div>
                    <span>{article.author}</span>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="text-center mt-8 md:hidden">
          <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-[#17A2B8]">
            View All Articles <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
