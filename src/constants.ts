// Color constants for visualization
export const COLORS = {
	UNSORTED: '#64748b',  // slate-500 — visible against dark bg, clearly "neutral"
	COMPARING: '#ef4444',
	SWAPPING: '#f59e0b',
	SORTED: '#22c55e',
	PIVOT: '#8b5cf6',
	SELECTED: '#06b6d4',
	WRITING: '#eab308',
	MERGED: '#10b981',
} as const;

// Default configuration
export const DEFAULT_CONFIG = {
	MIN_ARRAY_SIZE: 5,
	MAX_ARRAY_SIZE: 50,
	DEFAULT_ARRAY_SIZE: 10,
	MIN_VALUE: 10,
	MAX_VALUE: 100,
	DEFAULT_SPEED: 50,
	MIN_SPEED: 1,
	MAX_SPEED: 100,
} as const;
