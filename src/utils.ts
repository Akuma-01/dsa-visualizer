import { COLORS, DEFAULT_CONFIG } from './constants';
import type { ArrayElement } from './types';

export type PresetType = 'random' | 'sorted' | 'reversed' | 'nearly-sorted';

const makeElement = (value: number): ArrayElement => ({ value, color: COLORS.UNSORTED });

// Evenly spaced values across MIN_VALUE..MAX_VALUE for deterministic presets
const spreadValues = (size: number): number[] =>
	Array.from({ length: size }, (_, i) =>
		Math.round(DEFAULT_CONFIG.MIN_VALUE + (i / (size - 1)) * (DEFAULT_CONFIG.MAX_VALUE - DEFAULT_CONFIG.MIN_VALUE))
	);

export const generateArray = (size: number, preset: PresetType): ArrayElement[] => {
	switch (preset) {
		case 'sorted': {
			return spreadValues(size).map(makeElement);
		}
		case 'reversed': {
			return spreadValues(size).reverse().map(makeElement);
		}
		case 'nearly-sorted': {
			const values = spreadValues(size);
			// swap ~10% of adjacent pairs to introduce slight disorder
			const swaps = Math.max(1, Math.floor(size * 0.1));
			for (let i = 0; i < swaps; i++) {
				const idx = Math.floor(Math.random() * (size - 1));
				[values[idx], values[idx + 1]] = [values[idx + 1], values[idx]];
			}
			return values.map(makeElement);
		}
		case 'random':
		default: {
			return Array.from({ length: size }, () =>
				makeElement(
					Math.floor(Math.random() * (DEFAULT_CONFIG.MAX_VALUE - DEFAULT_CONFIG.MIN_VALUE + 1)) +
					DEFAULT_CONFIG.MIN_VALUE
				)
			);
		}
	}
};

// Keep backward-compat alias used throughout codebase
export const generateRandomArray = (size: number): ArrayElement[] => generateArray(size, 'random');

export const calculateDelay = (speed: number): number => {
	return 1000 - speed * 9;
};
