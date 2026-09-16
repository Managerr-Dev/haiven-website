"use client";

import { planOptions, planValue, propertyTypeOptions } from "../../data";
import {
	emailRule,
	nameRule,
	phoneRule,
	unitsRule,
	type FieldRule,
} from "../../lib/validation";
import { useSignup } from "../signup-context";
import {
	FormMessage,
	SelectField,
	SubmitButton,
	SuccessPanel,
	TextField,
} from "./fields";
import { useLeadForm } from "./useLeadForm";

const rules: FieldRule[] = [
	nameRule,
	phoneRule,
	emailRule,
	["property_type", "text", "Choose the property type that fits best."],
	unitsRule,
];

const WaitlistForm = () => {
	const { plan } = useSignup();
	const { state, isPending, onSubmit, errorFor } = useLeadForm(
		"waitlist",
		rules,
	);

	if (state.success) {
		return (
			<SuccessPanel
				title="You are on the waitlist."
				body="We will call or email you in the last week of October, before Caretaker opens publicly on 1 November."
			/>
		);
	}

	return (
		<form onSubmit={onSubmit} noValidate>
			{plan && (
				<p className="mb-[22px] rounded-[10px] bg-[#E8EBF5] px-3.5 py-2.5 text-[14px] text-[#1B2E6B]">
					You&rsquo;re asking about: <strong>{plan}</strong>
				</p>
			)}
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
					name="number_of_units"
					label="Number of units"
					type="number"
					inputMode="numeric"
					min={1}
					error={errorFor("number_of_units")}
				/>
				<SelectField
					name="interested_plan"
					label="Plan you're interested in"
					options={planOptions}
					placeholder="Not sure yet"
					defaultValue={plan ? planValue(plan) : ""}
				/>
			</div>
			<SubmitButton pending={isPending}>Join the waitlist</SubmitButton>
		</form>
	);
};

export default WaitlistForm;
