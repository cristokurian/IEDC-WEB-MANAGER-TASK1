import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, RotateCcw, Loader2 } from 'lucide-react';
import { REGISTRATION_FIELDS, validateForm } from '../utils/validation';

const initialValues = Object.fromEntries(
  REGISTRATION_FIELDS.map((f) => [f.name, ''])
);

export default function Registration() {
  const [formValues, setFormValues] = useState({ ...initialValues });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name, value) => {
    const field = REGISTRATION_FIELDS.find((f) => f.name === name);
    if (!field) return null;
    return field.validate(value);
  }, []);

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formValues[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = Object.fromEntries(
      REGISTRATION_FIELDS.map((f) => [f.name, true])
    );
    setTouched(allTouched);

    const { errors: formErrors, isValid } = validateForm(formValues);
    setErrors(formErrors);

    if (isValid) {
      setIsSubmitting(true);
      // Simulate a brief async submission (frontend-only)
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 600);
    }
  };

  const resetForm = () => {
    setFormValues({ ...initialValues });
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  };

  const renderField = (field) => {
    const error = touched[field.name] ? errors[field.name] : null;
    const isRequired = field.required !== false;
    const baseInputClasses = `mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 ${
      error
        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-1 focus:ring-red-400'
        : 'border-neutral-200 bg-offwhite focus:border-accent focus:ring-1 focus:ring-accent'
    }`;

    return (
      <div key={field.name} className="mb-6">
        <label
          htmlFor={field.name}
          className="font-heading text-sm font-medium text-charcoal"
        >
          {field.label}
          {isRequired && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>

        {field.type === 'textarea' ? (
          <textarea
            id={field.name}
            name={field.name}
            rows={4}
            placeholder={field.placeholder}
            value={formValues[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
            className={`${baseInputClasses} resize-none`}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
            aria-required={isRequired}
          />
        ) : field.type === 'select' ? (
          <select
            id={field.name}
            name={field.name}
            value={formValues[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
            className={`${baseInputClasses} ${
              !formValues[field.name] ? 'text-neutral-600' : ''
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
            aria-required={isRequired}
          >
            <option value="">{field.placeholder}</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formValues[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
            className={baseInputClasses}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
            aria-required={isRequired}
          />
        )}

        <AnimatePresence>
          {error && (
            <motion.p
              id={`${field.name}-error`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 flex items-center gap-1 text-xs text-red-500"
              role="alert"
            >
              <AlertCircle size={12} aria-hidden="true" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section id="register" className="border-t border-neutral-200">
      {/* Visually hidden H1 for the /register page — accessibility & SEO */}
      <h1 className="sr-only">Register for IEDC IDEA SPRINT 2026</h1>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="lg:grid lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-heading text-xs font-medium uppercase tracking-[0.3em] text-neutral-600">
                Join the sprint
              </p>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                BRING A PROBLEM{' '}
                <span className="text-accent">WORTH SOLVING.</span>
              </h2>
              <p className="mt-4 text-neutral-600">
                Tell us a little about yourself and the challenge you want to explore.
              </p>
            </motion.div>
          </div>

          <div className="mt-12 lg:col-span-3 lg:mt-0">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="interactive-surface rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8"
                >
                  {REGISTRATION_FIELDS.map(renderField)}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-charcoal py-3.5 text-sm font-medium text-offwhite transition-all duration-200 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        Submitting…
                      </>
                    ) : (
                      'Secure Your Spot'
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-lg shadow-charcoal/5 sm:p-10"
                  aria-live="polite"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.12, duration: 0.3, ease: 'easeOut' }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50"
                  >
                    <CheckCircle
                      size={56}
                      strokeWidth={1.7}
                      className="text-green-600"
                      aria-hidden="true"
                    />
                  </motion.div>
                  <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                    REGISTRATION SUCCESSFUL!
                  </h3>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
                    Thank you for signing up for IEDC Idea Sprint 2026! We&apos;re excited to see you
                    turn your ideas into action.
                  </p>

                  <dl className="mx-auto mt-8 grid max-w-lg grid-cols-1 gap-4 rounded-xl border border-neutral-200 bg-offwhite p-5 text-left sm:grid-cols-2 sm:p-6">
                    {[
                      ['Name', formValues.fullName],
                      ['Email', formValues.email],
                      ['College', formValues.college],
                      ['Department', formValues.department],
                      ['Year of Study', formValues.year],
                    ].map(([label, value]) => (
                      <div key={label} className="min-w-0">
                        <dt className="text-xs font-medium uppercase tracking-wide text-neutral-600">
                          {label}
                        </dt>
                        <dd className="mt-1 break-words text-sm font-medium text-charcoal">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <a
                      href="/"
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-charcoal px-6 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-charcoal hover:text-offwhite"
                    >
                      Back to Home
                    </a>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-2.5 text-sm font-medium text-offwhite transition-colors hover:bg-neutral-700"
                    >
                      <RotateCcw size={14} aria-hidden="true" />
                      Register Another Participant
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
