"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ReactNode } from "react";

export default function RecaptchaProvider({
	children,
}: {
	children: ReactNode;
}) {
	const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

	if (!recaptchaKey) {
		console.warn("reCAPTCHA site key is not set");
		return <>{children}</>;
	}

	return (
		<GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
			{children}
		</GoogleReCaptchaProvider>
	);
}
