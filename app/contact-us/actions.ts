"use server";

import nodemailer from "nodemailer";
import z from "zod";
import { verifyRecaptcha } from "../lib/recaptcha";

const contactSchema = z.object({
	first_name: z.string().min(2, "Name must be at least 2 characters"),
	last_name: z.string().min(2, "Name must be at least 2 characters").optional(),
	phone_number: z
		.string()
		.min(11, "Phone number must be at least 11 characters")
		.optional(),
	email: z.string().email("Invalid email address"),
	message: z.string().min(10, "Message must be at least 10 characters"),
	recaptchaToken: z.string().min(1, "reCAPTCHA token is required"),
});

export async function submitContactForm(prevState: any, formData: FormData) {
	const validatedFields = contactSchema.safeParse({
		first_name: formData.get("first_name"),
		last_name: formData.get("last_name"),
		phone_number: formData.get("phone_number"),
		email: formData.get("email"),
		message: formData.get("message"),
		recaptchaToken: formData.get("recaptchaToken"),
	});

	console.log({ error: validatedFields.error });

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Please fix the errors below.",
		};
	}
	const {
		first_name,
		last_name,
		phone_number,
		email,
		message,
		recaptchaToken,
	} = validatedFields.data;

	const recaptchaResult = await verifyRecaptcha(recaptchaToken);

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
			from: `"${first_name} ${last_name}" <${process.env.GMAIL_USER}>`,
			to: process.env.CONTACT_TO_EMAIL,
			replyTo: email,
			subject: `New Contact Form Submission from ${first_name} ${last_name}`,
			text: `From: ${first_name} ${last_name} (${phone_number} - ${email})\n\n${message}`,
			html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>From:</strong> ${first_name} ${last_name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Phone Number:</strong> ${phone_number || "Not provided"}</p>
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
