export interface WorktreeInfo {
  path: string;
  locked: boolean;
  prunable: boolean;
  isAccessible?: boolean;
}

export interface BranchInfo {
  name: string;
  type: "local" | "remote";
  branchType: "feature" | "hotfix" | "release" | "main" | "develop" | "other";
  isCurrent: boolean;
  description?: string;
  worktree?: WorktreeInfo;
}

export interface BranchChoice {
  name: string;
  value: string;
  description?: string;
  disabled?: boolean | string;
}

export interface EnhancedBranchChoice extends BranchChoice {
  hasWorktree: boolean;
  worktreePath?: string;
  branchType: BranchInfo["branchType"];
  branchDataType: "local" | "remote";
  isCurrent: boolean;
}

export type BranchType =
  | "feature"
  | "hotfix"
  | "release"
  | "main"
  | "develop"
  | "other";

export interface NewBranchConfig {
  type: BranchType;
  taskName: string;
  branchName: string;
}

export interface WorktreeConfig {
  branchName: string;
  worktreePath: string;
  repoRoot: string;
  isNewBranch: boolean;
  baseBranch: string;
}

export interface CleanupResult {
  hasChanges: boolean;
  committed: boolean;
  pushed: boolean;
  worktreeRemoved: boolean;
}

export interface BranchGroup {
  title: string;
  branches: EnhancedBranchChoice[];
  priority: number;
}

export interface UIFilter {
  showWithWorktree: boolean;
  showWithoutWorktree: boolean;
  branchTypes: BranchInfo["branchType"][];
  showLocal: boolean;
  showRemote: boolean;
}

export interface PullRequest {
  number: number;
  title: string;
  state: "OPEN" | "CLOSED" | "MERGED";
  branch: string;
  mergedAt: string | null;
  author: string;
}

export interface MergedPullRequest {
  number: number;
  title: string;
  branch: string;
  mergedAt: string;
  author: string;
}

export interface WorktreeWithPR {
  worktreePath: string;
  branch: string;
  pullRequest: PullRequest | null;
}

export interface CleanupTarget {
  worktreePath: string | null; // null for local branch only cleanup
  branch: string;
  pullRequest: MergedPullRequest;
  hasUncommittedChanges: boolean;
  hasUnpushedCommits: boolean;
  cleanupType: "worktree-and-branch" | "branch-only";
  hasRemoteBranch?: boolean;
  isAccessible?: boolean;
  invalidReason?: string;
}

export interface GitHubPRAuthor {
  id?: string;
  is_bot?: boolean;
  login?: string;
  name?: string;
}

export interface GitHubPRResponse {
  number: number;
  title: string;
  state: string;
  headRefName: string;
  mergedAt: string | null;
  author: GitHubPRAuthor | null;
}

// ========================================
// Ink.js UI Types (Phase 2+)
// ========================================

/**
 * Screen types for Ink.js UI
 */
export type ScreenType =
  | "branch-list"
  | "worktree-manager"
  | "branch-creator"
  | "pr-cleanup"
  | "ai-tool-selector"
  | "session-selector"
  | "execution-mode-selector"
  | "batch-merge-progress"
  | "batch-merge-result";

export type ScreenState = "active" | "hidden";

export interface Screen {
  type: ScreenType;
  state: ScreenState;
  data?: unknown;
}

/**
 * BranchItem - Extended BranchInfo for display purposes
 */
export type WorktreeStatus = "active" | "inaccessible" | undefined;

export interface BranchItem extends BranchInfo {
  // Display properties
  icons: string[];
  worktreeStatus?: WorktreeStatus;
  hasChanges: boolean;
  label: string;
  value: string;
}

/**
 * Statistics - Real-time statistics
 */
export interface Statistics {
  localCount: number;
  remoteCount: number;
  worktreeCount: number;
  changesCount: number;
  lastUpdated: Date;
}

/**
 * Layout - Dynamic layout information
 */
export interface Layout {
  terminalHeight: number;
  terminalWidth: number;
  headerLines: number;
  footerLines: number;
  contentHeight: number;
}

// ========================================
// Batch Merge Types (SPEC-ee33ca26)
// ========================================

/**
 * BatchMergeConfig - Configuration for batch merge execution
 * @see specs/SPEC-ee33ca26/data-model.md
 */
export interface BatchMergeConfig {
  sourceBranch: string;
  targetBranches: string[];
  dryRun: boolean;
  autoPush: boolean;
  remote?: string; // default: "origin"
}

/**
 * MergePhase - Current phase of merge operation
 * @see specs/SPEC-ee33ca26/data-model.md
 */
export type MergePhase = "fetch" | "worktree" | "merge" | "push" | "cleanup";

/**
 * BatchMergeProgress - Real-time progress information
 * @see specs/SPEC-ee33ca26/data-model.md
 */
export interface BatchMergeProgress {
  currentBranch: string;
  currentIndex: number;
  totalBranches: number;
  percentage: number; // 0-100
  elapsedSeconds: number;
  estimatedRemainingSeconds?: number;
  currentPhase: MergePhase;
}

/**
 * MergeStatus - Status of individual branch merge
 * @see specs/SPEC-ee33ca26/data-model.md
 */
export type MergeStatus = "success" | "skipped" | "failed";

/**
 * PushStatus - Status of push operation
 * @see specs/SPEC-ee33ca26/data-model.md
 */
export type PushStatus = "success" | "failed" | "not_executed";

/**
 * BranchMergeStatus - Individual branch merge result
 * @see specs/SPEC-ee33ca26/data-model.md
 */
export interface BranchMergeStatus {
  branchName: string;
  status: MergeStatus;
  error?: string;
  conflictFiles?: string[];
  pushStatus?: PushStatus;
  worktreeCreated: boolean;
  durationSeconds: number;
}

/**
 * BatchMergeSummary - Summary statistics
 * @see specs/SPEC-ee33ca26/data-model.md
 */
export interface BatchMergeSummary {
  totalCount: number;
  successCount: number;
  skippedCount: number;
  failedCount: number;
  pushedCount: number;
  pushFailedCount: number;
}

/**
 * BatchMergeResult - Final batch merge result
 * @see specs/SPEC-ee33ca26/data-model.md
 */
export interface BatchMergeResult {
  statuses: BranchMergeStatus[];
  summary: BatchMergeSummary;
  totalDurationSeconds: number;
  cancelled: boolean;
  config: BatchMergeConfig;
}
