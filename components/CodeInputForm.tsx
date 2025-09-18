import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';
import { EXAMPLES } from '../examples';

interface CodeInputFormProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  onReview: () => void;
  isLoading: boolean;
}

const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293z" clipRule="evenodd" />
    </svg>
);

const DocumentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const CodeInputForm: React.FC<CodeInputFormProps> = ({ code, setCode, language, setLanguage, onReview, isLoading }) => {
  const handleLoadExample = () => {
    const exampleCode = EXAMPLES[language];
    if (exampleCode) {
      setCode(exampleCode);
    } else {
      setCode(`// Sorry, no example is available for ${language} yet.`);
    }
  };
    
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={handleLoadExample}
          className="flex items-center text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-2 px-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
        >
            <DocumentIcon />
            Load Example
        </button>
        <div className="flex items-center gap-2">
            <label htmlFor="language-select" className="text-sm font-medium text-slate-300">
            Language
            </label>
            <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-auto p-2"
            >
            {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                {lang.label}
                </option>
            ))}
            </select>
        </div>
      </div>
      <div className="flex-grow flex flex-col bg-slate-800 rounded-lg border border-slate-700 shadow-lg">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`// Paste your ${language} code here...`}
          className="w-full flex-grow p-4 bg-transparent text-slate-200 font-mono text-sm resize-none focus:outline-none"
          spellCheck="false"
        />
        <div className="p-3 bg-slate-800/50 border-t border-slate-700 rounded-b-lg">
            <button
                onClick={onReview}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500"
            >
                {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                </>
                ) : (
                <>
                    <SparkleIcon/>
                    Review Code
                </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default CodeInputForm;