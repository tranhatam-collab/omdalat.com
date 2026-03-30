"use client";

import { OMDALAT_INBOXES } from "../../../packages/core";
import type { FormEvent } from "react";
import { useState } from "react";
import type { OmdalatLocale } from "../../../packages/core";

type SupportFormState = {
  subject: string;
  message: string;
};

type StatusTone = "error" | "idle" | "info" | "success";

const initialState: SupportFormState = {
  subject: "",
  message: ""
};

export function SupportRequestForm({
  defaultRoute,
  replyEmail,
  locale
}: {
  defaultRoute: string;
  replyEmail: string;
  locale: OmdalatLocale;
}) {
  const isVi = locale === "vi";
  const [form, setForm] = useState<SupportFormState>(initialState);
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
      message: isVi ? "Đang gửi yêu cầu hỗ trợ..." : "Sending your support request..."
    });

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          route: defaultRoute
        })
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error?.message ?? (isVi ? "Không thể gửi yêu cầu hỗ trợ." : "Unable to submit support request."));
      }

      setForm(initialState);
      setStatus({
        tone: "success",
        message: isVi
          ? `Đã gửi. Hỗ trợ sẽ phản hồi qua ${OMDALAT_INBOXES.support}.`
          : `Sent. Support will reply via ${OMDALAT_INBOXES.support}.`
      });
    } catch (error) {
      setStatus({
        tone: "error",
        message: error instanceof Error
          ? error.message
          : isVi
            ? "Không gửi được yêu cầu hỗ trợ."
            : "Unable to send your support request."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <label className="app-field">
        <span>{isVi ? "Email phản hồi" : "Reply email"}</span>
        <input className="app-input" value={replyEmail} readOnly />
      </label>

      <label className="app-field">
        <span>{isVi ? "Chủ đề" : "Subject"}</span>
        <input
          className="app-input"
          type="text"
          value={form.subject}
          onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
          placeholder={isVi ? "Bạn cần hỗ trợ gì ngay lúc này?" : "What needs support right now?"}
          required
        />
      </label>

      <label className="app-field">
        <span>{isVi ? "Nội dung" : "Message"}</span>
        <textarea
          className="app-input app-textarea"
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          placeholder={
            isVi
              ? "Mô tả vướng mắc, yêu cầu hoặc nhu cầu phối hợp."
              : "Describe the blocker, request, or coordination need."
          }
          required
        />
      </label>

      <button className="app-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (isVi ? "Đang gửi..." : "Sending...") : isVi ? "Gửi yêu cầu hỗ trợ" : "Send support request"}
      </button>

      <p className="app-card-meta">
        {isVi ? "Mail vận hành trả lời từ" : "Operations replies from"}{" "}
        <a className="app-inline-link" href={`mailto:${OMDALAT_INBOXES.support}`}>{OMDALAT_INBOXES.support}</a>.{" "}
        {isVi ? "Thông báo ứng dụng có thể dùng" : "App notifications can use"}{" "}
        <a className="app-inline-link" href={`mailto:${OMDALAT_INBOXES.app}`}>{OMDALAT_INBOXES.app}</a>.
      </p>

      {status.message ? (
        <p className={`app-status app-status--${status.tone}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
