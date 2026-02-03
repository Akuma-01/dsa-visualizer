// src/constants.ts - Shared constants and configurations

// src/constants.ts - Shared constants and configurations
import type { ColorLegendItem } from './types';

// Color constants for visualization
export const COLORS = {
	UNSORTED: '#1e293b',
	COMPARING: '#ef4444',
	SWAPPING: '#f59e0b',
	SORTED: '#22c55e',
	PIVOT: '#8b5cf6',
	SELECTED: '#06b6d4',
} as const;

// Base color legend (common to all algorithms)
export const BASE_COLOR_LEGEND: ColorLegendItem[] = [
	{
		color: COLORS.UNSORTED,
		label: 'Unsorted',
		description: 'Elements not yet sorted',
	},
	{
		color: COLORS.COMPARING,
		label: 'Comparing',
		description: 'Elements being compared',
	},
	{
		color: COLORS.SWAPPING,
		label: 'Swapping',
		description: 'Elements being swapped',
	},
	{
		color: COLORS.SORTED,
		label: 'Sorted',
		description: 'Elements in final position',
	},
];

// Additional color legend items for specific algorithms
export const PIVOT_COLOR_LEGEND: ColorLegendItem = {
	color: COLORS.PIVOT,
	label: 'Pivot',
	description: 'Pivot element',
};

export const SELECTED_COLOR_LEGEND: ColorLegendItem = {
	color: COLORS.SELECTED,
	label: 'Selected',
	description: 'Currently selected element',
};

// Default configuration
export const DEFAULT_CONFIG = {
	MIN_ARRAY_SIZE: 5,
	MAX_ARRAY_SIZE: 50,
	DEFAULT_ARRAY_SIZE: 10,
	MIN_VALUE: 10,
	MAX_VALUE: 100,
	DEFAULT_SPEED: 100,
	MIN_SPEED: 1,
	MAX_SPEED: 100,
} as const;
