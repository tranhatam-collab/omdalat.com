import type { Metadata } from "next";
import { getCurrentMember } from "../../lib/auth";
import { listPlacesForMember } from "../../lib/member-flow";
import { getRequestLocale } from "../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Hồ sơ Ấp và không gian",
      en: "Places and Ap profiles"
    },
    description: {
      vi: "Tạo và cập nhật hồ sơ Ấp, ảnh, mô tả, giá tham khảo và trạng thái duyệt.",
      en: "Create and update Ap profiles, images, descriptions, reference pricing, and review state."
    },
    path: "/places"
  });
}

export default async function PlacesPage() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const currentMember = await getCurrentMember(locale);
  const places = listPlacesForMember(currentMember.id);

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Không gian và Ấp" : "Places and Ap profiles"}</p>
      <h1>{isVi ? "Những nơi chốn bạn đang giữ" : "The places you are currently holding"}</h1>
      <p>
        {isVi
          ? "Đây là lớp dành cho host partner: cập nhật ảnh, mô tả, loại không gian, giá tham khảo, quy tắc và trạng thái duyệt."
          : "This is the host-partner layer: update images, descriptions, place type, reference pricing, rules, and review status."}
      </p>

      <div className="app-stack">
        {places.map((place) => (
          <section className="app-panel" key={place.id}>
            <p className="app-kicker">{place.area}</p>
            <h2>{place.place_name}</h2>
            <p>{locale === "vi" ? place.story_vi : place.story_en}</p>
            <ul className="app-list">
              <li>{place.type}</li>
              <li>{place.capacity}</li>
              <li>{place.status}</li>
              <li>{place.legal_notes}</li>
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
