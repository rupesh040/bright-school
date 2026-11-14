"use client";

import { useId, useState, type FormEvent } from "react";
import type { ContactContent, FAQContent } from "../type";
import { Container, Icon, Reveal, SectionHeading } from "./ui";

export function FAQ({ content }: { content: FAQContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const accordionId = useId();

  return (
    <section id={content.id} className="scroll-mt-28 bg-[#faf6f3] py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading heading={content.heading} variant="symbol" />
        </Reveal>

        <Reveal className="mx-auto mt-9 max-w-[66rem] space-y-3 sm:mt-11">
          {content.items.map(({ question, answer }, index) => {
            const isOpen = index === openIndex;
            const questionId = `${accordionId}-question-${index}`;
            const answerId = `${accordionId}-answer-${index}`;

            return (
              <div
                key={question}
                className={`overflow-hidden rounded-xl border bg-white shadow-sm transition-colors motion-reduce:transition-none ${
                  isOpen ? "border-amber-ink" : "border-slate-200"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={questionId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left text-navy outline-none hover:bg-cream/40 focus-visible:bg-cream focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-amber-ink sm:gap-5 sm:px-6"
                  >
                    <span
                      aria-hidden="true"
                      className="shrink-0 border-r border-amber-ink/35 pr-3 text-lg font-bold tabular-nums text-amber-ink sm:pr-5 sm:text-xl"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-serif text-lg leading-snug font-bold sm:text-2xl">
                      {question}
                    </span>
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-md border sm:size-10 ${
                        isOpen ? "border-transparent text-amber-ink" : "border-slate-200"
                      }`}
                    >
                      <Icon
                        name="chevron-down"
                        className={`size-5 transition-transform duration-300 motion-reduce:transition-none ${
                          isOpen ? "rotate-0" : "rotate-90"
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="mx-4 border-t border-slate-200 px-1 pt-3 pb-5 text-sm leading-relaxed text-slate-700 sm:mx-6 sm:px-0 sm:text-base">
                      {answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}

const fieldClassName =
  "w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition-colors placeholder:text-slate-600 focus:border-amber-ink focus:ring-2 focus:ring-amber-ink/25 motion-reduce:transition-none";

function ContactForm({ content }: { content: ContactContent["form"] }) {
  const [feedback, setFeedback] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const values = new FormData(event.currentTarget);
    const subject = String(values.get("inquiry")).trim();
    const body = [
      `${content.fields.name} ${String(values.get("name")).trim()}`,
      `${content.fields.email} ${String(values.get("email")).trim()}`,
      `${content.fields.phone} ${String(values.get("phone")).trim()}`,
      "",
      String(values.get("message")).trim(),
    ].join("\r\n");

    const draft = `mailto:${content.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFeedback(content.feedback);
    window.location.href = draft;
  }

  return (
    <form
      method="post"
      action={`mailto:${content.recipient}`}
      encType="text/plain"
      onSubmit={handleSubmit}
      className="grid gap-3 sm:grid-cols-2"
    >
      <label>
        <span className="sr-only">{content.fields.name}</span>
        <input
          required
          name="name"
          autoComplete="name"
          placeholder={`${content.fields.name} *`}
          className={fieldClassName}
        />
      </label>
      <label>
        <span className="sr-only">{content.fields.email}</span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          placeholder={`${content.fields.email} *`}
          className={fieldClassName}
        />
      </label>
      <label>
        <span className="sr-only">{content.fields.phone}</span>
        <input
          required
          type="tel"
          name="phone"
          autoComplete="tel"
          placeholder={`${content.fields.phone} *`}
          className={fieldClassName}
        />
      </label>
      <label>
        <span className="sr-only">{content.fields.inquiry}</span>
        <select
          required
          name="inquiry"
          defaultValue=""
          className={`${fieldClassName} invalid:text-slate-600`}
        >
          <option value="" disabled>
            {content.fields.inquiry} *
          </option>
          {content.options.map((option) => (
            <option key={option} value={option} className="text-navy">
              {option}
            </option>
          ))}
        </select>
      </label>
      <label className="sm:col-span-2">
        <span className="sr-only">{content.fields.message}</span>
        <textarea
          required
          name="message"
          rows={3}
          placeholder={`${content.fields.message} *`}
          className={`${fieldClassName} block resize-y`}
        />
      </label>
      <div className="mt-1 sm:col-span-2">
        <button
          type="submit"
          className="group inline-flex cursor-pointer items-center gap-4 rounded-lg bg-amber-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber-ink motion-reduce:transition-none"
        >
          {content.submitLabel}
          <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
        </button>
        <p role="status" className="mt-2 text-sm text-slate-600 empty:mt-0">
          {feedback}
        </p>
      </div>
    </form>
  );
}

export function Contact({ content }: { content: ContactContent }) {
  const { details, form } = content;

  return (
    <section id={content.id} className="scroll-mt-28 bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading heading={content.heading} variant="symbol" />
        </Reveal>

        <div className="mx-auto mt-9 grid max-w-[66rem] gap-6 sm:mt-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-8">
          <Reveal className="rounded-2xl border border-amber-ink bg-[#fbf6ed] p-5 sm:p-7">
            <h3 className="font-serif text-3xl font-bold text-navy sm:text-4xl">{details.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
              {details.description}
            </p>

            <ul className="mt-5 space-y-4">
              {details.items.map(({ label, value, icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group inline-flex max-w-full items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-ink sm:gap-4"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-ink text-white">
                      <Icon name={icon} className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold text-navy">{label}</span>
                      <span className="block text-sm wrap-break-word text-slate-700 group-hover:text-amber-ink group-hover:underline">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="rounded-2xl border border-cream bg-white p-5 shadow-[0_8px_26px_#40200a14] sm:p-7">
            <h3 className="font-serif text-3xl font-bold text-navy sm:text-4xl">{form.title}</h3>
            <span aria-hidden="true" className="mt-3 mb-5 block h-0.5 w-14 bg-amber-ink" />
            <ContactForm content={form} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
