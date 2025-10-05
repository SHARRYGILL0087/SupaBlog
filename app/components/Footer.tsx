
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-t from-primary/10 to-background border-t border-border mt-10 animate-fade-in-up">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
        {/* Brand & Description */}
        <div className="flex flex-col gap-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-primary animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            <span className="text-xl font-bold tracking-wide text-foreground">SupaBlog</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs">A modern blogging platform built with Next.js & Supabase. Share your stories, connect, and inspire.</p>
          <div className="flex gap-3 mt-2">
            <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.1.99C7.69 9.13 4.07 7.38 1.64 4.77c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.85 1.95 3.63-.72-.02-1.4-.22-1.99-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.12 2.94 3.99 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.69-6.26 11.69-11.69 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z"/></svg></a>
            <a href="#" aria-label="GitHub" className="hover:text-primary transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.7.12 2.5.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.38v4.59h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2 animate-fade-in delay-100">
          <h3 className="text-md font-semibold text-foreground mb-1">Quick Links</h3>
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
          <a href="/about" className="hover:text-primary transition-colors">About</a>
          <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-2 animate-fade-in delay-200">
          <h3 className="text-md font-semibold text-foreground mb-1">Newsletter</h3>
          <p className="text-muted-foreground text-xs mb-2">Get the latest posts and updates right in your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input type="email" placeholder="Your email" className="px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition" />
            <button type="submit" className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition">Subscribe</button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2 animate-fade-in delay-300">
          <h3 className="text-md font-semibold text-foreground mb-1">Contact</h3>
          <span className="text-muted-foreground text-xs">Email: support@supablog.com</span>
          <span className="text-muted-foreground text-xs">Location: Remote, Worldwide</span>
        </div>
      </div>
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 border-t border-border mt-8 animate-fade-in-up">
        <div className="text-xs text-muted-foreground text-center md:text-left">
          © {new Date().getFullYear()} SupaBlog. All rights reserved.
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Animations (add to your global CSS or Tailwind config if not present)
// .animate-fade-in { animation: fadeIn 1s ease; }
// .animate-fade-in-up { animation: fadeInUp 1s ease; }
// .animate-spin-slow { animation: spin 3s linear infinite; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
