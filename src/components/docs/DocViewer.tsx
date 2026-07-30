import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2, Copy, Download, BookOpen } from 'lucide-react';
import { MOCK_REPOSITORY_TREE } from '../../data/mockRepository';

export const DocViewer: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<string>('README.md');
  const [copied, setCopied] = useState(false);

  const docFiles = [
    { name: 'README.md', title: 'Research Overview & Quickstart' },
    { name: 'LICENSE', title: 'Apache License 2.0 (Code)' },
    { name: 'DATA_LICENSE.md', title: 'CC BY 4.0 (Synthetic Data)' },
    { name: 'CITATION.cff', title: 'Citation Metadata' },
    { name: 'CONTRIBUTING.md', title: 'Contribution Rules' },
    { name: 'SECURITY.md', title: 'Security & Credential Rules' },
    { name: 'limitations.md', title: 'Research Limitations' },
  ];

  const currentFileNode = MOCK_REPOSITORY_TREE.children?.find(c => c.name === activeDoc);

  const handleCopy = () => {
    if (currentFileNode?.content) {
      navigator.clipboard.writeText(currentFileNode.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 py-8 bg-black text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
            <span>Public Research Repository Documentation</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
            Licenses, Citations & Limitations
          </h2>
        </div>
      </div>

      {/* Main Grid: Sidebar + Document Render */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Tabs */}
        <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-2">
          <span className="text-[10px] text-zinc-500 uppercase block pb-2 border-b border-zinc-900 font-bold">
            Select Document File:
          </span>

          <div className="space-y-1">
            {docFiles.map((doc) => (
              <button
                key={doc.name}
                onClick={() => setActiveDoc(doc.name)}
                className={`w-full text-left px-3 py-2 text-xs font-mono flex items-center gap-2 border transition-all ${
                  activeDoc === doc.name
                    ? 'border-white bg-zinc-900 text-white font-bold'
                    : 'border-transparent text-zinc-400 hover:text-white hover:bg-black'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span className="truncate">{doc.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Document Content View */}
        <div className="lg:col-span-3 p-6 bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <span className="text-xs text-zinc-500 uppercase block">Selected File:</span>
              <h3 className="text-base font-bold text-white font-mono">{activeDoc}</h3>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-black border border-zinc-700 hover:border-white text-xs text-white font-mono flex items-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
              <span>{copied ? 'Copied' : 'Copy Raw Text'}</span>
            </button>
          </div>

          <pre className="p-5 bg-black border border-zinc-800 text-zinc-200 text-xs overflow-x-auto leading-relaxed max-h-[600px] whitespace-pre-wrap select-text">
            {currentFileNode?.content || 'Loading document...'}
          </pre>
        </div>

      </div>

    </div>
  );
};
