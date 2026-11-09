"use client";

import { type ApiError, toApiError } from "@/app/(site)/listings/api";
import { useCallback, useEffect, useState } from "react";

interface Settled<T> {
	load: (signal: AbortSignal) => Promise<T>;
	attempt: number;
	data?: T;
	error?: ApiError;
}

/**
 * Runs `load` and tracks the result. Pass a stable function (module-level or
 * useCallback): a new function starts a new request and cancels the last one.
 */
export function useRemote<T>(load: (signal: AbortSignal) => Promise<T>) {
	const [attempt, setAttempt] = useState(0);
	const [settled, setSettled] = useState<Settled<T> | null>(null);

	useEffect(() => {
		const controller = new AbortController();
		load(controller.signal).then(
			(data) => {
				if (!controller.signal.aborted) setSettled({ load, attempt, data });
			},
			(error) => {
				if (!controller.signal.aborted) {
					setSettled({ load, attempt, error: toApiError(error) });
				}
			},
		);
		return () => controller.abort();
	}, [load, attempt]);

	const retry = useCallback(() => setAttempt((n) => n + 1), []);
	const current =
		settled?.load === load && settled.attempt === attempt ? settled : null;

	return {
		loading: current === null,
		data: current?.data,
		error: current?.error,
		retry,
	};
}
