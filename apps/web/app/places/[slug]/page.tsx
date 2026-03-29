import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailScaffold } from "../../../components/shared/DetailScaffold";
import { buildPageMetadata } from "../../../lib/metadata";
import { getPlaceBySlug, places } from "../../../lib/public-data";

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
    description: place.activity,
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
      eyebrow="Place detail"
      title={place.name}
      description={place.activity}
      path={`/places/${place.slug}`}
      backHref="/places"
      backLabel="Places"
      facts={[
        { label: "Area", value: place.area },
        { label: "Type", value: place.type },
        { label: "Mode", value: place.mode },
        { label: "Cadence", value: place.cadence }
      ]}
      signals={[place.signal, `${place.hostCount} hosts currently linked to this place`]}
    />
  );
}
