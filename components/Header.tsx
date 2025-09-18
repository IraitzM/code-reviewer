
import React from 'react';

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="flex items-center space-x-4">
      <CodeIcon />
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">AI Code Reviewer</h1>
        <p className="text-slate-400 text-sm sm:text-base">Get instant feedback on your code from Gemini.</p>
      </div>
    </header>
  );
};

export default Header;
