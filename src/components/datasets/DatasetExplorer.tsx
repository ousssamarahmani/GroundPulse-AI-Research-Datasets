import React, { useState } from 'react';
import { MOCK_REPOSITORY_TREE } from '../../data/mockRepository';
import { RepoFileNode } from '../../types/repository';
import { Folder, FileText, ChevronRight, ChevronDown, Copy, Check, Download, GitBranch, Database, ShieldCheck } from 'lucide-react';

export const DatasetExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<RepoFileNode>(
    MOCK_REPOSITORY_TREE.children?.find(c => c.name === 'README.md') || MOCK_REPOSITORY_TREE
  );
  const [expandedPaths, setExpandedPaths] = useState<Record<string, boolean>>({
    'groundpulse-datasets': true,
    'groundpulse-datasets/datasets': true,
    'groundpulse-datasets/datasets/samples': true,
    'groundpulse-datasets/schemas': true,
    'groundpulse-datasets/generator': true,
    'groundpulse-datasets/notebooks': true,
    'groundpulse-datasets/examples': true,
    'groundpulse-datasets/docs': true,
  });
  const [copied, setCopied] = useState(false);

  const toggleFolder = (path: string) => {
    setExpandedPaths(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const handleCopy = () => {
    if (selectedFile.content) {
      navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!selectedFile.content) return;
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render Tree Recursive Component
  const renderTree = (node: RepoFileNode, depth: number = 0) => {
    const isDir = node.type === 'directory';
    const isExpanded = expandedPaths[node.path];
    const isSelected = selectedFile.path === node.path;

    return (
      <div key={node.path} className="font-mono text-xs">
        <div
          onClick={() => {
            if (isDir) {
              toggleFolder(node.path);
            } else {
              setSelectedFile(node);
            }
          }}
          style={{ paddingLeft: `${depth * 14 + 10}px` }}
          className={`flex items-center gap-2 py-1.5 pr-3 cursor-pointer select-none transition-colors border-l-2 ${
            isSelected
              ? 'bg-zinc-900 border-white text-white font-bold'
              : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-950'
          }`}
        >
          {isDir ? (
            <>
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
              <Folder className="w-3.5 h-3.5 text-zinc-300" />
            </>
          ) : (
            <>
              <span className="w-3.5 h-3.5 inline-block" />
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
            </>
          )}

          <span className="truncate">{node.name}</span>
        </div>

        {isDir && isExpanded && node.children && (
          <div>
            {node.children.map((child) => renderTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 py-8 bg-black text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="text-xs text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-zinc-300" />
            <span>Public Open Dataset Repository</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
            groundpulse-datasets / Repository Structure
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-mono">
            License: Apache 2.0 / CC BY 4.0
          </div>
        </div>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border border-zinc-800 bg-zinc-950">
        
        {/* Left Column: File Tree (1 Col) */}
        <div className="border-r border-zinc-800 p-4 space-y-3 bg-black">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-900 text-xs text-zinc-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-zinc-400" />
              <span>File Explorer</span>
            </span>
            <span>v1.0.4</span>
          </div>

          <div className="py-2 overflow-y-auto max-h-[600px] no-scrollbar">
            {renderTree(MOCK_REPOSITORY_TREE)}
          </div>
        </div>

        {/* Right Column: File Content & Schema Preview (2 Cols) */}
        <div className="lg:col-span-2 p-6 space-y-4 bg-zinc-950">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
            <div>
              <span className="text-xs text-zinc-500 font-mono block">Selected File Path:</span>
              <span className="text-sm font-bold text-white font-mono">{selectedFile.path}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-black border border-zinc-700 hover:border-white text-xs text-white font-mono flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:border-white text-xs text-white font-mono flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-zinc-400" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {selectedFile.description && (
            <div className="p-3 bg-black border border-zinc-900 text-xs text-zinc-300 font-mono">
              <span className="text-zinc-500 block text-[10px] uppercase">File Description:</span>
              {selectedFile.description}
            </div>
          )}

          {/* Preview Window */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase text-zinc-500 block">Content Preview ({selectedFile.language || 'text'}):</span>
            <pre className="p-4 bg-black border border-zinc-800 text-zinc-200 font-mono text-xs overflow-x-auto max-h-[480px] leading-relaxed select-text">
              {selectedFile.content || `[Directory ${selectedFile.name} containing subfiles]` }
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
};
