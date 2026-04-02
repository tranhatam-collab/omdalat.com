import type { Metadata } from "next";
import { ContentPage } from "../../components/shared/ContentPage";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "OMDALAT là gì | What is OMDALAT",
  description:
    "OMDALAT is the first city operating layer under OMDALA, coordinating places, people, requests, and proof in Da Lat.",
  path: "/what-is-omdalat"
});

export default function WhatIsOmdalatPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Giới thiệu hệ", en: "System intro" }}
      title={{ vi: "OMDALAT là gì?", en: "What is OMDALAT?" }}
      intro={{
        vi: "OMDALAT là city node đầu tiên dưới OMDALA, nơi con người, địa điểm, kỹ năng, nhu cầu và bằng chứng được tổ chức thành một lớp vận hành địa phương có thể kiểm chứng.",
        en: "OMDALAT is the first city node under OMDALA where people, places, skills, requests, and proof are organized into a verifiable local operating layer."
      }}
      sections={[
        {
          heading: { vi: "Không phải", en: "Not" },
          points: [
            { vi: "Không phải website du lịch hay danh bạ tĩnh.", en: "Not a tourism website or a static directory." },
            { vi: "Không phải trang cộng đồng chỉ để truyền thông.", en: "Not a community page built only for messaging." }
          ]
        },
        {
          heading: { vi: "Vai trò cốt lõi", en: "Core role" },
          points: [
            {
              vi: "Biến nguồn lực địa phương đang rời rạc thành tín hiệu có thể phối hợp.",
              en: "Turn fragmented local resources into signals that can be coordinated."
            },
            {
              vi: "Giúp cơ hội, trust và proof trở nên hiển thị, đo được và lặp lại được.",
              en: "Make opportunity, trust, and proof visible, measurable, and repeatable."
            }
          ]
        }
      ]}
    />
  );
}
