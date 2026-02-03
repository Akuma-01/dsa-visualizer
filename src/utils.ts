import { COLORS, DEFAULT_CONFIG } from './constants';
import type { ArrayElement } from './types';

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

export const calculateDelay = (speed: number): number => {
	return 1000 - speed * 9;
};
