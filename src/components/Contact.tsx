import React, { useState } from 'react';
import contentData from '../data/content.json';
import { SectionHeader } from './SectionHeader';
import { CheckCircle2, AlertCircle, Send, Loader2 } from 'lucide-react';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const { contact } = contentData.portfolio;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    _gotcha: '', // Campo trampa (honeypot) oculto para prevenir spam
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateField = (name: string, value: string): string | undefined => {
    if (name === 'name') {
      if (!value.trim()) return 'El nombre es obligatorio.';
    }
    if (name === 'email') {
      if (!value.trim()) return 'El correo electrónico es obligatorio.';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        return 'Por favor, ingresa un correo válido (ej. juan@email.com).';
      }
    }
    if (name === 'message') {
      if (!value.trim()) return 'El mensaje es obligatorio.';
      if (value.trim().length < 5) return 'El mensaje debe tener al menos 5 caracteres.';
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpieza de error en tiempo real al escribir
    if (errors[name as keyof FormErrors]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }

    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const messageError = validateField('message', formData.message);

    if (nameError || emailError || messageError) {
      setErrors({
        name: nameError,
        email: emailError,
        message: messageError,
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
         const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          _gotcha: formData._gotcha,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || 'No se pudo enviar el mensaje. Por favor, inténtalo nuevamente.'
        );
      }

      // Envío exitoso
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '', _gotcha: '' });
      setErrors({});
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'No se pudo enviar el mensaje. Por favor, inténtalo nuevamente.';
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 px-6 sm:px-10 relative z-10 max-w-4xl mx-auto"
    >
      <SectionHeader
        title={contact.title}
        subtitle={contact.description}
      />

      <div className="mt-8">
        {submitSuccess ? (
          <div
            id="contact-success-box"
            className="bg-[#1a231e] border border-[#27c93f]/60 p-8 rounded-xl text-center max-w-xl mx-auto shadow-2xl transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-[#27c93f]/10 border border-[#27c93f]/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#27c93f]" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2 font-['Raleway',sans-serif]">
              ¡Mensaje enviado correctamente!
            </h4>
            <p className="text-[#cfcfcf] text-sm sm:text-base leading-relaxed mb-6 font-light">
              Me pondré en contacto contigo pronto.
            </p>
            <button
              type="button"
              onClick={() => setSubmitSuccess(false)}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#ff4d5a] hover:text-white font-medium transition-colors"
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form
            id="contact-form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5 max-w-2xl mx-auto"
          >
            {/* Mensaje de error general si falla el envío */}
            {submitError && (
              <div
                id="contact-error-banner"
                className="bg-[#2a1719] border border-[#ff4d5a]/60 text-white p-4 rounded-lg flex items-start gap-3 text-sm"
              >
                <AlertCircle className="w-5 h-5 text-[#ff4d5a] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#ff4d5a]">Error al enviar</p>
                  <p className="text-[#e2e2e2] text-xs sm:text-sm mt-0.5">{submitError}</p>
                </div>
              </div>
            )}

            {/* Campo trampa (honeypot) para protección contra bots */}
            <input
              type="text"
              name="_gotcha"
              value={formData._gotcha}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {/* Campo de Nombre */}
            <div className="w-full">
              <label htmlFor="field-name" className="sr-only">
                Nombre
              </label>
              <input
                id="field-name"
                name="name"
                type="text"
                disabled={isSubmitting}
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Nombre"
                className={`w-full bg-[#242424] text-white placeholder-[#888888] px-5 py-4 text-base font-light border transition-all ${
                  errors.name
                    ? 'border-[#ff4d5a] focus:border-[#ff4d5a] focus:ring-1 focus:ring-[#ff4d5a]'
                    : 'border-[#333333] focus:border-[#ff4d5a] focus:outline-none focus:ring-1 focus:ring-[#ff4d5a]'
                } disabled:opacity-60`}
              />
              {errors.name && (
                <p id="error-name" className="text-[#ff4d5a] text-xs mt-1.5 flex items-center gap-1.5 pl-1">
                  <AlertCircle size={13} className="shrink-0" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Campo de Correo Electrónico */}
            <div className="w-full">
              <label htmlFor="field-email" className="sr-only">
                Correo
              </label>
              <input
                id="field-email"
                name="email"
                type="email"
                disabled={isSubmitting}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Correo electrónico"
                className={`w-full bg-[#242424] text-white placeholder-[#888888] px-5 py-4 text-base font-light border transition-all ${
                  errors.email
                    ? 'border-[#ff4d5a] focus:border-[#ff4d5a] focus:ring-1 focus:ring-[#ff4d5a]'
                    : 'border-[#333333] focus:border-[#ff4d5a] focus:outline-none focus:ring-1 focus:ring-[#ff4d5a]'
                } disabled:opacity-60`}
              />
              {errors.email && (
                <p id="error-email" className="text-[#ff4d5a] text-xs mt-1.5 flex items-center gap-1.5 pl-1">
                  <AlertCircle size={13} className="shrink-0" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Campo de Mensaje */}
            <div className="w-full">
              <label htmlFor="field-message" className="sr-only">
                Mensaje
              </label>
              <textarea
                id="field-message"
                name="message"
                rows={6}
                disabled={isSubmitting}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Mensaje"
                className={`w-full bg-[#242424] text-white placeholder-[#888888] px-5 py-4 text-base font-light border transition-all resize-none ${
                  errors.message
                    ? 'border-[#ff4d5a] focus:border-[#ff4d5a] focus:ring-1 focus:ring-[#ff4d5a]'
                    : 'border-[#333333] focus:border-[#ff4d5a] focus:outline-none focus:ring-1 focus:ring-[#ff4d5a]'
                } disabled:opacity-60`}
              />
              {errors.message && (
                <p id="error-message" className="text-[#ff4d5a] text-xs mt-1.5 flex items-center gap-1.5 pl-1">
                  <AlertCircle size={13} className="shrink-0" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Botón de envío alineado a la derecha con barra de acento roja */}
            <div className="flex justify-end pt-4">
              <button
                id="contact-submit-button"
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex flex-col items-center bg-transparent border-0 text-white font-bold tracking-widest text-base sm:text-lg uppercase px-3 py-2 cursor-pointer transition-colors hover:text-[#ff4d5a] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <span>ENVIANDO...</span>
                      <Loader2 size={16} className="text-[#ff4d5a] animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>{(contact.button || 'ENVIAR').toUpperCase()}</span>
                      <Send size={16} className="text-[#ff4d5a] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
                {/* Barra roja distintiva debajo del botón de envío */}
                <span className="w-full h-[2px] sm:h-[3px] bg-[#ff4d5a] mt-1.5 transition-all duration-300 group-hover:h-[4px]" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
