import type { Metadata } from "next";
import { ContentPage } from "../../components/shared/ContentPage";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Cách OMDALAT vận hành | How OMDALAT works",
  description: "How OMDALAT runs through opportunity, place activation, and trust-proof loops.",
  path: "/how-it-works"
});

export default function HowItWorksPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Cách vận hành", en: "How it works" }}
      title={{ vi: "OMDALAT vận hành theo vòng lặp", en: "OMDALAT runs through operating loops" }}
      intro={{
        vi: "Hệ thống tạo giá trị khi nhu cầu thật được ghép đúng người, đúng nơi, và kết quả được ghi thành proof có thể kiểm tra.",
        en: "The system creates value when real requests are matched to the right people and places, then captured as verifiable proof."
      }}
      sections={[
        {
          heading: { vi: "Vòng cơ hội", en: "Opportunity loop" },
          points: [
            {
              vi: "Nhu cầu được đưa vào dưới dạng request rõ ràng về bối cảnh, thời gian và locality.",
              en: "Requests are structured with clear context, timing, and locality."
            },
            {
              vi: "Hệ thống ưu tiên ghép nối theo trust và mức độ phù hợp thực tế.",
              en: "Matching prioritizes trust and practical fit."
            }
          ]
        },
        {
          heading: { vi: "Vòng trust-proof", en: "Trust-proof loop" },
          points: [
            {
              vi: "Sau hoạt động, kết quả được ghi thành proof, qua moderation và đi vào trust timeline.",
              en: "After activity, outcomes are recorded as proof, reviewed, and added to the trust timeline."
            },
            {
              vi: "Proof tốt tạo ra cơ hội tốt hơn cho vòng tiếp theo.",
              en: "Good proof unlocks higher-quality opportunity in the next cycle."
            }
          ]
        }
      ]}
    />
  );
}
