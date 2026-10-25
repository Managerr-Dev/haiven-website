export type ListItem = string | { lead: string; text: string };

export interface RoleSection {
	heading: string;
	paras?: string[];
	groups?: { sub?: string; items: ListItem[] }[];
}

export type Team = "Operations" | "Technical" | "Growth" | "Customer Success";

export type RoleSlug =
	| "facility-manager"
	| "field-technician"
	| "growth-executive"
	| "customer-success-associate";

export interface Role {
	slug: RoleSlug;
	short: string;
	title: string;
	team: Team;
	cardLoc: string;
	cardType: string;
	cardSalary: string;
	sLoc: string;
	sType: string;
	sSalary: string;
	/** Detail chips under the role title, in display order. */
	chips: string[];
	cardImage: string;
	photo: string;
	photoAlt: string;
	photo2?: { src: string; alt: string; caption: string };
	/** Show the Certified Caretaker strip at the bottom of the role page. */
	strip: boolean;
	minSalary: number;
	maxSalary: number;
	sections: RoleSection[];
}

export const SITE_URL = "https://haiven.net";
export const CAREERS_EMAIL = "careers@haiven.net";

export const DATE_POSTED = "2026-10-21";
export const CLOSES_AT = new Date("2026-11-30T23:59:59+01:00");
export const CLOSES_LABEL = "30 November 2026";

export function isClosed(now = new Date()) {
	return now > CLOSES_AT;
}

const IMG = "/images/careers";

export const ROLES: Role[] = [
	{
		slug: "facility-manager",
		short: "Facility Manager",
		title: "Facility Manager — Caretaker Operations Lead",
		team: "Operations",
		cardLoc: "Lagos, field-based (Lekki–Ajah)",
		cardType: "Full-time",
		cardSalary: "₦500,000–₦750,000 + referral earnings",
		sLoc: "Lagos, field-based from Lekki–Ajah",
		sType: "Full-time",
		sSalary: "₦500,000–₦750,000 a month",
		chips: [
			"Operations",
			"Lagos, field-based from Lekki–Ajah",
			"Full-time",
			"₦500,000–₦750,000 a month",
			`Closes ${CLOSES_LABEL}`,
		],
		cardImage: `${IMG}/role-facility-manager.jpg`,
		photo: `${IMG}/role-facility-manager.jpg`,
		photoAlt: "Haiven team members walking through a Lagos estate",
		strip: true,
		minSalary: 500000,
		maxSalary: 750000,
		sections: [
			{
				heading: "About Haiven",
				paras: [
					"Haiven is the operating system for residential property in Lagos. Estates and apartment buildings use it to run access control, dues and bills, smart metering, CCTV, work orders and resident communication from one app. Our Caretaker service puts trained, certified people on the ground, with the system behind them.",
				],
			},
			{
				heading: "The role",
				paras: [
					"You will be Haiven's first Caretaker, then the person who builds and leads the Caretaker team. For the first months you will run a small set of buildings yourself, on our system, to the standard we will train others to. As certified Caretakers join, you will move into supervising them, auditing their work and keeping landlords confident.",
				],
			},
			{
				heading: "What you'll do",
				groups: [
					{
						sub: "First months: hands-on",
						items: [
							"Run two to four residential buildings day to day: cleaning standards, power and water, security coordination, vendors and tenant complaints, all logged in the app with photo evidence.",
							"Onboard each new property: site survey, complexity score, asset register and maintenance calendar, all set up in Haiven.",
							"Be Haiven's face to landlords: send the weekly property report, and explain problems and costs in plain words.",
							"Help write the procedures that become the Haiven Caretaker playbook, and host trainees on shadowing weeks.",
						],
					},
					{
						sub: "As the team grows: supervisor",
						items: [
							"Supervise Licensed Caretakers through probation check-ins, unannounced spot audits, monthly scorecards and coaching.",
							"Assign properties to Caretakers by building class and workload.",
							"Work with our training partner on each cohort, and lead field attachments.",
							"Handle field escalations: emergencies, vendor disputes and landlords at risk of leaving.",
						],
					},
					{
						sub: "Throughout",
						items: [
							"Introduce landlords, building owners, estates and facility management firms from your network, and earn on every one that signs.",
							"Work with our technicians on installations, and with Customer Success on account health.",
						],
					},
				],
			},
			{
				heading: "What you bring",
				groups: [
					{
						items: [
							"HND or BSc in Estate Management, Facility Management, Building, Engineering or a related field.",
							"At least 4 years managing residential buildings or estates in Lagos, including supervising guards, cleaners or site staff.",
							"Working knowledge of generators, inverters and solar, pumps and boreholes, basic electrical and plumbing faults, and fire safety.",
							"Confidence running your work from a smartphone app, and writing clear reports in English.",
							"A clean integrity record. We check references, guarantors and background before any offer.",
							"You live in, or can easily reach, Lekki–Ajah, and can move across Lagos.",
							{
								lead: "An advantage:",
								text: "a professional FM certification or membership, and a network of landlords and property owners.",
							},
						],
					},
				],
			},
			{
				heading: "What we offer",
				groups: [
					{
						items: [
							"₦500,000–₦750,000 a month base pay, by experience.",
							"Uncapped earnings on every property you introduce that signs with Haiven.",
							"A supervision allowance for each Caretaker on your team who meets standard, plus a quarterly performance bonus.",
							"A field transport and data allowance, pension, and Haiven Senior Caretaker certification.",
							"A clear path to Caretaker Operations Manager as the network grows.",
						],
					},
				],
			},
			{
				heading: "How to apply",
				paras: [
					"Complete the form below and attach your CV. Tell us about one building you ran, and the hardest problem you solved there. Strong applicants who are not selected for this role will be invited into the Haiven Certified Caretaker programme, if they agree.",
				],
			},
		],
	},
	{
		slug: "field-technician",
		short: "Field Technician",
		title: "Field Technician — Lead and Trainee (2 roles)",
		team: "Technical",
		cardLoc: "Lagos and project sites",
		cardType: "Full-time",
		cardSalary: "Lead ₦500,000–₦750,000 · Trainee ₦100,000–₦130,000",
		sLoc: "Lagos and project sites",
		sType: "Full-time · 2 roles",
		sSalary: "Lead ₦500,000–₦750,000 · Trainee ₦100,000–₦130,000",
		chips: [
			"Technical",
			"Lagos and project sites",
			"Full-time",
			"2 roles",
			"Lead ₦500,000–₦750,000",
			"Trainee ₦100,000–₦130,000",
			`Closes ${CLOSES_LABEL}`,
		],
		cardImage: `${IMG}/role-field-technician.jpg`,
		photo: `${IMG}/tech-lock-install.jpg`,
		photoAlt: "A Haiven technician installing a smart door lock on site",
		photo2: {
			src: `${IMG}/tech-bench-training.jpg`,
			alt: "Technician trainees practising on a training bench",
			caption: "Trainees learn on the bench before they go on site.",
		},
		strip: true,
		minSalary: 100000,
		maxSalary: 750000,
		sections: [
			{
				heading: "About Haiven",
				paras: [
					"Haiven is the operating system for residential and commercial property in Lagos. Our software runs gates, payments, power and security for estates, apartment buildings and markets. Our technicians install the devices that make it work: smart meters, door locks, CCTV and access control.",
				],
			},
			{
				heading: "Why these roles matter",
				paras: [
					"A resident judges Haiven by whether the gate opens and the meter tops up. Installations done right, and faults fixed fast, are what keep properties with us. We are building our own technical team and training it to one standard.",
				],
			},
			{
				heading: "What you'll do",
				groups: [
					{
						items: [
							"Survey sites and prepare the bill of materials before each installation.",
							"Install, configure and commission smart prepaid meters and data concentrators, smart door locks, CCTV cameras and NVRs, and access-control hardware such as readers, controllers and boom barriers.",
							"Connect devices to the network and to the Haiven platform, then test them end to end with our support team.",
							"Carry out planned maintenance, and respond to hardware faults within our service times.",
							"Log every job in the Haiven app with before-and-after photos.",
							"Show estate staff and residents how to use what you installed.",
							"Keep tools, stock and safety equipment accounted for.",
							{
								lead: "Lead only:",
								text: "plan crews, supervise and train trainees and contract installers, and sign off quality on every job.",
							},
						],
					},
				],
			},
			{
				heading: "What you bring",
				groups: [
					{
						sub: "Lead Field Technician",
						items: [
							"OND, HND or BSc in Electrical or Electronic Engineering, or a recognised trade certificate.",
							"At least 3 years installing and maintaining CCTV, access control, electronic security or metering systems.",
							"Comfort with IP networking: addressing, PoE, routers and NVR setup.",
							"Safe working habits at heights and around live power.",
							"Experience leading a small crew and checking others' work.",
							{
								lead: "An advantage:",
								text: "experience with prepaid metering, or electrical installation certification.",
							},
						],
					},
					{
						sub: "Technician Trainee",
						items: [
							"OND, NABTEB or a trade test in Electrical or Electronics, or a recent ND or HND. No experience needed.",
							"Good with your hands and with a smartphone, and keen to learn.",
							"Comfortable on ladders, in the sun and on site all day.",
							"You live in Lagos and can travel to project sites.",
						],
					},
				],
			},
			{
				heading: "What we offer",
				groups: [
					{
						items: [
							"Lead Field Technician: ₦500,000–₦750,000 a month, by experience.",
							"Technician Trainee: ₦100,000–₦130,000 a month on a 6-month training contract, rising to ₦180,000–₦220,000 as a certified Field Technician.",
							"An install bonus on every job that passes quality checks.",
							"Tools, safety gear, a field transport and data allowance, and pension.",
							"Structured training, and Haiven technical certification.",
						],
					},
				],
			},
			{
				heading: "How to apply",
				paras: [
					"Complete the form below, choose Lead or Trainee, and attach your CV. Add photos of two installations you have done, if you have them. Shortlisted candidates take a practical bench test. Experienced applicants who are not selected may join our paid-per-job contract installer bench, if they agree.",
				],
			},
		],
	},
	{
		slug: "growth-executive",
		short: "Growth Executive",
		title:
			"Growth Executive — Haiven and Caretaker (2 roles, including 1 Senior)",
		team: "Growth",
		cardLoc: "Lagos, field-based",
		cardType: "Full-time",
		cardSalary: "₦150,000–₦350,000 base + uncapped commission",
		sLoc: "Lagos, field-based",
		sType: "Full-time · 2 roles, including 1 Senior",
		sSalary: "₦150,000–₦350,000 base + uncapped commission",
		chips: [
			"Growth",
			"Lagos, field-based",
			"Full-time",
			"2 roles, including 1 Senior",
			"₦150,000–₦350,000 base + uncapped commission",
			`Closes ${CLOSES_LABEL}`,
		],
		cardImage: `${IMG}/role-growth-executive.jpg`,
		photo: `${IMG}/role-growth-executive.jpg`,
		photoAlt: "A sales conversation with an estate manager at a Lagos estate",
		strip: false,
		minSalary: 150000,
		maxSalary: 350000,
		sections: [
			{
				heading: "About Haiven",
				paras: [
					"Haiven is the operating system for residential property in Lagos. Estates use it for gates, dues, power and security. Landlords use Caretaker to run their buildings, with trained Caretakers on the ground if they want them. We are growing fast and need people who close.",
				],
			},
			{
				heading: "The role",
				paras: [
					"You will win new estates, apartment buildings and facility management partners across Lagos, for both Haiven and Caretaker. You will find the decision-maker, earn the meeting, run the demo and close. Then you will hand the account to our Customer Success team and go and find the next one. If you like a target, a scoreboard and being paid for results, read on.",
				],
			},
			{
				heading: "What you'll do",
				groups: [
					{
						items: [
							"Own a Lagos cluster, and build your pipeline from our estate database, field visits, facility management firms, developers and landlord networks.",
							"Run demos for estate committees, landlords, facility managers and developers, and close signed deals.",
							"Turn free Caretaker sign-ups into paying customers.",
							"Open and grow partnerships with facility management companies.",
							"Propose and run one new sales experiment every month, and report what it produced.",
							"Keep every lead, meeting and deal up to date in our CRM, and attend the weekly pipeline review.",
							"Hand closed accounts over cleanly to onboarding, with everything they need.",
							{
								lead: "Senior only:",
								text: "coach the second Executive and our field agents, and own the team's quarterly number.",
							},
						],
					},
				],
			},
			{
				heading: "What you bring",
				groups: [
					{
						items: [
							"HND or BSc in any discipline.",
							"At least 2 years in field or B2B sales with a record of closing deals. The Senior role needs 4 years and some team leadership. Real estate, proptech, fintech or security sales is a strong advantage.",
							"You know Lagos property: estates, landlords, agents and facility managers.",
							"You can explain a technology product in plain words to an estate chairman or a landlord.",
							"Drive, resilience, and comfort with rejection.",
							"A smartphone and laptop. A driver's licence is an advantage.",
						],
					},
				],
			},
			{
				heading: "What we offer",
				groups: [
					{
						items: [
							"Senior Growth Executive: ₦250,000–₦350,000 a month base.",
							"Growth Executive: ₦150,000–₦200,000 a month base.",
							"Uncapped commission on what your accounts pay in their first 12 months, plus go-live bonuses and quarterly accelerators.",
							"A field transport and data allowance, pension, and a path to Sales Lead.",
						],
					},
				],
			},
			{
				heading: "How to apply",
				paras: [
					"Complete the form below, choose Senior or Executive, and attach your CV. Tell us about the best deal you ever closed, in three sentences. Shortlisted candidates do a live call role-play and a 48-hour field challenge. Promising applicants who are not selected may be offered commission-based field-agent roles, if they agree.",
				],
			},
		],
	},
	{
		slug: "customer-success-associate",
		short: "Customer Success Associate",
		title: "Customer Success Associate — Graduate Programme",
		team: "Customer Success",
		cardLoc: "Lagos, hybrid",
		cardType: "12-month graduate programme",
		cardSalary: "₦150,000–₦180,000",
		sLoc: "Lagos, hybrid with regular site visits",
		sType: "12-month graduate programme",
		sSalary: "₦150,000–₦180,000 a month",
		chips: [
			"Customer Success",
			"Lagos, hybrid with regular site visits",
			"12-month graduate programme",
			"₦150,000–₦180,000 a month",
			"Open to new graduates only",
			`Closes ${CLOSES_LABEL}`,
		],
		cardImage: `${IMG}/role-customer-success-associate.jpg`,
		photo: `${IMG}/role-customer-success-associate.jpg`,
		photoAlt:
			"A customer success associate on a call with the Haiven dashboard open",
		strip: false,
		minSalary: 150000,
		maxSalary: 180000,
		sections: [
			{
				heading: "About Haiven",
				paras: [
					"Haiven is the operating system for residential property in Lagos. Estates and apartment buildings use our app to run gates, payments, power, security and maintenance. Residents depend on it every day, and the people who run those properties depend on us.",
				],
			},
			{
				heading: "The role",
				paras: [
					"You will be the person our customers call. You will own a group of estates and buildings, get them set up, teach their managers to use Haiven well, and solve their problems fast. When you can't solve a problem yourself, you'll bring in our technicians, Caretakers or engineers. You will learn how a technology company keeps its customers, in a role built to grow you.",
				],
			},
			{
				heading: "What you'll do",
				groups: [
					{
						items: [
							"Own a book of estates, landlords and facility management partners as their first point of contact.",
							"Onboard new properties: set up data, train admins and committees, and run resident sign-up drives.",
							"Answer requests on WhatsApp, phone, email and in the app. Log every ticket, and resolve or route it within our response times.",
							"Check every account's health weekly, and act early when usage or payments slip.",
							"Hold monthly check-ins with estate managers and landlords.",
							"Write and improve help guides and quick-reply answers, so customers can help themselves.",
							"Pass customer feedback to our product team, with evidence.",
							"Visit sites when needed, with our technicians and Caretakers.",
						],
					},
				],
			},
			{
				heading: "What you bring",
				groups: [
					{
						items: [
							"A BSc or HND in any discipline, completed between 2023 and 2026, with NYSC completed or exempted.",
							"No more than 2 years of full-time work experience.",
							"Clear, warm written and spoken English. Pidgin, Yoruba, Igbo or Hausa is a plus.",
							"Calm under pressure, and the habit of following through until a problem is closed.",
							"Comfort with smartphones, WhatsApp Business, and Google Sheets or Excel.",
							"You live in Lagos and can visit sites across the city.",
						],
					},
				],
			},
			{
				heading: "What we offer",
				groups: [
					{
						items: [
							"₦150,000–₦180,000 a month.",
							"A quarterly retention bonus, plus earnings on add-ons your accounts buy and on properties you refer.",
							"A two-week bootcamp, then a week in the field with our technicians and Caretakers.",
							"Pension, and a review for a full-time role at the end of the 12 months.",
						],
					},
				],
			},
			{
				heading: "How to apply",
				paras: [
					"Complete the form below and attach your CV. In under 150 words, tell us about a time you fixed a problem for someone who was upset. Shortlisted candidates take a short online assessment and a group case exercise.",
				],
			},
		],
	},
];

export function getRole(slug: string) {
	return ROLES.find((r) => r.slug === slug);
}

export const TEAMS: Team[] = [
	"Operations",
	"Technical",
	"Growth",
	"Customer Success",
];

export const AREAS = [
	"Lekki–Ajah",
	"Victoria Island–Ikoyi",
	"Ikeja–Maryland",
	"Yaba–Surulere",
	"Gbagada–Ketu",
	"Mainland other",
	"Outside Lagos",
];
export const EXPERIENCE = ["0", "1–2", "3–4", "5+"];
export const START_OPTIONS = ["Immediately", "2 weeks", "1 month", "Later"];
export const HEARD_OPTIONS = [
	"Haiven website",
	"LinkedIn",
	"Jobberman",
	"Instagram, X or Facebook",
	"WhatsApp",
	"A friend or colleague",
	"Someone at Haiven",
	"Other",
];
export const EQUIPMENT = [
	"CCTV/NVR",
	"Smart locks",
	"Access control",
	"Boom barriers",
	"Prepaid meters",
	"Solar/inverters",
	"Networking",
];
export const GRAD_YEARS = ["2023", "2024", "2025", "2026"];
export const NYSC_OPTIONS = ["Completed", "Exempted", "Currently serving"];
export const NYSC_MONTHS = [
	"November 2026",
	"December 2026",
	"January 2027",
	"February 2027",
	"March 2027",
	"April 2027",
	"May 2027",
	"June 2027",
	"July 2027",
	"August 2027",
	"September 2027",
	"October 2027",
];
export const TALENT_POOL_AREAS = [...TEAMS, "Other"];

export const TECH_ROLES = [
	{
		value: "Lead",
		label: "Lead Field Technician",
		sub: "3+ years · ₦500,000–₦750,000",
	},
	{
		value: "Trainee",
		label: "Technician Trainee",
		sub: "No experience needed · ₦100,000–₦130,000",
	},
];
export const GROWTH_ROLES = [
	{
		value: "Senior",
		label: "Senior Growth Executive",
		sub: "4+ years · ₦250,000–₦350,000 base",
	},
	{
		value: "Executive",
		label: "Growth Executive",
		sub: "2+ years · ₦150,000–₦200,000 base",
	},
];

export const FAQS = [
	{
		q: "Where will I work?",
		a: "Our roles are Lagos-based. Field roles move across the city, mostly Lekki–Ajah, Ikeja and Yaba–Surulere.",
	},
	{
		q: "Do I need property or tech experience?",
		a: "It depends on the role. Each role page says exactly what we need. The Technician Trainee and Customer Success roles are open to people starting out.",
	},
	{
		q: "Can I apply for more than one role?",
		a: "Yes. Apply to each role separately and tell us your first choice.",
	},
	{
		q: "What happens to my information?",
		a: "We use it only to assess your application. If you agree, we keep it for 12 months to consider you for other Haiven roles and programmes. You can ask us to delete it at any time.",
	},
	{
		q: "How long does hiring take?",
		a: "Usually two to four weeks from application to offer.",
	},
];
