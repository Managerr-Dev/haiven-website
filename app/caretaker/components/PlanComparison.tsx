"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const columns = ["Free", "Essential", "Managed", "Secure+"];

const rows: { label: string; values: string[] }[] = [
	{
		label: "Property capacity",
		values: [
			"1 property\n6 units / tenants",
			"All subscribed units",
			"All subscribed units",
			"Assessed per property",
		],
	},
	{ label: "Admin / staff accounts", values: ["1", "3", "10", "10"] },
	{
		label: "Bills & renewals",
		values: [
			"Manual records and bills",
			"Automated workflows",
			"As Essential",
			"As Essential",
		],
	},
	{
		label: "Reporting",
		values: [
			"Basic overview",
			"Collection reports",
			"Reviewed weekly",
			"Plus incident reports",
		],
	},
	{
		label: "Haiven operational follow-up",
		values: ["—", "—", "Agreed scope", "Agreed scope"],
	},
	{
		label: "New caretaker placement",
		values: ["—", "Use your own staff", "Optional", "Optional"],
	},
];

const PlanComparison = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className="mt-6 mb-10">
			<button
				type="button"
				aria-expanded={open}
				aria-controls="plan-comparison-panel"
				onClick={() => setOpen((v) => !v)}
				className="mx-auto flex min-h-11 cursor-pointer items-center gap-1.5 px-3 py-2 text-[15px] font-semibold text-(--ct-ink)"
			>
				Compare plans
				<ChevronDown
					aria-hidden="true"
					className={`h-4 w-4 transition-transform motion-reduce:transition-none ${
						open ? "rotate-180" : ""
					}`}
				/>
			</button>
			<div id="plan-comparison-panel" hidden={!open}>
				<div className="mt-3 overflow-x-auto pb-2">
					<table
						aria-label="Caretaker plan comparison"
						className="w-full min-w-[640px] border-collapse bg-(--ct-paper) text-[14px] leading-[1.5] text-(--ct-ink)"
					>
						<thead>
							<tr>
								<th
									scope="col"
									className="bg-(--ct-soft) px-3 py-3 text-left font-semibold"
								>
									Included
								</th>
								{columns.map((col) => (
									<th
										key={col}
										scope="col"
										className="bg-(--ct-soft) px-3 py-3 text-left font-semibold"
									>
										{col}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{rows.map((row) => (
								<tr key={row.label} className="border-b border-(--ct-line)">
									<th
										scope="row"
										className="px-3 py-3.5 text-left align-top font-semibold"
									>
										{row.label}
									</th>
									{row.values.map((value, i) => (
										<td
											key={columns[i]}
											className="px-3 py-3.5 align-top whitespace-pre-line"
										>
											{value}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<p className="mt-3 text-[13.5px] leading-[1.55] text-(--ct-muted)">
					Paid plans include the core features of the preceding plan. Additional
					properties are billed separately. Payment charges are disclosed before
					payment.
				</p>
			</div>
		</div>
	);
};

export default PlanComparison;
