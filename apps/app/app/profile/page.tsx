import type { Metadata } from "next";
import { getCurrentMember } from "../../lib/auth";
import { buildInitialApplicationInput, getMemberProfileRecord, getStatusLabel } from "../../lib/member-flow";
import { getRequestLocale } from "../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Hồ sơ của bạn",
      en: "Your profile"
    },
    description: {
      vi: "Những gì hệ đang biết về bạn ở bước này.",
      en: "What the system currently knows about you at this stage."
    },
    path: "/profile"
  });
}

export default async function ProfilePage() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const currentMember = await getCurrentMember(locale);
  const profile = getMemberProfileRecord(currentMember.id);
  const initial = buildInitialApplicationInput(profile);
  const memberStatus = currentMember.memberStatus ?? "guest";

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Hồ sơ thành viên" : "Member profile"}</p>
      <h1>{isVi ? "Những gì hệ đang thấy về bạn" : "What the system currently sees about you"}</h1>
      <p>
        {isVi
          ? "Trang này không chỉ để lưu thông tin. Nó để bạn nhìn rõ hồ sơ của mình đã đủ cho bước nào."
          : "This page is not only for storing information. It helps you see which step your profile is already strong enough for."}
      </p>

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Tóm tắt" : "Summary"}</p>
          <h2>{profile?.full_name ?? currentMember.name}</h2>
          <ul className="app-list">
            <li>{profile?.email ?? currentMember.email}</li>
            <li>{getStatusLabel(memberStatus, locale)}</li>
            <li>{profile?.current_location || (isVi ? "Chưa thêm nơi đang ở" : "Current location not added yet")}</li>
            <li>{profile?.planned_stay_length || (isVi ? "Chưa có thời gian ở dự kiến" : "Planned stay length not added yet")}</li>
          </ul>
        </section>

        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Khả năng và hướng đi" : "Ability and direction"}</p>
          <h2>{isVi ? "Điều bạn đang mang theo" : "What you are bringing into the system"}</h2>
          <ul className="app-list">
            <li>{initial.what_can_you_do || (isVi ? "Chưa mô tả rõ khả năng làm việc." : "Work ability has not been described yet.")}</li>
            <li>{initial.what_are_you_looking_for || (isVi ? "Chưa nêu rõ điều đang tìm kiếm." : "The current intention has not been described yet.")}</li>
            <li>{initial.skills.length ? initial.skills.join(", ") : isVi ? "Chưa có kỹ năng đã khai báo." : "No skills have been added yet."}</li>
          </ul>
        </section>
      </div>
    </section>
  );
}
