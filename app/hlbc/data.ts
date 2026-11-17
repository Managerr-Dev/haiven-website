/**
 * Prices and copy for the Haiven Leverage Buying Club (HLBC) landing page.
 *
 * Prices are per meter in naira, excluding VAT and courier:
 * [1–99 meters, 100–999 meters, 1,000+ wholesale target].
 */

export type MeterType = "single" | "three";

export const PRICES: Record<MeterType, [number, number, number]> = {
	single: [112_000, 105_000, 95_000],
	three: [220_000, 207_000, 190_000],
};

/** Pools go ahead at this many paid meters; the full wholesale price applies at the target. */
export const POOL_MINIMUM = 300;
export const POOL_TARGET = 1_000;

export const fmt = (n: number) => "₦" + Math.round(n).toLocaleString("en-NG");

/**
 * Pool price for `paid` cleared meters:
 * 100–999 price − (100–999 price − 1,000+ price) × paid ÷ 1,000.
 */
export function poolPrice(type: MeterType, paid: number) {
	const [, mid, target] = PRICES[type];
	return paid >= POOL_TARGET ? target : mid - ((mid - target) * paid) / POOL_TARGET;
}

/** What a buyer pays without the pool: the 1–99 or 100–999 tier. */
export const alonePrice = (type: MeterType, qty: number) =>
	qty < 100 ? PRICES[type][0] : PRICES[type][1];

export const METER_TYPES: { value: MeterType; label: string }[] = [
	{ value: "single", label: "Single-phase" },
	{ value: "three", label: "Three-phase" },
];

export const LADDERS = [
	{
		type: "single" as const,
		name: "Single-phase GPRS smart meter",
		use: "Homes, flats and single-phase installations",
	},
	{
		type: "three" as const,
		name: "Three-phase GPRS smart meter",
		use: "Larger homes, commercial and three-phase installations",
	},
].map((m) => {
	const [t1, t2, t3] = PRICES[m.type];
	return { ...m, t1, t2, t3, save: t1 - t3 };
});

/** Rows of the illustrative price table. */
export const TABLE_TIERS = [300, 500, 700, 900, 1_000];

export const STEPS: [title: string, body: string][] = [
	[
		"Register free",
		"Pick your meter type and quantity. Add optional boxes or breakers. No payment yet.",
	],
	[
		"Join a pool",
		"Each pool is open for up to 21 days. Only cleared payments count toward it.",
	],
	[
		"Provisional price notice",
		"When the pool provisionally closes, we tell you the pool size and your provisional price.",
	],
	[
		"Pay 50%",
		"Within 7 days of provisional closure. Haiven then confirms the final price.",
	],
	[
		"Pay balance and courier",
		"Before dispatch, you pay the remaining balance and courier charges.",
	],
	[
		"Receive your meters",
		"Shipping takes an estimated 10 weeks from supplier order confirmation.",
	],
];

export const SAFEGUARDS: [title: string, body: string][] = [
	[
		"Ring-fenced funds",
		"Pool payments are held separately and used only for that pool’s order.",
	],
	["300 minimum", "A pool only goes ahead once it reaches 300 paid meters."],
	[
		"Refunds within 7 business days",
		"If a pool falls short, transfer to the next pool or request a refund. Approved refunds are paid within 7 business days.",
	],
	[
		"Price confirmed first",
		"You see the provisional price before paying, and Haiven confirms the final price after your deposit.",
	],
	[
		"Only cleared payments count",
		"Registrations don’t move the pool. Paid meters do, so the count is real.",
	],
	[
		"No substitution without approval",
		"You get the meter you registered for, unless you approve a change.",
	],
];

export const FEATURES: [title: string, body: string][] = [
	[
		"GPRS communication",
		"Readings and events travel over the mobile network, so there are no site visits to read meters.",
	],
	["Prepaid by keypad", "Tenants enter credit tokens on the built-in keypad."],
	[
		"Live usage and credit",
		"The display shows consumption, remaining credit and status lights.",
	],
	["Tamper alerts", "Cover opening and bypass attempts are flagged by the meter."],
	[
		"Remote management",
		"Readings, tariffs and supply control can be handled from a central platform.",
	],
	[
		"Certified build",
		"IEC 62052-11 and IEC 62053-21 compliant, in an IP54 enclosure.",
	],
];

export const FAQS: [question: string, answer: string][] = [
	[
		"Is registration really free?",
		"Yes. Registering is free and non-binding. You only pay once your pool provisionally closes and you’ve seen the provisional price.",
	],
	[
		"I only need one meter. Can I still join?",
		"Yes. Every buyer in a pool pays the same price per meter, whether you need one meter or hundreds.",
	],
	[
		"When do I pay?",
		"You pay 50% within 7 days of provisional closure. The balance and courier charges are paid before dispatch.",
	],
	[
		"What if the pool doesn’t reach 300 paid meters?",
		"The pool doesn’t go ahead. You can transfer to the next pool or request a refund. Approved refunds are paid within 7 business days.",
	],
	[
		"Is the price guaranteed?",
		"Prices on this page are illustrative. Haiven confirms the final price after provisional closure, subject to supplier confirmation.",
	],
	[
		"How long does delivery take?",
		"Shipping takes an estimated 10 weeks from supplier order confirmation. Courier within Nigeria is charged separately.",
	],
	[
		"Are meter boxes and breakers included?",
		"No. They’re optional, quoted on request and kept outside the pool price.",
	],
	[
		"Can I mix single-phase and three-phase?",
		"Yes. You can register for both. Each meter type runs its own pool and price.",
	],
];

export const BUYER_TYPES = [
	{ value: "homeowner", label: "Homeowner" },
	{ value: "landlord", label: "Landlord or property manager" },
	{ value: "estate", label: "Estate or facility manager" },
	{ value: "developer", label: "Developer" },
	{ value: "business", label: "Business" },
	{ value: "installer", label: "Installer or electrician" },
	{ value: "other", label: "Other" },
];

export const ACCESSORIES = [
	{ value: "none", label: "No, meters only" },
	{ value: "boxes", label: "Meter boxes" },
	{ value: "breakers", label: "Circuit breakers" },
	{ value: "both", label: "Boxes and breakers" },
];

export const STATES = [
	"Abia",
	"Adamawa",
	"Akwa Ibom",
	"Anambra",
	"Bauchi",
	"Bayelsa",
	"Benue",
	"Borno",
	"Cross River",
	"Delta",
	"Ebonyi",
	"Edo",
	"Ekiti",
	"Enugu",
	"FCT Abuja",
	"Gombe",
	"Imo",
	"Jigawa",
	"Kaduna",
	"Kano",
	"Katsina",
	"Kebbi",
	"Kogi",
	"Kwara",
	"Lagos",
	"Nasarawa",
	"Niger",
	"Ogun",
	"Ondo",
	"Osun",
	"Oyo",
	"Plateau",
	"Rivers",
	"Sokoto",
	"Taraba",
	"Yobe",
	"Zamfara",
];

export const labelFor = (
	options: { value: string; label: string }[],
	value: string,
) => options.find((o) => o.value === value)?.label ?? value;
