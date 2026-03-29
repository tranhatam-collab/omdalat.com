import type { Metadata } from "next";
import { OMDALAT_INBOXES } from "../../../../packages/core";
import { buildPageMetadata } from "../../lib/metadata";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact OMDALAT",
  description: "Contact paths, partnership intake, and support routing for OMDALAT.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <article className="runtime-page">
      <p className="runtime-kicker">Contact runtime</p>
      <h1>Contact OMDALAT</h1>
      <p>
        Public contact now routes into the live OMDALAT email layer for support, partnerships, place
        onboarding, and city-layer participation.
      </p>

      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>Contact form / Form liên hệ</h2>
          <p className="runtime-note">
            Use this route for support, participation, local partnerships, or trust questions.
          </p>
          <ContactForm />
        </section>

        <section className="runtime-panel">
          <h2>Official inboxes / Hộp thư chính thức</h2>
          <ul className="runtime-list">
            <li><a href={`mailto:${OMDALAT_INBOXES.hello}`}>{OMDALAT_INBOXES.hello}</a> — public intake</li>
            <li><a href={`mailto:${OMDALAT_INBOXES.join}`}>{OMDALAT_INBOXES.join}</a> — onboarding and participation</li>
            <li><a href={`mailto:${OMDALAT_INBOXES.support}`}>{OMDALAT_INBOXES.support}</a> — support and operations</li>
            <li><a href={`mailto:${OMDALAT_INBOXES.app}`}>{OMDALAT_INBOXES.app}</a> — app workflow and notifications</li>
            <li><a href={`mailto:${OMDALAT_INBOXES.partnerships}`}>{OMDALAT_INBOXES.partnerships}</a> — partnerships</li>
            <li><a href={`mailto:${OMDALAT_INBOXES.trust}`}>{OMDALAT_INBOXES.trust}</a> — trust and proof routing</li>
          </ul>
        </section>
      </div>
    </article>
  );
}
