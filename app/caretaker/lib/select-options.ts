/**
 * Select options for the signup forms.
 *
 * `value` is the enum string the Caretaker Intake API expects (see
 * routes/api/caretaker.php); `label` is the customer-facing wording from the
 * original landing-page design. Submit `value`, display `label`.
 *
 * Kept lucide-free so the server actions can import the enum value lists.
 */
export type SelectOption = { value: string; label: string };

export const propertyTypeOptions: SelectOption[] = [
	{ value: "block_of_flats", label: "Block of flats" },
	{ value: "rental_apartments", label: "Rental apartments" },
	{ value: "estate_or_community", label: "Estate or community" },
	{ value: "short_let_or_airbnb", label: "Short-let or Airbnb" },
	{
		value: "hostel_or_student_residence",
		label: "Hostel or student residence",
	},
	{ value: "mixed_use_or_commercial", label: "Mixed-use or commercial" },
	{ value: "several_properties", label: "Several properties" },
];

export const occupancyOptions: SelectOption[] = [
	{ value: "fully_occupied", label: "Fully occupied" },
	{ value: "mostly_occupied", label: "Mostly occupied" },
	{ value: "half_occupied", label: "Half occupied" },
	{ value: "mostly_vacant", label: "Mostly empty" },
	{ value: "new_or_not_yet_let", label: "New or not yet let" },
];

export const managedByOptions: SelectOption[] = [
	{ value: "self_managed", label: "I manage it myself" },
	{ value: "steward_or_gateman", label: "A steward or gateman on site" },
	{ value: "family_or_friend", label: "A family member or friend" },
	{
		value: "agent_or_facility_manager",
		label: "An agent or facility manager",
	},
	{ value: "nobody_in_particular", label: "Nobody in particular" },
];

export const planOptions: SelectOption[] = [
	{ value: "free", label: "Free" },
	{ value: "essential", label: "Essential" },
	{ value: "managed", label: "Managed" },
	{ value: "secure_plus", label: "Secure+" },
];

/** Plan names shown on the Plans section buttons / signup banner. */
export type PlanName = "Free" | "Essential" | "Managed" | "Secure+";

/** Map a plan label to the API's `interested_plan` enum value. */
export function planValue(name: PlanName): string {
	return planOptions.find((p) => p.label === name)?.value ?? "not_sure";
}
