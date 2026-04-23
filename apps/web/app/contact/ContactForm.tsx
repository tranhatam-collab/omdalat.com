"use client";

import { OMDALAT_CONTACT_TOPICS, OMDALAT_INBOXES } from "../../../../packages/core";
import { useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import type { PublicOmdalatLocale } from "../../../../packages/core";

type ContactState = {
  name: string;
  email: string;
  organization: string;
  topic: string;
  message: string;
};

type StatusTone = "error" | "idle" | "info" | "success";

type ContactCopy = {
  labels: Record<keyof ContactState, string>;
  placeholders: Pick<ContactState, "email" | "message" | "name" | "organization">;
  helper: string;
  topics: Record<(typeof OMDALAT_CONTACT_TOPICS)[number]["value"], string>;
  status: {
    sending: string;
    success: string;
    invalid: string;
    delivery: string;
    fallback: string;
  };
  submit: string;
  submitting: string;
};

const initialState: ContactState = {
  name: "",
  email: "",
  organization: "",
  topic: OMDALAT_CONTACT_TOPICS[0].value,
  message: ""
};

const contactCopy: Record<PublicOmdalatLocale, ContactCopy> = {
  vi: {
    labels: {
      name: "Tên của bạn",
      email: "Email",
      organization: "Tổ chức hoặc nhóm",
      topic: "Chủ đề",
      message: "Nội dung"
    },
    placeholders: {
      name: "Nguyễn An…",
      email: "ten@vidu.com…",
      organization: "Nhóm, cộng đồng hoặc nơi bạn đang làm việc…",
      message: "Bạn muốn hỏi, tham gia hoặc hợp tác về điều gì?"
    },
    helper: `Email xác nhận đi từ ${OMDALAT_INBOXES.hello}. Hỗ trợ phản hồi từ ${OMDALAT_INBOXES.support}.`,
    topics: {
      general: "Tổng quát",
      join: "Tham gia Ôm Đà Lạt",
      host: "Điểm đón hoặc địa điểm",
      community: "Cộng đồng",
      support: "Hỗ trợ",
      trust: "Niềm tin và bằng chứng"
    },
    status: {
      sending: "Đang gửi liên hệ…",
      success: `Đã gửi. Đội ngũ sẽ phản hồi từ ${OMDALAT_INBOXES.support}.`,
      invalid: "Vui lòng kiểm tra lại tên, email và nội dung trước khi gửi.",
      delivery: "Chúng tôi chưa thể ghi nhận thông tin của bạn lúc này. Bạn có thể thử lại sau ít phút.",
      fallback: "Không gửi được liên hệ lúc này. Bạn có thể thử lại sau ít phút."
    },
    submit: "Gửi liên hệ",
    submitting: "Đang gửi…"
  },
  en: {
    labels: {
      name: "Your name",
      email: "Email",
      organization: "Organization or group",
      topic: "Topic",
      message: "Message"
    },
    placeholders: {
      name: "Maya Tran…",
      email: "name@example.com…",
      organization: "Your group, community, or workplace…",
      message: "What would you like to ask, join, or discuss?"
    },
    helper: `Confirmation email is sent from ${OMDALAT_INBOXES.hello}. Support replies from ${OMDALAT_INBOXES.support}.`,
    topics: {
      general: "General",
      join: "Join Om Dalat",
      host: "Host or place",
      community: "Community",
      support: "Support",
      trust: "Trust and proof"
    },
    status: {
      sending: "Sending your message…",
      success: `Sent. The team will reply from ${OMDALAT_INBOXES.support}.`,
      invalid: "Please check your name, email, and message before sending.",
      delivery: "We could not receive your information at the moment. Please try again in a few minutes.",
      fallback: "Your message could not be sent right now. Please try again in a few minutes."
    },
    submit: "Send message",
    submitting: "Sending…"
  }
};

function resolveErrorMessage(locale: PublicOmdalatLocale, statusCode?: number, code?: string) {
  const copy = contactCopy[locale].status;
  if (statusCode === 422 || code === "invalid_contact_request") {
    return copy.invalid;
  }
  if (statusCode === 502 || code === "mail_delivery_failed") {
    return copy.delivery;
  }
  return copy.fallback;
}

export function ContactForm({ locale }: { locale: PublicOmdalatLocale }) {
  const copy = contactCopy[locale];
  const [form, setForm] = useState<ContactState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ message: string; tone: StatusTone }>({
    message: "",
    tone: "idle"
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    const requestedTopic = searchParams?.get("topic");

    if (!requestedTopic) {
      return;
    }

    const matchedTopic = OMDALAT_CONTACT_TOPICS.find((topic) => topic.value === requestedTopic);

    if (!matchedTopic) {
      return;
    }

    setForm((current) => ({ ...current, topic: matchedTopic.value }));
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({
      tone: "info",
      message: copy.status.sending
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(resolveErrorMessage(locale, response.status, payload?.error?.code));
      }

      setForm(initialState);
      setStatus({
        tone: "success",
        message: copy.status.success
      });
    } catch (error) {
      setStatus({
        tone: "error",
        message: error instanceof Error ? error.message : copy.status.fallback
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="runtime-form" onSubmit={handleSubmit}>
      <label className="runtime-field">
        <span>{copy.labels.name}</span>
        <input
          className="runtime-input"
          type="text"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          placeholder={copy.placeholders.name}
          required
        />
      </label>

      <label className="runtime-field">
        <span>{copy.labels.email}</span>
        <input
          className="runtime-input"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          placeholder={copy.placeholders.email}
          required
        />
      </label>

      <label className="runtime-field">
        <span>{copy.labels.organization}</span>
        <input
          className="runtime-input"
          type="text"
          name="organization"
          autoComplete="organization"
          value={form.organization}
          onChange={(event) => setForm((current) => ({ ...current, organization: event.target.value }))}
          placeholder={copy.placeholders.organization}
        />
      </label>

      <label className="runtime-field">
        <span>{copy.labels.topic}</span>
        <select
          className="runtime-input"
          name="topic"
          value={form.topic}
          onChange={(event) => setForm((current) => ({ ...current, topic: event.target.value }))}
        >
          {OMDALAT_CONTACT_TOPICS.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {copy.topics[topic.value]}
            </option>
          ))}
        </select>
      </label>

      <label className="runtime-field">
        <span>{copy.labels.message}</span>
        <textarea
          className="runtime-input runtime-textarea"
          name="message"
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          placeholder={copy.placeholders.message}
          required
        />
      </label>

      <button className="runtime-button primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? copy.submitting : copy.submit}
      </button>

      <p className="runtime-note">
        {copy.helper}
      </p>

      {status.message ? (
        <p className={`runtime-status runtime-status--${status.tone}`} aria-live="polite">
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
