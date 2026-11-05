/**
 * Form validation utilities for the registration form.
 */

export const validators = {
  required: (value, fieldName = 'This field') => {
    if (!value || !value.trim()) {
      return `Add ${fieldName.toLowerCase()}.`;
    }
    return null;
  },

  email: (value) => {
    if (!value || !value.trim()) return 'Add your email address.';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value.trim())) {
      return 'Enter a valid email address.';
    }
    return null;
  },

  phone: (value) => {
    if (!value || !value.trim()) return 'Add your phone number.';
    // Indian phone: optional +91 or 0 prefix, then 10 digits starting with 6-9
    const phoneRegex = /^(?:\+91[\s-]?|0)?[6-9]\d{9}$/;
    const cleaned = value.replace(/[\s-]/g, '');
    if (!phoneRegex.test(cleaned)) {
      return 'Enter a valid Indian phone number (10 digits starting with 6–9).';
    }
    return null;
  },

  minLength: (value, min, fieldName = 'This field') => {
    if (value && value.trim().length < min) {
      return `${fieldName} must be at least ${min} characters.`;
    }
    return null;
  },

  maxLength: (value, max, fieldName = 'This field') => {
    if (value && value.trim().length > max) {
      return `${fieldName} must be no more than ${max} characters.`;
    }
    return null;
  },

  oneOf: (value, options, fieldName = 'This field') => {
    if (!options.includes(value)) {
      return `Choose a valid ${fieldName.toLowerCase()}.`;
    }
    return null;
  },
};

export const REGISTRATION_FIELDS = [
  {
    name: 'fullName',
    label: 'Your Name',
    type: 'text',
    placeholder: 'Enter your name',
    validate: (v) => validators.required(v, 'Your name') || validators.minLength(v, 2, 'Your name') || validators.maxLength(v, 100, 'Your name'),
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    validate: (v) => validators.email(v),
  },
  {
    name: 'phone',
    label: 'Mobile Number',
    type: 'tel',
    placeholder: '+91 98765 43210',
    validate: (v) => validators.phone(v),
  },
  {
    name: 'college',
    label: 'College or Institution',
    type: 'text',
    placeholder: 'Where do you study?',
    validate: (v) => validators.required(v, 'College') || validators.minLength(v, 2, 'College') || validators.maxLength(v, 150, 'College'),
  },
  {
    name: 'department',
    label: 'Department',
    type: 'text',
    placeholder: 'e.g. Computer Science and Engineering',
    validate: (v) => validators.required(v, 'Department') || validators.maxLength(v, 100, 'Department'),
  },
  {
    name: 'year',
    label: 'Year of Study',
    type: 'select',
    placeholder: 'Select your year',
    options: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    validate: (v) => validators.required(v, 'Year of study')
      || validators.oneOf(v, ['1st Year', '2nd Year', '3rd Year', '4th Year'], 'Year of study'),
  },
  {
    name: 'teamName',
    label: 'Team Name',
    type: 'text',
    placeholder: 'Your team name (if any)',
    validate: (v) => validators.maxLength(v, 50, 'Team name'),
    required: false,
  },
  {
    name: 'ideaDescription',
    label: 'Problem or Idea (optional)',
    type: 'textarea',
    placeholder: 'What challenge would you like to explore?',
    validate: (v) => validators.maxLength(v, 500, 'Idea description'),
    required: false,
  },
];

export function validateForm(values) {
  const errors = {};
  let isValid = true;

  REGISTRATION_FIELDS.forEach((field) => {
    const error = field.validate(values[field.name] || '');
    if (error) {
      // For optional fields, only validate constraints if a value exists
      if (field.required === false && (!values[field.name] || !values[field.name].trim())) {
        return;
      }
      errors[field.name] = error;
      isValid = false;
    }
  });

  return { errors, isValid };
}
