export type TaskPhase = 
  | 'Phase 1 — Research Foundation'
  | 'Phase 2 — Baseline Analytics'
  | 'Phase 3 — Research Dashboard'
  | 'Phase 4 — AWS Baseline'
  | 'Phase 5 — Future Research';

export type TaskStatus = 'NOT_STARTED' | 'PLANNED' | 'IN_PROGRESS' | 'BASELINE_COMPLETE' | 'RESEARCH_VALIDATED';

export interface ResearchTask {
  id: string;
  title: string;
  phase: TaskPhase;
  status: TaskStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  complexity: 'S' | 'M' | 'L' | 'XL';
  dependencies: string[];
  related_files: string[];
  definition_of_done: string;
  description: string;
}
