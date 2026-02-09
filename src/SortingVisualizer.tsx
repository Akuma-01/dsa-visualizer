// src/SortingVisualizer.tsx - Main orchestrator component

import React, { useEffect, useRef, useState } from 'react';
import { algorithms, getAlgorithmByName, getDefaultAlgorithm } from './algorithms';
import {
	AlgorithmDetails, CodeDisplay, Controls, Header, Visualization,
} from './components';
import { DEFAULT_CONFIG } from './constants';
import type { ArrayElement, SortingStep } from './types';
import { calculateDelay, generateRandomArray } from './utils';

const SortingVisualizer: React.FC = () => {
	const [array, setArray] = useState<ArrayElement[]>(() =>
		generateRandomArray(DEFAULT_CONFIG.DEFAULT_ARRAY_SIZE)
	);

	const [arraySize, setArraySize] = useState<number>(DEFAULT_CONFIG.DEFAULT_ARRAY_SIZE);
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [speed, setSpeed] = useState<number>(DEFAULT_CONFIG.DEFAULT_SPEED);
	const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(getDefaultAlgorithm().name);
	const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);

	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


	const currentAlgorithm = getAlgorithmByName(selectedAlgorithm) || getDefaultAlgorithm();

	const handleReset = () => {
		const newArray = generateRandomArray(arraySize);
		setArray(newArray);
		setCurrentStep(0);
		setIsPlaying(false);
		setSortingSteps([]);
	};

	const handleArraySizeChange = (size: number) => {
		setArraySize(size);

		const newArray = generateRandomArray(size);
		setArray(newArray);
		setCurrentStep(0);
		setIsPlaying(false);
		setSortingSteps([]);
	};

	const startSorting = () => {
		const steps = currentAlgorithm.sortFunction(array);
		setSortingSteps(steps);
		setCurrentStep(0);
		setIsPlaying(true);
	};

	useEffect(() => {
		if (isPlaying && sortingSteps.length > 0) {
			if (currentStep < sortingSteps.length - 1) {
				timeoutRef.current = setTimeout(() => {
					setCurrentStep(prev => prev + 1);
				}, calculateDelay(speed));
			} else {
				timeoutRef.current = setTimeout(() => {
					setIsPlaying(false);
				}, 0);
			}
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [isPlaying, currentStep, sortingSteps, speed]);

	useEffect(() => {
		if (sortingSteps.length > 0 && currentStep < sortingSteps.length) {
			setArray(sortingSteps[currentStep].main);
		}
	}, [currentStep, sortingSteps]);

	const handleAlgorithmChange = (algorithmName: string) => {
		setSelectedAlgorithm(algorithmName);
		setSortingSteps([]);
		setCurrentStep(0);
		setIsPlaying(false);
	};

	const handlePlayPause = () => {
		if (sortingSteps.length === 0) {
			startSorting();
		} else {
			setIsPlaying(!isPlaying);
		}
	};

	const handlePrevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(prev => prev - 1);
			setIsPlaying(false);
		}
	};

	const handleNextStep = () => {
		if (sortingSteps.length === 0) {
			startSorting();
		} else if (currentStep < sortingSteps.length - 1) {
			setCurrentStep(prev => prev + 1);
			setIsPlaying(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-7xl mx-auto">
				<Header />

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
					<div className="lg:col-span-3">
						<Controls
							algorithm={selectedAlgorithm}
							arraySize={arraySize}
							speed={speed}
							currentStep={currentStep}
							totalSteps={sortingSteps.length}
							isPlaying={isPlaying}
							onAlgorithmChange={handleAlgorithmChange}
							onArraySizeChange={handleArraySizeChange}
							onSpeedChange={setSpeed}
							onReset={handleReset}
							onPlayPause={handlePlayPause}
							onPrevStep={handlePrevStep}
							onNextStep={handleNextStep}
							availableAlgorithms={algorithms}
						/>
					</div>

					<div className="lg:col-span-6">
						<Visualization array={array} />
					</div>

					<div className="lg:col-span-3 space-y-6">
						<AlgorithmDetails
							algorithm={currentAlgorithm}
						/>
						<CodeDisplay
							code={currentAlgorithm.code}
							activeLine={sortingSteps[currentStep]?.line}

						/>


					</div>
				</div>
			</div>
		</div>
	);
};

export default SortingVisualizer;
