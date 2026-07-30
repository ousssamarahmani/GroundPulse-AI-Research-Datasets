export interface RepoFileNode {
  path: string;
  name: string;
  type: 'file' | 'directory';
  children?: RepoFileNode[];
  content?: string;
  language?: 'json' | 'yaml' | 'python' | 'markdown' | 'csv' | 'text' | 'cff';
  description?: string;
}
