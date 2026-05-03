import type { ArticleImageSeedRecord, ContentPillarKey } from "../../../packages/types";

export type RuntimeVisual = {
  key: string;
  src: string;
  width: number;
  height: number;
  alt: {
    vi: string;
    en: string;
  };
  caption: {
    vi: string;
    en: string;
  };
  credit: string;
  sourcePage: string;
};

export type VisualContextKey =
  | "life"
  | "work"
  | "learning"
  | "community"
  | "stay"
  | "docs"
  | "detail"
  | "legal"
  | "proof";

export const runtimeVisuals = {
  mist: {
    key: "mist",
    src: "https://images.unsplash.com/photo-1609424360486-c5b2636741d1?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=khanh-tran-mZ9UNtdwrlo-unsplash.jpg&w=1800",
    width: 1800,
    height: 1200,
    alt: {
      vi: "Toàn cảnh Đà Lạt trong sương sớm",
      en: "A wide view of Dalat in the early mist"
    },
    caption: {
      vi: "Sương sớm cho thấy nhịp chậm mà Ôm Đà Lạt muốn giữ.",
      en: "Morning mist shows the slower rhythm Om Dalat protects."
    },
    credit: "Khanh Tran",
    sourcePage: "https://unsplash.com/photos/aerial-view-of-city-during-daytime-mZ9UNtdwrlo"
  },
  lake: {
    key: "lake",
    src: "https://images.unsplash.com/photo-1741524427564-0173c980c432?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=di-p-zader-i29Z07meKds-unsplash.jpg&w=1600",
    width: 1600,
    height: 1067,
    alt: {
      vi: "Mặt hồ và rừng thông ở Đà Lạt",
      en: "A lakeside view with pine forest in Dalat"
    },
    caption: {
      vi: "Hồ và rừng thông đại diện cho nền sống yên, rõ và đủ bền.",
      en: "Lake and pine forest represent a calm, clear, sustainable base."
    },
    credit: "Diep Zader",
    sourcePage: "https://unsplash.com/photos/lush-green-forest-meets-tranquil-lake-water-i29Z07meKds"
  },
  road: {
    key: "road",
    src: "https://images.unsplash.com/photo-1691058428634-86aea938b448?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=van-space-DiE0DPySJTU-unsplash.jpg&w=1600",
    width: 1600,
    height: 1067,
    alt: {
      vi: "Con đường đất vùng ven Đà Lạt",
      en: "A dirt road along the edge of Dalat"
    },
    caption: {
      vi: "Đường vùng ven nhắc rằng ở lại là một hành trình có nhịp và hướng.",
      en: "The edge road keeps the idea of staying as a paced journey."
    },
    credit: "Van Space",
    sourcePage: "https://unsplash.com/photos/a-truck-is-driving-down-a-dirt-road-DiE0DPySJTU"
  },
  station: {
    key: "station",
    src: "https://images.unsplash.com/photo-1562865828-63b04eb687a5?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=vicky-HXC2QFlxG3E-unsplash.jpg&w=1400",
    width: 1400,
    height: 1750,
    alt: {
      vi: "Ga Đà Lạt",
      en: "Dalat Station"
    },
    caption: {
      vi: "Ga Đà Lạt là tín hiệu về lịch sử, di chuyển và điểm bắt đầu.",
      en: "Dalat Station signals history, movement, and a beginning point."
    },
    credit: "Vicky",
    sourcePage: "https://unsplash.com/photos/yellow-dalat-building-HXC2QFlxG3E"
  },
  waterfall: {
    key: "waterfall",
    src: "https://images.unsplash.com/photo-1756714656046-41f3bf6bfe88?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=gvz-42-OpFtIP6ndrQ-unsplash.jpg&w=1400",
    width: 1400,
    height: 1750,
    alt: {
      vi: "Thác Datanla ở Đà Lạt",
      en: "Datanla Waterfall in Dalat"
    },
    caption: {
      vi: "Thác Datanla giữ phần thiên nhiên mạnh và thật của đời sống Đà Lạt.",
      en: "Datanla carries the stronger natural layer of Dalat life."
    },
    credit: "GVZ 42",
    sourcePage: "https://unsplash.com/photos/a-cascading-waterfall-flows-down-rocky-terrain-with-wooden-railings-OpFtIP6ndrQ"
  },
  marketFruit: {
    key: "market-fruit",
    src: "https://images.unsplash.com/photo-1771581254097-7a186bd064bf?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=annie-hatuanh-R_wHZ6Xp6eU-unsplash.jpg&w=1400",
    width: 1400,
    height: 1750,
    alt: {
      vi: "Quầy trái cây ở chợ Đà Lạt",
      en: "A fruit stall at Dalat Market"
    },
    caption: {
      vi: "Chợ Đà Lạt đưa phần chi phí, ăn uống và đời sống thường ngày vào nội dung.",
      en: "Dalat Market brings cost, food, and everyday life into the story."
    },
    credit: "ANNIE HATUANH",
    sourcePage: "https://unsplash.com/photos/woman-selling-dragon-fruit-and-other-fruits-at-market-R_wHZ6Xp6eU"
  },
  marketExterior: {
    key: "market-exterior",
    src: "https://images.unsplash.com/photo-1739286869328-13691f7001ec?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=van-tien-le-KL-_dlddu58-unsplash.jpg&w=1400",
    width: 1400,
    height: 1750,
    alt: {
      vi: "Mặt trước chợ Đà Lạt",
      en: "The front of Dalat Market"
    },
    caption: {
      vi: "Chợ là lớp đô thị thật: gặp gỡ, nhu cầu và nhịp sống mỗi ngày.",
      en: "The market is the real urban layer: meetings, needs, and daily rhythm."
    },
    credit: "Van Tien Le",
    sourcePage: "https://unsplash.com/photos/a-large-white-building-with-a-lot-of-cars-parked-in-front-of-it-KL-_dlddu58"
  }
} as const satisfies Record<string, RuntimeVisual>;

const allVisuals = Object.values(runtimeVisuals);

const visualContexts: Record<VisualContextKey, RuntimeVisual[]> = {
  life: [runtimeVisuals.lake, runtimeVisuals.marketFruit, runtimeVisuals.mist],
  work: [runtimeVisuals.road, runtimeVisuals.station, runtimeVisuals.lake],
  learning: [runtimeVisuals.station, runtimeVisuals.waterfall, runtimeVisuals.road],
  community: [runtimeVisuals.marketFruit, runtimeVisuals.marketExterior, runtimeVisuals.lake],
  stay: [runtimeVisuals.lake, runtimeVisuals.station, runtimeVisuals.marketExterior],
  docs: [runtimeVisuals.mist, runtimeVisuals.road, runtimeVisuals.station],
  detail: [runtimeVisuals.marketExterior, runtimeVisuals.lake, runtimeVisuals.road],
  legal: [runtimeVisuals.station, runtimeVisuals.mist],
  proof: [runtimeVisuals.marketFruit, runtimeVisuals.waterfall, runtimeVisuals.station]
};

const articleVisualsBySlug: Record<string, RuntimeVisual[]> = {
  "tu-da-lat-lam-viec-voi-the-gioi": [runtimeVisuals.road, runtimeVisuals.mist, runtimeVisuals.lake],
  "tu-mot-ky-nang-den-thu-nhap-o-da-lat": [runtimeVisuals.station, runtimeVisuals.road, runtimeVisuals.marketExterior],
  "song-o-da-lat-la-gi": [runtimeVisuals.mist, runtimeVisuals.lake, runtimeVisuals.marketExterior],
  "chi-phi-song-da-lat-2026": [runtimeVisuals.marketFruit, runtimeVisuals.marketExterior, runtimeVisuals.station],
  "lam-viec-o-da-lat-co-thuc-te-khong": [runtimeVisuals.road, runtimeVisuals.lake, runtimeVisuals.station],
  "remote-work-da-lat": [runtimeVisuals.road, runtimeVisuals.lake, runtimeVisuals.mist],
  "song-cham-khong-phai-luoi": [runtimeVisuals.waterfall, runtimeVisuals.lake, runtimeVisuals.station],
  "ban-khong-can-chay-nhanh": [runtimeVisuals.road, runtimeVisuals.mist, runtimeVisuals.waterfall]
};

const articleVisualsByPillar: Record<ContentPillarKey, RuntimeVisual[]> = {
  song: visualContexts.life,
  work: visualContexts.work,
  "xay-cuoc-doi": [runtimeVisuals.marketExterior, runtimeVisuals.waterfall, runtimeVisuals.road]
};

function normalizeContext(value: string): VisualContextKey {
  const normalized = value.toLowerCase();

  if (normalized.includes("work") || normalized.includes("làm")) return "work";
  if (normalized.includes("learn") || normalized.includes("học")) return "learning";
  if (normalized.includes("community") || normalized.includes("cộng")) return "community";
  if (normalized.includes("stay") || normalized.includes("ở lại")) return "stay";
  if (normalized.includes("doc") || normalized.includes("guide") || normalized.includes("hướng dẫn")) return "docs";
  if (normalized.includes("term") || normalized.includes("privacy") || normalized.includes("pháp")) return "legal";
  if (normalized.includes("proof") || normalized.includes("bằng chứng")) return "proof";
  if (normalized.includes("life") || normalized.includes("sống")) return "life";

  return "detail";
}

function clampImageCount(count: number) {
  return Math.max(1, Math.min(3, count));
}

function uniqueVisuals(visuals: RuntimeVisual[]) {
  const seen = new Set<string>();
  return visuals.filter((visual) => {
    if (seen.has(visual.key)) return false;
    seen.add(visual.key);
    return true;
  });
}

export function getVisualsForContext(context: string, count = 2) {
  const visualContext = normalizeContext(context);
  return uniqueVisuals([...visualContexts[visualContext], ...allVisuals]).slice(0, clampImageCount(count));
}

function seedImageToRuntimeVisual(articleSlug: string, image: ArticleImageSeedRecord): RuntimeVisual | null {
  if (image.desktop_crop_status !== "approved" || image.mobile_crop_status !== "approved") {
    return null;
  }

  return {
    key: `seed-${articleSlug}-${image.image_id}`,
    src: image.src,
    width: image.width,
    height: image.height,
    alt: {
      vi: image.alt_vi,
      en: image.alt_en
    },
    caption: {
      vi: image.caption_vi,
      en: image.caption_en
    },
    credit: image.photographer_or_owner,
    sourcePage: image.source
  };
}

export function getArticleVisuals(
  article: {
    slug: string;
    pillarKey: ContentPillarKey;
    content: string;
    heroImage?: ArticleImageSeedRecord | null;
  },
  count?: number
) {
  const minimumCount = article.content.length > 700 || article.content.split(/\n{2,}/).filter(Boolean).length >= 4 ? 3 : 2;
  const resolvedCount = clampImageCount(count ?? minimumCount);
  const seedHeroVisual = article.heroImage ? seedImageToRuntimeVisual(article.slug, article.heroImage) : null;

  if (seedHeroVisual) {
    return [seedHeroVisual].slice(0, resolvedCount);
  }

  const exactVisuals = articleVisualsBySlug[article.slug] ?? [];
  const pillarVisuals = articleVisualsByPillar[article.pillarKey] ?? visualContexts.detail;

  return uniqueVisuals([...exactVisuals, ...pillarVisuals, ...allVisuals]).slice(0, resolvedCount);
}

export const defaultRuntimeOgImage = runtimeVisuals.mist;
