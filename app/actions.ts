"use server";

import nodemailer from "nodemailer";
import z from "zod";
import { verifyRecaptcha } from "./lib/recaptcha";

const demoSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.email("Invalid email"),
	community_name: z.string().min(1, "Community name is required"),
	message: z.string().min(1, "Message is required"),
	reCAPTCHA: z.string().min(1, "reCAPTCHA is required"),
});

export async function submitDemoRequest(prevState: any, formData: FormData) {
	const validatedFields = demoSchema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		community_name: formData.get("community_name"),
		message: formData.get("message"),
		reCAPTCHA: formData.get("reCAPTCHA"),
	});

	console.log({ formData, validatedFields: validatedFields.error });
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Please fix the errors below.",
		};
	}

	const { name, email, community_name, message, reCAPTCHA } =
		validatedFields.data;

	const recaptchaResult = await verifyRecaptcha(reCAPTCHA);

	if (!recaptchaResult.success) {
		console.error("reCAPTCHA verification failed:", recaptchaResult.error);
		return {
			success: false,
			message: "Security verification failed. Please try again.",
		};
	}

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_APP_PASSWORD,
		},
	});

	try {
		await transporter.sendMail({
			from: `"${name}" <${process.env.GMAIL_USER}>`,
			to: process.env.CONTACT_TO_EMAIL,
			replyTo: email,
			subject: `New Demo Request from  ${name}`,
			text: `From: ${name} (${email} - ${community_name})\n\n${message}`,
			html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Demo Request</h2>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>From:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Community Name:</strong> ${community_name || "Not provided"}</p>
          </div>
          <div style="background-color: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
            <p style="margin: 5px 0;"><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
		});

		return {
			success: true,
			message: "Thank you! Your message has been sent successfully.",
		};
	} catch (error) {
		console.error("error:", error);
		return {
			success: false,
			message: "Failed to send message. Please try again later.",
		};
	}
}
