import React from 'react';
import { Github, Laptop2Icon, Linkedin, Twitter, Mail, Globe2 } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-border/40 bg-gradient-to-b from-background via-background to-muted/30">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(59,130,246,0.07),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.07),transparent_60%)]" />

      <div className="relative container mx-auto px-6 py-14">
        <div className="grid gap-10 md:gap-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 tracking-tight">AutoValue</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Data‑driven car price intelligence with instant, dual‑model insight.
            </p>
          </div>

            {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide text-foreground/90">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {/*
                { href: '#home', label: 'Home' },
                { href: '#about', label: 'About' },
                { href: '#how-it-works', label: 'How It Works' },
              */}
              <li key="#home">
                  <a href="#home" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    Home
                  </a>
                </li>
                <li key="#about">
                  <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    About
                  </a>
                </li>
                <li key="#how-it-works">
                  <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    How It Works
                  </a>
                </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide text-foreground/90">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:zakisaed39@gmail.com" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" /> Email
                </a>
              </li>
              <li>
                <a href="https://zakariasaid.dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Globe2 className="h-4 w-4" /> Portfolio
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide text-foreground/90">Social</h3>
            <div className="flex gap-4">
              <a href="https://github.com/Zakariast578" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/zakaria-said-zs55" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://zakariasaid.dev" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Laptop2Icon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border/40 pt-6 text-xs text-muted-foreground">
          <p>© {year} zakariasaid. All rights reserved.</p>
          <p className="inline-flex gap-1">Built with <span className="text-primary">FastAPI</span> + <span className="text-primary">React</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
