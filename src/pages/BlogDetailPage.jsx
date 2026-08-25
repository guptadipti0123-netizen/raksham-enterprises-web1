import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_POSTS, COMPANY_INFO } from '../data/websiteData';
import { BookOpen, Clock, ArrowRight, ChevronRight, Share2, Phone, MessageSquare } from 'lucide-react';

export default function BlogDetailPage({ onOpenQuote }) {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 4);

  return (
    <div className="bg-white pt-28 pb-20">
      
      {/* Header & Breadcrumb */}
      <section className="bg-slate-50 py-10 md:py-14 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-gold-700">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/blog" className="hover:text-gold-700">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900 font-semibold truncate">{post.title}</span>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3 text-xs">
              <span className="font-bold text-gold-800 bg-gold-50 px-2.5 py-0.5 rounded-md border border-gold-200">
                {post.category}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">{post.date}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              {post.title}
            </h1>
          </div>

        </div>
      </section>

      {/* Article Body */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-6">
            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-gold-500 text-slate-800 font-medium italic">
              "{post.excerpt}"
            </div>

            <div className="space-y-4 whitespace-pre-line">
              {post.content}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-slate-900 text-white space-y-3 not-prose">
              <h3 className="text-base font-bold text-white">Need Professional CCTV Installation or AMC in Mumbai?</h3>
              <p className="text-xs text-slate-300">
                Raksham Enterprises provides free site surveys and transparent itemized quotations.
              </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={onOpenQuote}
                    className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs shadow-gold-soft transition-all"
                  >
                    Book Free Site Survey
                  </button>
                  <Link
                    to="/contact"
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
                  >
                    Contact Security Expert
                  </Link>
                </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-6 uppercase tracking-wider">
              More CCTV & Surveillance Guides:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-gold-50 border border-slate-200 hover:border-gold-300 transition-all block space-y-1"
                >
                  <span className="text-[10px] font-bold text-gold-700 uppercase">{rel.category}</span>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{rel.title}</h4>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
