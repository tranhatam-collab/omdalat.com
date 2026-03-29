import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailScaffold } from "../../../components/shared/DetailScaffold";
import { buildPageMetadata } from "../../../lib/metadata";
import { events, getEventBySlug } from "../../../lib/public-data";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return buildPageMetadata({
      title: "Event not found",
      description: "The requested event does not exist in the current OMDALAT dataset.",
      path: `/events/${slug}`,
      noindex: true
    });
  }

  return buildPageMetadata({
    title: `${event.title} | OMDALAT Event in Da Lat`,
    description: event.description,
    path: `/events/${event.slug}`
  });
}

export default async function EventDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <DetailScaffold
      eyebrow="Event detail"
      title={event.title}
      description={event.description}
      path={`/events/${event.slug}`}
      backHref="/events"
      backLabel="Events"
      facts={[
        { label: "Date", value: event.date },
        { label: "Place", value: event.place },
        { label: "Host", value: event.host }
      ]}
      signals={["Event detail routes are now generated from activity data.", "Use these pages to connect future proof and booking layers."]}
    />
  );
}
