export interface CaretakerFormState {
	/** Set once the API has accepted the submission. */
	success?: boolean;
	/** Form-level message — the API's message on 422/429, or a retry string. */
	message?: string;
	/** Per-field messages from client-side validation, keyed by input name. */
	errors?: Record<string, string>;
}
