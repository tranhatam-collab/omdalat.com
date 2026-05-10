import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailScaffold } from "../../../components/shared/DetailScaffold";
import { buildPageMetadata } from "../../../lib/metadata";
import { getPlaceBySlug, places, resolveLocalizedText } from "../../../lib/public-data";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);

  if (!place) {
    return buildPageMetadata({
      title: "Place not found",
      description: "The requested place does not exist in the current OMDALAT dataset.",
      path: `/places/${slug}`,
      noindex: true
    });
  }

  return buildPageMetadata({
    title: `${place.name} | OMDALAT Place in Da Lat`,
    description: resolveLocalizedText(place.activity),
    path: `/places/${place.slug}`
  });
}

export default async function PlaceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);

  if (!place) {
    notFound();
  }

  return (
    <DetailScaffold
      eyebrow={{ vi: "Chi tiết địa điểm", en: "Place detail" }}
      title={place.name}
      description={place.activity}
      path={`/places/${place.slug}`}
      backHref="/places"
      backLabel={{ vi: "Địa điểm", en: "Places" }}
      facts={[
        { label: { vi: "Khu vực", en: "Area" }, value: place.area },
        { label: { vi: "Loại hình", en: "Type" }, value: place.type },
        { label: { vi: "Chế độ", en: "Mode" }, value: place.mode },
        { label: { vi: "Nhịp độ", en: "Cadence" }, value: place.cadence }
      ]}
      signals={[place.signal, { vi: `${place.hostCount} host đang liên kết với địa điểm này`, en: `${place.hostCount} hosts currently linked to this place` }]}
    />
  );
}
