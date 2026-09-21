"use client";

import { useState } from "react";
import type { CaretakerFormState } from "../../lib/form-state";
import { type LeadEndpoint, submitLead } from "../../lib/submit-lead";
import { checkForm, type FieldRule } from "../../lib/validation";

export function useLeadForm(endpoint: LeadEndpoint, rules: FieldRule[]) {
	const [state, setState] = useState<CaretakerFormState>({});
	const [isPending, setIsPending] = useState(false);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isPending) return;

		const formData = new FormData(e.currentTarget);

		const errors = checkForm(formData, rules);
		if (Object.keys(errors).length > 0) {
			setState({ errors });
			return;
		}

		setState({});
		setIsPending(true);
		const result = await submitLead(endpoint, formData);
		setIsPending(false);

		setState(
			result.success ? { success: true } : { message: result.message },
		);
	};

	const errorFor = (name: string) => state.errors?.[name];

	return { state, isPending, onSubmit, errorFor };
}
