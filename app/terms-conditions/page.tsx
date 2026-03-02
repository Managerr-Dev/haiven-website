import React from "react";

const terms = [
	{
		title: "Acceptance of Terms",
		content:
			"By accessing and using Haiven, a product of Managerr Solutions Limited, you agree to comply with these Terms and Conditions. If you do not agree with these terms, do not use our services.",
	},
	{
		title: "Services Provided",
		content:
			"Haiven offers a platform for gated communities, housing estates, and other residential setups.",
		items: [
			"Payment Collection for utilities, dues, and other community-related fees.",
			"Visitor Management for logging and managing visitors.",
			"Communication Tools to facilitate community announcements and interaction.",
			"Estate Services such as security management and shared amenities booking.",
		],
	},
	{
		title: "User Obligations",
		content: "To use Haiven, you must:",
		items: [
			"Be at least 18 years old.",
			"Provide accurate and complete registration information.",
			"Keep your login credentials secure and confidential.",
			"Notify us immediately if unauthorized access occurs to your account.",
		],
	},
	{
		title: "Privacy Policy",
		content:
			"Your privacy is important to us. By using our services, you agree to Haiven's Privacy Policy which outlines how we collect, use, and protect your data.",
	},
	{
		title: "Payments and Fees",
		content:
			"When using Haiven for payment-related services, you agree to pay all fees associated with your account as displayed in the relevant part of the app. You are also responsible for any taxes associated with using our services.",
	},
	{
		title: "User Conduct",
		content: "You agree not to:",
		items: [
			"Use Haiven for any unlawful purposes.",
			"Post or share content that is illegal, harmful, or violates the rights of others.",
			"Disrupt or interfere with the platform's security or performance.",
			"Misuse community tools for spam, harassment, or unauthorized solicitation.",
		],
	},
	{
		title: "Termination",
		content:
			"Haiven may suspend or terminate your access to the platform if you:",
		items: [
			"Violate any of these terms.",
			"Engage in activities that harm or disrupt the platform.",
			"Misuse your account for fraudulent or unauthorized activities.",
		],
	},
	{
		title: "Intellectual Property",
		content:
			"All content, software, and materials on Haiven are owned by Managerr Solutions Limited or licensed to us. You may not copy, distribute, or reverse-engineer our platform or its content without permission.",
	},
	{
		title: "Third-Party Links",
		content:
			"Our platform may contain links to third-party websites or services. Haiven is not responsible for the content or services provided by these third parties.",
	},
	{
		title: "Disclaimer and Limitation of Liability",
		content:
			"Haiven is provided on an 'as-is' and 'as-available' basis. We make no warranties regarding the availability, performance, or accuracy of the platform. Haiven and its affiliates will not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform.",
	},
	{
		title: "Indemnification",
		content:
			"You agree to indemnify and hold Managerr Solutions Limited and its affiliates harmless from any claims, liabilities, damages, or expenses (including legal fees) arising from your use of the platform or violation of these terms.",
	},
	{
		title: "Changes to Terms",
		content:
			"Haiven reserves the right to modify these terms at any time. Changes will become effective when posted on our website. Continued use of the platform after changes are posted indicates your acceptance of the updated terms.",
	},
	{
		title: "Governing Law",
		content:
			"These Terms and Conditions are governed by the laws of the Federal Republic of Nigeria. Any legal disputes arising from these terms will be resolved in the courts of Nigeria.",
	},
	{
		title: "Contact Us",
		content:
			"For any questions regarding these Terms and Conditions, please contact us.",
		contact: {
			email: "info@haiven.net",
			phone: "+234 912 228 4189",
		},
	},
];

const page = () => {
	return (
		<div className="px-4 lg:px-8 py-[167px] bg-white font-sans">
			<div className="max-w-[1071px] mx-auto">
				<h1 className="font-sora-sans font-bold text-3xl lg:text-[40.73px] max-w-[80%] leading-[100%] align-middle uppercase text-haiven-blue">
					Haiven's Terms and Conditions
				</h1>
				<p className="italics text-sm mb-8">Last Modified: October 11, 2024</p>

				<div className="space-y-5 lg:space-y-10">
					{terms.map((item, index) => (
						<div key={item.title}>
							<h2 className="font-sora-sans font-bold text-lg max-w-[80%] leading-[100%] align-middle uppercase text-haiven-blue mb-2	">
								{index + 1}. {item.title}
							</h2>
							<p className="font-regular text-sm lg:text-base leading-[150%] mb-4">
								{item.content}
							</p>
							{item.contact && (
								<div className="flex flex-col gap-2">
									<p className="font-regular text-sm lg:text-base leading-[150%]">
										Email: {item.contact.email}
									</p>
									<p className="font-regular text-sm lg:text-base leading-[150%]">
										Phone: {item.contact.phone}
									</p>
								</div>
							)}
							{item.items && (
								<ul className="font-regular list-inside list-disc text-sm lg:text-base leading-[150%]">
									{item.items.map((item, index) => (
										<li key={index}>{item}</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default page;
