// src/utils.ts - Utility functions

import { COLORS, DEFAULT_CONFIG } from './constants';
import { ArrayElement } from './types';

/**
 * Generate a random array of elements
 */
export const generateRandomArray = (size: number): ArrayElement[] => {
	const array: ArrayElement[] = [];
	for (let i = 0; i < size; i++) {
		array.push({
			value: Math.floor(Math.random() * (DEFAULT_CONFIG.MAX_VALUE - DEFAULT_CONFIG.MIN_VALUE + 1)) + DEFAULT_CONFIG.MIN_VALUE,
			color: COLORS.UNSORTED,
		});
	}
	return array;
};

/**
 * Calculate delay for animation based on speed setting
 */
export const calculateDelay = (speed: number): number => {
	return 1000 - speed * 9;
};
