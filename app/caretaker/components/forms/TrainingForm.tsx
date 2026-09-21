"use client";

import {
	emailRule,
	nameRule,
	phoneRule,
	type FieldRule,
} from "../../lib/validation";
import {
	FormMessage,
	SubmitButton,
	SuccessPanel,
	TextField,
} from "./fields";
import { useLeadForm } from "./useLeadForm";

const rules: FieldRule[] = [
	nameRule,
	phoneRule,
	emailRule,
	["location", "text", "Tell us where in Lagos you live."],
];

const TrainingForm = () => {
	const { state, isPending, onSubmit, errorFor } = useLeadForm(
		"training-application",
		rules,
	);

	if (state.success) {
		return (
			<SuccessPanel
				title="Your Caretaker training application is in."
				body="Selection for the next cohort closes at the end of September. We will call shortlisted applicants within two weeks."
			/>
		);
	}

	return (
		<form onSubmit={onSubmit} noValidate>
			<FormMessage message={state.errors ? undefined : state.message} />
			<div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
				<TextField
					name="full_name"
					label="Full name"
					autoComplete="name"
					error={errorFor("full_name")}
				/>
				<TextField
					name="phone_number"
					label="Phone"
					type="tel"
					autoComplete="tel"
					placeholder="0801 234 5678"
					error={errorFor("phone_number")}
				/>
				<TextField
					name="email"
					label="Email"
					type="email"
					autoComplete="email"
					error={errorFor("email")}
				/>
				<TextField
					name="location"
					label="Where you live in Lagos"
					placeholder="e.g. Yaba"
					error={errorFor("location")}
				/>
			</div>
			<SubmitButton pending={isPending}>
				Apply for Caretaker training
			</SubmitButton>
		</form>
	);
};

export default TrainingForm;
