"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { z } from "zod";

import { useI18n } from "@/i18n/context";

interface ContactFormProps {
  defaultMessage?: string;
}

export function ContactForm({ defaultMessage = "" }: ContactFormProps) {
  const { dict } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(1, dict.contact.form.errors.nameRequired),
        phone: z.string().trim().min(1, dict.contact.form.errors.phoneRequired),
        email: z
          .string()
          .trim()
          .email(dict.contact.form.errors.emailInvalid)
          .optional()
          .or(z.literal("")),
        message: z.string().trim().min(1, dict.contact.form.errors.messageRequired),
      }),
    [dict],
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", message: defaultMessage },
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success(`${values.name.split(" ")[0]}, ${dict.contact.form.success}`);
    reset({ name: "", phone: "", email: "", message: "" });
    setSubmitted(true);
  };

  const inputClass =
    "w-full rounded-lg border border-white/15 bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-gold/60";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => setSubmitted(false)}
      className="flex flex-col gap-4"
    >
      {submitted && (
        <div className="flex items-center gap-2 rounded-lg border border-status-available/30 bg-status-available/10 px-3.5 py-2.5 text-sm font-medium text-status-available">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {dict.contact.form.success}
        </div>
      )}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/60">
          {dict.contact.form.name}
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder={dict.contact.form.namePlaceholder}
          className={inputClass}
        />
        {errors.name && <p className="mt-1 text-xs text-status-sold">{errors.name.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/60">
            {dict.contact.form.phone}
          </label>
          <input
            {...register("phone")}
            type="tel"
            placeholder={dict.contact.form.phonePlaceholder}
            className={inputClass}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-status-sold">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/60">
            {dict.contact.form.email}
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder={dict.contact.form.emailPlaceholder}
            className={inputClass}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-status-sold">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/60">
          {dict.contact.form.message}
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder={dict.contact.form.messagePlaceholder}
          className={inputClass}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-status-sold">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? dict.contact.form.submitting : dict.contact.form.submit}
      </button>
    </form>
  );
}
