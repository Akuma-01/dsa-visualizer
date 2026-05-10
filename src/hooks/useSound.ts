import { useCallback, useEffect, useRef } from 'react';

// Maps a bar value (MIN_VALUE..MAX_VALUE) to a frequency in Hz
// Range: ~180 Hz (low) to ~880 Hz (high) — pleasant musical range
const valueToFrequency = (value: number, minVal: number, maxVal: number): number => {
	const t = (value - minVal) / (maxVal - minVal);
	return 180 + t * 700;
};

export function useSound(enabled: boolean) {
	const ctxRef = useRef<AudioContext | null>(null);

	// Lazily create AudioContext on first use (browsers require user gesture first)
	const getCtx = useCallback((): AudioContext | null => {
		if (!enabled) return null;
		if (!ctxRef.current) {
			try {
				ctxRef.current = new AudioContext();
			} catch {
				return null;
			}
		}
		// Resume if suspended (autoplay policy)
		if (ctxRef.current.state === 'suspended') {
			ctxRef.current.resume();
		}
		return ctxRef.current;
	}, [enabled]);

	// Play a short beep at a pitch derived from the given value
	const playTone = useCallback((value: number, minVal: number, maxVal: number) => {
		const ctx = getCtx();
		if (!ctx) return;

		const freq = valueToFrequency(value, minVal, maxVal);
		const now = ctx.currentTime;
		const duration = 0.06; // 60ms — short enough not to blur together at high speed

		const osc = ctx.createOscillator();
		const gain = ctx.createGain();

		osc.type = 'sine';
		osc.frequency.setValueAtTime(freq, now);

		// Fade out quickly to avoid clicking
		gain.gain.setValueAtTime(0.18, now);
		gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

		osc.connect(gain);
		gain.connect(ctx.destination);

		osc.start(now);
		osc.stop(now + duration);
	}, [getCtx]);

	// Cleanup AudioContext on unmount
	useEffect(() => {
		return () => {
			ctxRef.current?.close();
			ctxRef.current = null;
		};
	}, []);

	return { playTone };
}
