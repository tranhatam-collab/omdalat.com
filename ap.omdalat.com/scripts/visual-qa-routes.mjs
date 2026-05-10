import fs from "node:fs";
import path from "node:path";

const VI_MAP = {
  stories: "cau-chuyen",
  work: "lam-viec",
  rhythms: "nhip-song",
  people: "con-nguoi",
  places: "noi-chon",
  images: "hinh-anh",
};

const EN_MAP = {
  stories: "stories",
  work: "work",
  rhythms: "rhythms",
  people: "people",
  places: "places",
  images: "images",
};

const foundationPaths = [
  "/cau-chuyen/nhung-hien-nha-giu-nguoi-o-lai/",
  "/cau-chuyen/nguoi-tre-o-lai-da-lat-de-lam-gi/",
  "/nhip-song/da-lat-ve-dem-khong-on-nhung-khong-trong/",
  "/nhip-song/song-cham-o-da-lat-khong-co-nghia-la-song-luoi/",
  "/lam-viec/lam-viec-voi-the-gioi-tu-mot-noi-yen-hon/",
  "/en/stories/nhung-hien-nha-giu-nguoi-o-lai/",
  "/en/stories/nguoi-tre-o-lai-da-lat-de-lam-gi/",
  "/en/rhythms/da-lat-ve-dem-khong-on-nhung-khong-trong/",
  "/en/rhythms/song-cham-o-da-lat-khong-co-nghia-la-song-luoi/",
  "/en/work/lam-viec-voi-the-gioi-tu-mot-noi-yen-hon/",
];

const coreAdditionalPaths = [
  "/",
  "/con-nguoi/",
  "/noi-chon/",
  "/nhip-song/",
  "/lam-viec/",
  "/cau-chuyen/",
  "/hinh-anh/",
  "/ve-ap-da-lat/",
  "/om-ap-da-lat/",
  "/en/",
  "/en/people/",
  "/en/places/",
  "/en/rhythms/",
  "/en/work/",
  "/en/stories/",
  "/en/images/",
  "/en/about/",
  "/en/om-ap-dalat/",
];

const supportPaths = [
  "/lien-he/",
  "/chu-de/",
  "/tim-kiem/",
  "/faq/",
  "/en/contact/",
  "/en/topics/",
  "/en/search/",
  "/en/faq/",
];

function buildDetailPathsFromContent(root) {
  const vi = JSON.parse(fs.readFileSync(path.join(root, "content/vi.json"), "utf8"));
  const detail = [];

  vi.stories.forEach((item) => {
    detail.push(`/${VI_MAP[item.section]}/${item.slug}/`);
    detail.push(`/en/${EN_MAP[item.section]}/${item.slug}/`);
  });

  vi.people.forEach((item) => {
    detail.push(`/con-nguoi/${item.slug}/`);
    detail.push(`/en/people/${item.slug}/`);
  });

  vi.places.forEach((item) => {
    detail.push(`/noi-chon/${item.slug}/`);
    detail.push(`/en/places/${item.slug}/`);
  });

  vi.imageEssays.forEach((item) => {
    detail.push(`/hinh-anh/${item.slug}/`);
    detail.push(`/en/images/${item.slug}/`);
  });

  return detail;
}

export function resolveVisualQaPaths({ root, mode }) {
  const details = buildDetailPathsFromContent(root);

  if (mode === "core") {
    return [...new Set([...foundationPaths, ...coreAdditionalPaths])];
  }

  if (mode === "full-detail") {
    return [...new Set(details)];
  }

  if (mode === "full-site") {
    return [...new Set([...details, ...coreAdditionalPaths, ...supportPaths])];
  }

  return [...new Set(foundationPaths)];
}
