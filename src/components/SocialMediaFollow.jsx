import React from 'react';
import { SOCIAL_MEDIA_LINKS } from '../data/websiteData';

export default function SocialMediaFollow({ className = "py-10 bg-slate-100 border-t border-b border-slate-200" }) {
  return (
    <section className={`text-center ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Title matching user uploaded design */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
          Follow Us On Social Media
        </h3>

        {/* Circular Dark Icons Grid matching image 1 */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          
          {/* 1. Instagram */}
          <a
            href="https://www.instagram.com/rakshamenterprises/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow Raksham on Instagram"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#262626] hover:bg-[#E1306C] text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 group"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          {/* 2. LinkedIn */}
          <a
            href="https://www.linkedin.com/company/raksham-enterprises/"
            target="_blank"
            rel="noopener noreferrer"
            title="Connect on LinkedIn"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#262626] hover:bg-[#0A66C2] text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 group"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          {/* 3. Facebook */}
          <a
            href="https://www.facebook.com/raksham.group/"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow Raksham on Facebook"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#262626] hover:bg-[#1877F2] text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 group"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>

          {/* 4. YouTube */}
          <a
            href="https://www.youtube.com/@rakshamenterprises"
            target="_blank"
            rel="noopener noreferrer"
            title="Subscribe on YouTube"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#262626] hover:bg-[#FF0000] text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 group"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>

          {/* 5. X (formerly Twitter) */}
          <a
            href="https://x.com/Rakshament"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow on X (Twitter)"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#262626] hover:bg-black text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 group"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* 6. Email Support */}
          <a
            href="mailto:Support@raksham.com"
            title="Send Email to Support@raksham.com"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#262626] hover:bg-amber-600 text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 group"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </a>

        </div>

        <p className="text-xs text-slate-500 font-medium">
          Official social channels & customer support desk: <a href="mailto:Support@raksham.com" className="text-gold-700 hover:underline font-bold">Support@raksham.com</a>
        </p>

      </div>
    </section>
  );
}
