'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { BlogCard } from '@/components/cards/blog-card';
import { blogArticles } from '@/data/blog';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['Sourcing Strategy', 'Metals & Alloys', 'Polymers & Composites', 'Coatings & Chemicals', 'Compliance & Certs', 'Supply Chain Risk'];
  const filteredArticles = selectedCategory
    ? blogArticles.filter((article) => article.category === selectedCategory)
    : blogArticles;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Section className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Materials <span className="gradient-text">Intelligence</span>
          </h1>
          <p className="text-xl text-gray-600">
            Procurement insights, supply chain strategy, and materials expertise for industrial
            teams who need to stay ahead of disruption.
          </p>
        </motion.div>
      </Section>

      {/* Filter Section */}
      <Section className="bg-gray-50 py-12">
        <div className="flex flex-wrap gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === null
                ? 'bg-teal-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-teal-600'
            }`}
          >
            All Articles
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-teal-600'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </Section>

      {/* Articles Grid */}
      <Section className="bg-white py-16">
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <BlogCard {...article} />
            </motion.div>
          ))}
        </motion.div>

        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600">No articles found in this category.</p>
          </motion.div>
        )}
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white text-center py-20">
        <h2 className="text-4xl font-bold mb-6">Get Sourcing Insights by Email</h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Procurement intelligence, supply risk alerts, and materials market updates — delivered
          to your inbox when it matters.
        </p>
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="px-6 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </Section>
    </div>
  );
}
