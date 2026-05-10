import type { Metadata } from "next";
import { submitBasicApplicationAction } from "../actions";
import { getCurrentMember } from "../../lib/auth";
import { buildInitialApplicationInput, getMemberProfileRecord } from "../../lib/member-flow";
import { getRequestLocale } from "../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Gửi hồ sơ cơ bản",
      en: "Send a basic application"
    },
    description: {
      vi: "Bước đầu để chúng tôi hiểu rõ hơn người đang muốn tham gia Ôm Đà Lạt.",
      en: "The first application step so we can understand the person who wants to join Om Dalat."
    },
    path: "/apply"
  });
}

export default async function ApplyPage() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const currentMember = await getCurrentMember(locale);
  const profile = getMemberProfileRecord(currentMember.id);
  const initial = buildInitialApplicationInput(profile);

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Hồ sơ cơ bản" : "Basic application"}</p>
      <h1>{isVi ? "Gửi hồ sơ để được đọc kỹ" : "Send the application to be read carefully"}</h1>
      <p>
        {isVi
          ? "Đây không phải form booking. Đây là bước đầu để hiểu người tham gia, và không phải ai cũng phù hợp."
          : "This is not a booking form. It is the first step to understand the person applying, and it is not for everyone."}
      </p>

      <form action={submitBasicApplicationAction} className="app-panel app-form">
        <input type="hidden" name="redirectTo" value="/member/application-status?submitted=1" />
        <div className="app-form-grid">
          <label className="app-field">
            <span>{isVi ? "Họ và tên" : "Full name"}</span>
            <input className="app-input" name="full_name" defaultValue={initial.full_name} required />
          </label>
          <label className="app-field">
            <span>Email</span>
            <input className="app-input" name="email" type="email" defaultValue={initial.email || currentMember.email} required />
          </label>
          <label className="app-field">
            <span>{isVi ? "Số điện thoại hoặc cách liên hệ" : "Phone number or contact method"}</span>
            <input className="app-input" name="phone_or_contact" defaultValue={initial.phone_or_contact} required />
          </label>
          <label className="app-field">
            <span>{isVi ? "Bạn đang ở đâu" : "Where are you now"}</span>
            <input className="app-input" name="current_location" defaultValue={initial.current_location} required />
          </label>
          <label className="app-field">
            <span>{isVi ? "Bạn muốn gì khi đến đây" : "What are you looking for here"}</span>
            <textarea className="app-input app-textarea" name="what_are_you_looking_for" defaultValue={initial.what_are_you_looking_for} required />
          </label>
          <label className="app-field">
            <span>{isVi ? "Vì sao là Đà Lạt" : "Why Dalat"}</span>
            <textarea className="app-input app-textarea" name="why_dalat" defaultValue={initial.why_dalat} required />
          </label>
          <label className="app-field">
            <span>{isVi ? "Bạn có thể làm gì" : "What can you do"}</span>
            <textarea className="app-input app-textarea" name="what_can_you_do" defaultValue={initial.what_can_you_do} required />
          </label>
          <label className="app-field">
            <span>{isVi ? "Kỹ năng (cách nhau bằng dấu phẩy)" : "Skills (comma separated)"}</span>
            <input className="app-input" name="skills" defaultValue={initial.skills.join(", ")} />
          </label>
          <label className="app-field">
            <span>{isVi ? "Tình trạng công việc" : "Work status"}</span>
            <input className="app-input" name="work_status" defaultValue={initial.work_status} required />
          </label>
          <label className="app-field">
            <span>{isVi ? "Bạn dự định ở bao lâu" : "How long do you plan to stay"}</span>
            <input className="app-input" name="planned_stay_length" defaultValue={initial.planned_stay_length} required />
          </label>
          <label className="app-field">
            <span>{isVi ? "Link giới thiệu bản thân" : "A link that introduces you"}</span>
            <input className="app-input" name="portfolio_or_intro_link" defaultValue={initial.portfolio_or_intro_link} />
          </label>
          <label className="app-field">
            <span>{isVi ? "Ghi chú thêm" : "Additional notes"}</span>
            <textarea className="app-input app-textarea" name="notes" defaultValue={initial.notes} />
          </label>
        </div>

        <button className="app-button" type="submit">
          {isVi ? "Gửi hồ sơ cơ bản" : "Send a basic application"}
        </button>
      </form>
    </section>
  );
}
