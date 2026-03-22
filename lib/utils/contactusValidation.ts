export type ContactFormData = {
	name: string;
	email: string;
	topic: string;
	budget: string;
	message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

type ContactValidationConfig = {
	inquiryTopics: string[];
	budgetTypes: string[];
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
	formData: ContactFormData,
	config: ContactValidationConfig
): ContactFormErrors {
	const errors: ContactFormErrors = {};

	if (!formData.name.trim()) {
		errors.name = 'Full name is required';
	} else if (formData.name.trim().length < 2) {
		errors.name = 'Full name must be at least 2 characters';
	}

	if (!formData.email.trim()) {
		errors.email = 'Work email is required';
	} else if (!emailPattern.test(formData.email.trim())) {
		errors.email = 'Enter a valid email address';
	}

	if (!formData.topic) {
		errors.topic = 'Please select an inquiry topic';
	} else if (!config.inquiryTopics.includes(formData.topic)) {
		errors.topic = 'Please select a valid inquiry topic';
	}

	if (!formData.budget) {
		errors.budget = 'Please select a budget range';
	} else if (!config.budgetTypes.includes(formData.budget)) {
		errors.budget = 'Please select a valid budget range';
	}

	if (!formData.message.trim()) {
		errors.message = 'Project brief is required';
	} else if (formData.message.trim().length < 20) {
		errors.message = 'Project brief must be at least 20 characters';
	}

	return errors;
}

export function hasContactFormErrors(errors: ContactFormErrors): boolean {
	return Object.keys(errors).length > 0;
}
