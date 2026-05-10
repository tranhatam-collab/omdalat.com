import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailScaffold } from "../../../components/shared/DetailScaffold";
import { buildPageMetadata } from "../../../lib/metadata";
import { events, getEventBySlug, resolveLocalizedText } from "../../../lib/public-data";

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
    description: resolveLocalizedText(event.description),
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
      eyebrow={{ vi: "Chi tiết sự kiện", en: "Event detail" }}
      title={event.title}
      description={event.description}
      path={`/events/${event.slug}`}
      backHref="/events"
      backLabel={{ vi: "Sự kiện", en: "Events" }}
      facts={[
        { label: { vi: "Ngày", en: "Date" }, value: event.date },
        { label: { vi: "Địa điểm", en: "Place" }, value: event.place },
        { label: { vi: "Host", en: "Host" }, value: event.host }
      ]}
      signals={[
        { vi: "Route chi tiết sự kiện hiện đã được sinh từ dữ liệu hoạt động.", en: "Event detail routes are now generated from activity data." },
        { vi: "Dùng các trang này để kết nối lớp bằng chứng và đặt chỗ trong tương lai.", en: "Use these pages to connect future proof and booking layers." }
      ]}
    />
  );
}
