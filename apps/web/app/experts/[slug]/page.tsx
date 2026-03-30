import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailScaffold } from "../../../components/shared/DetailScaffold";
import { buildPageMetadata } from "../../../lib/metadata";
import { experts, getExpertBySlug, resolveLocalizedText } from "../../../lib/public-data";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return experts.map((expert) => ({ slug: expert.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const expert = getExpertBySlug(slug);

  if (!expert) {
    return buildPageMetadata({
      title: "Expert not found",
      description: "The requested expert does not exist in the current OMDALAT dataset.",
      path: `/experts/${slug}`,
      noindex: true
    });
  }

  return buildPageMetadata({
    title: `${expert.name} | OMDALAT Expert in Da Lat`,
    description: resolveLocalizedText(expert.specialty),
    path: `/experts/${expert.slug}`
  });
}

export default async function ExpertDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const expert = getExpertBySlug(slug);

  if (!expert) {
    notFound();
  }

  return (
    <DetailScaffold
      eyebrow={{ vi: "Chi tiết chuyên gia", en: "Expert detail" }}
      title={expert.name}
      description={expert.specialty}
      path={`/experts/${expert.slug}`}
      backHref="/experts"
      backLabel={{ vi: "Chuyên gia", en: "Experts" }}
      facts={[
        { label: { vi: "Khu vực", en: "Zone" }, value: expert.zone },
        { label: { vi: "Khả dụng", en: "Availability" }, value: expert.availability },
        { label: { vi: "Chuyên môn", en: "Specialty" }, value: expert.specialty }
      ]}
      signals={[expert.signal, { vi: "Route chuyên gia hiện được sinh từ bộ dữ liệu public dùng chung.", en: "Expert routes are now generated from the shared public dataset." }]}
    />
  );
}
