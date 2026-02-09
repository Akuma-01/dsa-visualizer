// src/types.ts - Shared type definitions

export interface ArrayElement {
	value: number;
	color: string;
}

export type AuxState = {
	left?: ArrayElement[];
	right?: ArrayElement[];
	leftActive?: number;
	rightActive?: number;
	writeIndex?: number;
};

export type SortingStep = {
	main: ArrayElement[];
	aux?: AuxState;
	line?: number;
};

export interface Algorithm {
	name: string;
	displayName: string;
	description: string;
	timeComplexity: {
		best?: string;
		average: string;
		worst: string;
	};
	spaceComplexity: string;
	code: string;
	invariant?: string;
	sortFunction: (arr: ArrayElement[]) => SortingStep[];
}

export interface ControlsProps {
	algorithm: string;
	arraySize: number;
	speed: number;
	currentStep: number;
	totalSteps: number;
	isPlaying: boolean;
	onAlgorithmChange: (algorithm: string) => void;
	onArraySizeChange: (size: number) => void;
	onSpeedChange: (speed: number) => void;
	onReset: () => void;
	onPlayPause: () => void;
	onPrevStep: () => void;
	onNextStep: () => void;
	availableAlgorithms: Algorithm[];
}

