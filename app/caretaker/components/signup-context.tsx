"use client";

import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import type { PlanName } from "../data";

export type SignupTab = "property" | "demo" | "training";

interface SignupContextValue {
	tab: SignupTab;
	setTab: (tab: SignupTab) => void;
	plan: PlanName | null;
	goToSignup: (tab: SignupTab, plan?: PlanName) => void;
}

const SignupContext = createContext<SignupContextValue | null>(null);

export function SignupProvider({ children }: { children: React.ReactNode }) {
	const [tab, setTab] = useState<SignupTab>("property");
	const [plan, setPlan] = useState<PlanName | null>(null);

	const goToSignup = useCallback((nextTab: SignupTab, nextPlan?: PlanName) => {
		setTab(nextTab);
		setPlan(nextPlan ?? null);
		if (typeof document !== "undefined") {
			document
				.getElementById("signup")
				?.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}, []);

	const value = useMemo(
		() => ({ tab, setTab, plan, goToSignup }),
		[tab, plan, goToSignup],
	);

	return (
		<SignupContext.Provider value={value}>{children}</SignupContext.Provider>
	);
}

export function useSignup() {
	const ctx = useContext(SignupContext);
	if (!ctx) {
		throw new Error("useSignup must be used within a SignupProvider");
	}
	return ctx;
}
