"use client";

import {
	managedByOptions,
	occupancyOptions,
	propertyTypeOptions,
} from "../../data";
import {
	emailRule,
	nameRule,
	phoneRule,
	unitsRule,
	type FieldRule,
} from "../../lib/validation";
import {
	FormMessage,
	SelectField,
	SubmitButton,
	SuccessPanel,
	TextAreaField,
	TextField,
} from "./fields";
import { useLeadForm } from "./useLeadForm";

const rules: FieldRule[] = [
	nameRule,
	phoneRule,
	emailRule,
	["property_type", "text", "Choose the property type that fits best."],
	["location", "text", "Tell us the area of Lagos the property is in."],
	unitsRule,
	["occupancy", "text", "Choose how full the property is today."],
	["managed_by", "text", "Choose who looks after the property today."],
	[
		"what_to_solve",
		"text",
		"Tell us in a line what you most want Caretaker to solve.",
	],
];

const DemoForm = () => {
	const { state, isPending, onSubmit, errorFor } = useLeadForm(
		"demo-request",
		rules,
	);

	if (state.success) {
		return (
			<SuccessPanel
				title="Your Caretaker Demo application is in."
				body="We read every application ourselves. If your property fits the Demo, we will call you on the number you gave us before 1 October. If it is not a fit this round, we will say so and put you on the November list."
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
				<SelectField
					name="property_type"
					label="Property type"
					options={propertyTypeOptions}
					error={errorFor("property_type")}
				/>
				<TextField
					name="location"
					label="Location (area of Lagos)"
					placeholder="e.g. Lekki Phase 1"
					error={errorFor("location")}
				/>
				<TextField
					name="number_of_units"
					label="Number of units"
					type="number"
					inputMode="numeric"
					min={1}
					error={errorFor("number_of_units")}
				/>
				<SelectField
					name="occupancy"
					label="Current occupancy"
					options={occupancyOptions}
					error={errorFor("occupancy")}
				/>
				<SelectField
					name="managed_by"
					label="How the property is managed today"
					options={managedByOptions}
					error={errorFor("managed_by")}
				/>
			</div>
			<TextAreaField
				name="what_to_solve"
				label="What you most want Caretaker to solve"
				error={errorFor("what_to_solve")}
			/>
			<SubmitButton pending={isPending}>
				Apply for the Caretaker Demo
			</SubmitButton>
		</form>
	);
};

export default DemoForm;
