import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/websiteData';
import { BookOpen, Clock, ArrowRight, Calendar, Sparkles } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="bg-white pt-28 pb-20">
      
      {/* Header */}
      <section className="bg-slate-50 py-12 md:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-semibold">
            <BookOpen className="w-4 h-4 text-gold-600" />
            <span>Surveillance Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
            Security & CCTV <span className="text-gradient-gold">Insights</span>
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Helpful guides, pricing breakdowns, AMC checklists, and surveillance engineering insights for Mumbai property owners.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <div
                key={post.slug}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-gold-300 hover:shadow-soft transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gold-800 bg-gold-50 px-2.5 py-0.5 rounded-md border border-gold-200">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-base font-bold text-slate-900 group-hover:text-gold-700 transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-400 text-[11px]">{post.date}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="font-bold text-gold-700 hover:text-gold-800 flex items-center space-x-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
