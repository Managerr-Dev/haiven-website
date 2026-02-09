interface RecaptchaResponse {
	success: boolean;
	score: number;
	action: string;
	challenge_ts: string;
	hostname: string;
	"error-codes"?: string[];
}

interface RecaptchaResponse {
	success: boolean;
	score: number;
	action: string;
	challenge_ts: string;
	hostname: string;
	"error-codes"?: string[];
}

export async function verifyRecaptcha(
	token: string,
): Promise<{ success: boolean; score?: number; error?: string }> {
	const secretKey = process.env.RECAPTCHA_SECRET_KEY;

	if (!secretKey) {
		console.error("reCAPTCHA secret key is not set");
		return { success: false, error: "reCAPTCHA is not configured" };
	}

	try {
		const response = await fetch(
			"https://www.google.com/recaptcha/api/siteverify",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `secret=${secretKey}&response=${token}`,
			},
		);

		const data: RecaptchaResponse = await response.json();

		if (!data.success) {
			console.error("reCAPTCHA verification failed:", data["error-codes"]);
			return { success: false, error: "reCAPTCHA verification failed" };
		}

		// reCAPTCHA v3 returns a score from 0.0 to 1.0
		// 1.0 is very likely a good interaction, 0.0 is very likely a bot
		// You can adjust this threshold based on your needs
		const threshold = 0.5;

		if (data.score < threshold) {
			console.warn(`reCAPTCHA score too low: ${data.score}`);
			return {
				success: false,
				score: data.score,
				error: "Suspicious activity detected",
			};
		}

		return { success: true, score: data.score };
	} catch (error) {
		console.error("reCAPTCHA verification error:", error);
		return { success: false, error: "Failed to verify reCAPTCHA" };
	}
}
