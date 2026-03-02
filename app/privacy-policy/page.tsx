import { cn } from "@/lib/utils";
import React from "react";

interface Subsection {
	title: string;
	content?: string;
	items?: string[];
	contact?: { email: string; phone: string };
}

interface Policy {
	title: string;
	content?: string;
	items?: string[];
	subsections?: Subsection[];
	contact?: { email: string; phone: string };
	note?: string;
}

const policies: Policy[] = [
	{
		title: "Introduction",
		content:
			'Haiven Smart Systems Limited (“Haiven”, “us”, “we”), is committed to protecting the privacy and confidentiality of your personally identifiable information ("Personal Data"). This Privacy Policy outlines how we collect, use, store, and disclose your Personal Data when you use our website https://haiven.net, https://resident.haiven.net/, and mobile application (the “App”). Haiven provides services such as payment collection, communications management, visitor management, and other estate services (the "Services"). By using the App and accessing our Services, you consent to the collection, use, and disclosure of your Personal Data as described in this Privacy Policy. We comply with all applicable data protection laws, including the Nigeria Data Protection Regulation (NDPR), and we take every measure to protect your privacy.',
		subsections: [
			{
				title: "Data Controller vs. Data Processor",
				content:
					'We act as a "Data Controller" when we determine the purposes and manner in which Personal Data is processed. We act as a "Data Processor" when we process Personal Data on behalf of other Data Controllers. This distinction determines our obligations under the Nigeria Data Protection Regulation (NDPR).',
			},
			{
				title: "Controller Obligations",
				content:
					"As a Data Controller, we are responsible for ensuring compliance with NDPR and other relevant laws when processing your Personal Data. If you use our Services through another Controller (such as your estate management), that Controller is responsible for their own data compliance.",
			},
			{
				title: "Updates to Privacy Statement",
				content:
					"This Privacy Statement may change from time to time. Changes become effective when posted on our website or App. Continued use of our Services after updates indicates your acceptance of the revised Privacy Statement.",
			},
		],
	},
	{
		title: "Your Consent",
		subsections: [
			{
				title: "Acceptance",
				content:
					"By accessing the Haiven App and signing up for our Services, you confirm that you have read, understood, and agree to this Privacy Policy.",
			},
			{
				title: "Age Limitation",
				content:
					"The App is intended for users who are 18 years or older. If you are under 18, please do not use the App or provide us with any Personal Data.",
			},
			{
				title: "Consent Confirmation",
				items: [
					"You agree to the collection and processing of your Personal Data for the purposes of using the Services.",
					"All information you provide is accurate and truthful.",
					"You consent to our verification of the provided information from reasonable sources, including third-party references.",
					"You waive rights to confidentiality of certain client information to allow necessary processing and verification.",
				],
			},
		],
	},
	{
		title: "Your Privacy Rights",
		subsections: [
			{
				title: "Rights under the Nigeria Data Protection Regulation (NDPR)",
				items: [
					"Right of Access: Request access to your Personal Data.",
					"Right of Rectification: Correct inaccurate or incomplete data.",
					"Right to Erasure: Request deletion of your Personal Data.",
					"Right to Object: Restrict or object to certain processing activities.",
					"Right to Data Portability: Transfer your Personal Data to another service.",
					"Right to Withdraw Consent: Withdraw your consent at any time, without affecting the lawfulness of previous processing.",
				],
			},
			{
				title: "Contact Us for Privacy Rights",
				contact: {
					email: "info@haiven.net",
					phone: "+234 800 1234 5678",
				},
			},
		],
	},
	{
		title: "What Personal Data Do We Collect?",
		subsections: [
			{
				title: "Types of Personal Data",
				items: [
					"Basic Information: Name, date of birth, gender.",
					"Contact Information: Home address, email address, phone number.",
					"Work Information: Job title, company name.",
					"Login Information: Username and password.",
					"Usage Information: App usage metrics, technical error reports, preferences.",
					"Payment Details: Bank account number (for transactions).",
					"Passport Photograph.",
					"Age.",
					"Gender.",
				],
			},
			{
				title: "Device and Browsing Information",
				content:
					"We automatically collect information about your device and interaction with the App, such as IP address, device name, browser type, operating system, and access times.",
			},
			{
				title: "Publicly Disclosed Information",
				content:
					"If you disclose Personal Data on public message boards within Haiven, third parties may collect and use that data. Haiven is not responsible for such use by third parties.",
			},
			{
				title: "Third-Party Links",
				content:
					"Our App may contain links to external websites or resources. We are not responsible for the privacy practices of those third-party resources.",
			},
			{
				title: "Contact List",
				items: [
					"The use of the contact list feature is optional for app users.",
					"If utilized, only the required and selected contact person’s information (name and phone number) is gathered to validate guest invitations.",
					"This helps prevent identity theft.",
				],
			},
		],
	},
	{
		title: "How We Collect Your Data",
		subsections: [
			{
				title: "Direct Collection",
				items: [
					"Register for the App.",
					"Use our Services.",
					"Contact us by phone, email, or chat.",
					"Submit requests, complete surveys, or interact with the App.",
				],
			},
			{
				title: "Third-Party Sources",
				items: [
					"Your employer or organization.",
					"Government agencies.",
					"Publicly available resources and social media.",
				],
			},
			{
				title: "Cookies and Analytics",
				content:
					"We use cookies and analytics tools to track your interaction with the App to enhance user experience, track preferences, and monitor performance. You can control cookie settings through your browser.",
			},
		],
	},
	{
		title: "Lawful Basis for Processing",
		items: [
			"Consent: You have given clear consent for us to process your Personal Data for a specific purpose.",
			"Contractual Necessity: Processing is necessary to fulfill a contract with you.",
			"Legal Obligation: Processing is necessary to comply with a legal obligation.",
			"Legitimate Interests: Processing is necessary for our legitimate business interests unless overridden by your rights.",
		],
	},
	{
		title: "How We Use Your Data",
		items: [
			"Providing access to our Services.",
			"Improving the functionality and performance of the App.",
			"Responding to inquiries and providing support.",
			"Offering services and products based on your preferences.",
			"Conducting research and statistical analysis.",
			"Complying with legal and regulatory obligations.",
		],
		note: "We do not sell, rent, or lease Personal Data to third parties.",
	},
	{
		title: "Who We Share Your Personal Data With",
		items: [
			"Service Providers: Third-party partners such as payment processors or IT support.",
			"Government Authorities: To comply with legal obligations or requests.",
			"Advertisers: With your consent, aggregated data may be shared for marketing purposes.",
		],
	},
	{
		title: "Data Retention",
		content:
			"We retain your Personal Data as long as necessary to provide Services, comply with legal obligations, and fulfill contractual requirements. After inactivity, data may be anonymized or securely disposed of.",
	},
	{
		title: "Data Security",
		content:
			"We implement physical, technical, and organizational safeguards to protect Personal Data. However, no system is completely secure. In case of a breach, we will notify affected users and authorities as required by law.",
	},
	{
		title: "Data Breach Notification",
		content:
			"If a data breach affects your Personal Data, we will notify you and the Nigeria Data Protection Bureau (NDPB) or other relevant authorities and take steps to mitigate the risk.",
	},
	{
		title: "Opt-Out and Unsubscribe",
		contact: {
			email: "info@haiven.net",
			phone: "+234 9122284189",
		},
	},
	{
		title: "Contact Us",
		contact: {
			email: "info@haiven.net",
			phone: "+234 9122284189",
		},
	},
];

const PolicySection = ({
	title,
	content,
	items,
	contact,
	isSubsection = false,
}: {
	title?: string;
	content?: string;
	items?: string[];
	contact?: { email: string; phone: string };
	isSubsection?: boolean;
}) => (
	<div className={cn("mb-6", isSubsection && "ml-4 lg:ml-6 mt-4")}>
		{title && (
			<h3
				className={cn(
					"font-sora-sans font-bold leading-[120%] align-middle uppercase text-haiven-blue mb-2",
					isSubsection ? "text-base" : "text-lg",
				)}
			>
				{title}
			</h3>
		)}
		{content && (
			<p className="font-regular text-sm lg:text-base leading-[150%] mb-4 text-[#4A4A4A]">
				{content}
			</p>
		)}
		{items && (
			<ul className="font-regular list-inside list-disc text-sm lg:text-base leading-[180%] mb-4 text-[#4A4A4A] space-y-2">
				{items.map((item, index) => (
					<li key={index} className="pl-2">
						<span className="relative -left-2">{item}</span>
					</li>
				))}
			</ul>
		)}
		{contact && (
			<div className="flex flex-col gap-2 mt-2 bg-haiven-blue/5 p-4 rounded-lg border border-haiven-blue/10">
				<p className="font-medium text-sm lg:text-base leading-[150%] text-haiven-blue">
					Email:{" "}
					<a
						href={`mailto:${contact.email}`}
						className="font-regular hover:underline"
					>
						{contact.email}
					</a>
				</p>
				<p className="font-medium text-sm lg:text-base leading-[150%] text-haiven-blue">
					Phone:{" "}
					<a
						href={`tel:${contact.phone}`}
						className="font-regular hover:underline"
					>
						{contact.phone}
					</a>
				</p>
			</div>
		)}
	</div>
);

const page = () => {
	return (
		<div className="px-4 lg:px-8 py-[100px] lg:py-[167px] bg-white font-sans">
			<div className="max-w-[1071px] mx-auto">
				<div className="mb-12">
					<h1 className="font-sora-sans font-bold text-3xl lg:text-[40.73px] leading-[110%] uppercase text-haiven-blue mb-4">
						Haiven's Privacy Policy
					</h1>
					<p className="text-sm text-gray-500 italic">
						Last Updated: October 11, 2024
					</p>
				</div>

				<div className=" ">
					{policies.map((item, index) => (
						<div
							key={item.title}
							className="border-b border-gray-100 pb-8 last:border-0"
						>
							<h2 className="font-sora-sans font-bold text-xl lg:text-2xl leading-[120%] uppercase text-haiven-blue mb-6">
								{index + 1}. {item.title}
							</h2>

							<PolicySection
								content={item.content}
								items={item.items}
								contact={item.contact}
							/>

							{item.subsections?.map((sub, subIndex) => (
								<PolicySection
									key={sub.title}
									title={`${index + 1}.${subIndex + 1} ${sub.title}`}
									content={sub.content}
									items={sub.items}
									contact={sub.contact}
									isSubsection
								/>
							))}

							{item.note && (
								<p className="mt-4 p-4 bg-accent-green/10 border-l-4 border-accent-green text-sm font-medium text-haiven-blue italic">
									Note: {item.note}
								</p>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default page;
