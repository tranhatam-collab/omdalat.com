"use client";

import { OMDALAT_CONTACT_TOPICS, OMDALAT_INBOXES } from "../../../../packages/core";
import type { FormEvent } from "react";
import { useState } from "react";

type ContactState = {
  name: string;
  email: string;
  organization: string;
  topic: string;
  message: string;
};

type StatusTone = "error" | "idle" | "info" | "success";

const initialState: ContactState = {
  name: "",
  email: "",
  organization: "",
  topic: OMDALAT_CONTACT_TOPICS[0].value,
  message: ""
};

export function ContactForm() {
  const [form, setForm] = useState<ContactState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ message: string; tone: StatusTone }>({
    message: "",
    tone: "idle"
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({
      tone: "info",
      message: "Đang gửi liên hệ... / Sending your message..."
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error?.message ?? "Unable to submit contact form.");
      }

      setForm(initialState);
      setStatus({
        tone: "success",
        message: `Đã gửi. Đội ngũ sẽ phản hồi từ ${OMDALAT_INBOXES.support}. / Sent. The team will reply from ${OMDALAT_INBOXES.support}.`
      });
    } catch (error) {
      setStatus({
        tone: "error",
        message: error instanceof Error
          ? error.message
          : "Không gửi được liên hệ. / Unable to deliver your message."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="runtime-form" onSubmit={handleSubmit}>
      <label className="runtime-field">
        <span>Tên của bạn / Your name</span>
        <input
          className="runtime-input"
          type="text"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          placeholder="Your name"
          required
        />
      </label>

      <label className="runtime-field">
        <span>Email / Email</span>
        <input
          className="runtime-input"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          placeholder="hello@omdalat.com"
          required
        />
      </label>

      <label className="runtime-field">
        <span>Tổ chức hoặc nhóm / Organization or group</span>
        <input
          className="runtime-input"
          type="text"
          value={form.organization}
          onChange={(event) => setForm((current) => ({ ...current, organization: event.target.value }))}
          placeholder="Community, place, host, or group"
        />
      </label>

      <label className="runtime-field">
        <span>Chủ đề / Topic</span>
        <select
          className="runtime-input"
          value={form.topic}
          onChange={(event) => setForm((current) => ({ ...current, topic: event.target.value }))}
        >
          {OMDALAT_CONTACT_TOPICS.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
      </label>

      <label className="runtime-field">
        <span>Nội dung / Message</span>
        <textarea
          className="runtime-input runtime-textarea"
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          placeholder="What do you want to build, join, or ask?"
          required
        />
      </label>

      <button className="runtime-button primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Đang gửi... / Sending..." : "Gửi liên hệ / Send message"}
      </button>

      <p className="runtime-note">
        Email xác nhận đi từ <a href={`mailto:${OMDALAT_INBOXES.hello}`}>{OMDALAT_INBOXES.hello}</a>. Hỗ trợ phản hồi từ{" "}
        <a href={`mailto:${OMDALAT_INBOXES.support}`}>{OMDALAT_INBOXES.support}</a>.
      </p>

      {status.message ? (
        <p className={`runtime-status runtime-status--${status.tone}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
