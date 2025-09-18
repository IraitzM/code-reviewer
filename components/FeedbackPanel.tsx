
import React from 'react';

interface FeedbackPanelProps {
  feedback: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-6 bg-slate-700 rounded w-1/4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-slate-700 rounded w-5/6"></div>
      <div className="h-4 bg-slate-700 rounded w-3/4"></div>
    </div>
    <div className="h-6 bg-slate-700 rounded w-1/3 mt-6"></div>
    <div className="space-y-2">
      <div className="h-4 bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-slate-700 rounded w-1/2"></div>
    </div>
  </div>
);

const InitialState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 className="text-xl font-semibold text-slate-400">Awaiting Your Code</h3>
        <p className="mt-1 max-w-sm">Paste your code on the left, select the language, and click "Review Code" to get AI-powered feedback.</p>
    </div>
);

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ feedback, isLoading, error }) => {
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-lg p-6 h-full min-h-[500px] lg:min-h-0 overflow-y-auto">
      {isLoading && <LoadingSkeleton />}
      {!isLoading && error && (
        <div className="text-red-400 bg-red-900/30 border border-red-500/50 p-4 rounded-md">
          <h3 className="font-bold">Error</h3>
          <p>{error}</p>
        </div>
      )}
      {!isLoading && !error && !feedback && <InitialState />}
      {!isLoading && !error && feedback && (
        <div 
          className="prose prose-invert prose-sm sm:prose-base max-w-none prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700 prose-headings:text-cyan-400"
          dangerouslySetInnerHTML={{ __html: feedback.replace(/```(\w*)\n([\s\S]*?)\n```/g, '<pre><code>$2</code></pre>').replace(/\n/g, '<br />') }}
        >
        </div>
      )}
    </div>
  );
};

// A slightly improved rendering logic for markdown using simple replacements.
// Note: This is a basic implementation and doesn't cover all markdown features.
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const formattedContent = content
      // Headings
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3 border-b border-slate-700 pb-2 text-cyan-400">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-white">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Lists (simple)
      .replace(/^\s*[-*] (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
      // Code blocks. The outer pre should have the bg color.
      .replace(/```(\w*)\n([\s\S]*?)\n```/gim, '<pre class="bg-slate-900 border border-slate-700 rounded-md p-4 my-4 overflow-x-auto"><code class="language-$1">$2</code></pre>')
      // Inline code
      .replace(/`(.*?)`/gim, '<code class="bg-slate-700 text-cyan-300 rounded-sm px-1.5 py-0.5 font-mono text-sm">$1</code>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="my-4">')
      .replace(/\n/g, '<br />');

    return (
        <div className="prose prose-invert prose-sm sm:prose-base max-w-none"
             dangerouslySetInnerHTML={{ __html: `<p>${formattedContent}</p>` }}>
        </div>
    );
};


const BetterFeedbackPanel: React.FC<FeedbackPanelProps> = ({ feedback, isLoading, error }) => {
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-lg p-6 h-full min-h-[500px] lg:min-h-0 overflow-y-auto custom-scrollbar">
      {isLoading && <LoadingSkeleton />}
      {!isLoading && error && (
        <div className="flex items-center text-red-400 bg-red-900/20 border border-red-800/50 p-4 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-bold">An Error Occurred</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}
      {!isLoading && !error && !feedback && <InitialState />}
      {!isLoading && !error && feedback && <MarkdownRenderer content={feedback} />}
    </div>
  );
};

export default BetterFeedbackPanel;
